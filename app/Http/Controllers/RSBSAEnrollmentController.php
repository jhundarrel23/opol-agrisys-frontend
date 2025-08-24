<?php

namespace App\Http\Controllers;

use App\Models\RSBSAEnrollment;
use App\Models\BeneficiaryDetails;
use App\Models\FarmProfile;
use App\Models\FarmParcel;
use App\Models\FarmerDetails;
use App\Models\FisherfolkDetails;
use App\Models\FarmworkerDetails;
use App\Models\AgriYouthDetails;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class RSBSAEnrollmentController extends Controller
{
    /**
     * Display a listing of RSBSA enrollments
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = RSBSAEnrollment::with([
                'user:id,name,email',
                'beneficiary:id,barangay,municipality,province,region',
                'farmProfile:id,livelihood_category_id',
                'farmProfile.livelihoodCategory:id,name'
            ]);

            // Apply filters
            if ($request->has('status')) {
                $query->byStatus($request->status);
            }

            if ($request->has('year')) {
                $query->byYear($request->year);
            }

            if ($request->has('user_id')) {
                $query->byUser($request->user_id);
            }

            if ($request->has('beneficiary_id')) {
                $query->byBeneficiary($request->beneficiary_id);
            }

            // Search by reference code
            if ($request->has('search')) {
                $search = $request->search;
                $query->where('application_reference_code', 'like', "%{$search}%");
            }

            $enrollments = $query->latest()->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $enrollments,
                'message' => 'RSBSA enrollments retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve RSBSA enrollments',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created RSBSA enrollment
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'beneficiary_id' => 'required|exists:beneficiary_details,id',
                'farm_profile_id' => 'required|exists:farm_profiles,id',
                'enrollment_type' => 'required|in:' . implode(',', RSBSAEnrollment::ENROLLMENT_TYPES),
                'enrollment_year' => 'required|integer|min:2020|max:' . (date('Y') + 1),
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check if user already has an enrollment for the year
            $existingEnrollment = RSBSAEnrollment::where('user_id', $request->user_id)
                ->where('enrollment_year', $request->enrollment_year)
                ->first();

            if ($existingEnrollment) {
                return response()->json([
                    'success' => false,
                    'message' => 'User already has an enrollment for this year',
                    'data' => $existingEnrollment
                ], 409);
            }

            $enrollment = RSBSAEnrollment::create($request->all());

            return response()->json([
                'success' => true,
                'data' => $enrollment->load(['user', 'beneficiary', 'farmProfile']),
                'message' => 'RSBSA enrollment created successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create RSBSA enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified RSBSA enrollment
     */
    public function show(int $id): JsonResponse
    {
        try {
            $enrollment = RSBSAEnrollment::with([
                'user:id,name,email',
                'beneficiary',
                'farmProfile.livelihoodCategory',
                'farmParcels',
                'farmerDetails',
                'fisherfolkDetails',
                'farmworkerDetails',
                'agriYouthDetails',
                'reviewer:id,name,email'
            ])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $enrollment,
                'message' => 'RSBSA enrollment retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve RSBSA enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified RSBSA enrollment
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $enrollment = RSBSAEnrollment::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'enrollment_type' => 'sometimes|in:' . implode(',', RSBSAEnrollment::ENROLLMENT_TYPES),
                'enrollment_year' => 'sometimes|integer|min:2020|max:' . (date('Y') + 1),
                'coordinator_notes' => 'sometimes|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $enrollment->update($request->all());

            return response()->json([
                'success' => true,
                'data' => $enrollment->fresh()->load(['user', 'beneficiary', 'farmProfile']),
                'message' => 'RSBSA enrollment updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update RSBSA enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified RSBSA enrollment
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $enrollment = RSBSAEnrollment::findOrFail($id);

            // Only allow deletion of draft enrollments
            if ($enrollment->application_status !== 'draft') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only draft enrollments can be deleted'
                ], 403);
            }

            $enrollment->delete();

            return response()->json([
                'success' => true,
                'message' => 'RSBSA enrollment deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete RSBSA enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Submit enrollment for review
     */
    public function submit(int $id): JsonResponse
    {
        try {
            $enrollment = RSBSAEnrollment::findOrFail($id);

            if (!$enrollment->canSubmit) {
                return response()->json([
                    'success' => false,
                    'message' => 'Enrollment cannot be submitted in current status'
                ], 400);
            }

            $enrollment->submit();

            return response()->json([
                'success' => true,
                'data' => $enrollment->fresh()->load(['user', 'beneficiary', 'farmProfile']),
                'message' => 'Enrollment submitted for review successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Approve enrollment
     */
    public function approve(Request $request, int $id): JsonResponse
    {
        try {
            $enrollment = RSBSAEnrollment::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'assigned_rsbsa_number' => 'required|string|max:50|unique:rsbsa_enrollments,assigned_rsbsa_number',
                'coordinator_notes' => 'sometimes|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            if (!$enrollment->canApprove) {
                return response()->json([
                    'success' => false,
                    'message' => 'Enrollment cannot be approved in current status'
                ], 400);
            }

            $enrollment->approve(
                $request->assigned_rsbsa_number,
                $request->coordinator_notes
            );

            return response()->json([
                'success' => true,
                'data' => $enrollment->fresh()->load(['user', 'beneficiary', 'farmProfile']),
                'message' => 'Enrollment approved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to approve enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reject enrollment
     */
    public function reject(Request $request, int $id): JsonResponse
    {
        try {
            $enrollment = RSBSAEnrollment::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'rejection_reason' => 'required|string|max:1000',
                'coordinator_notes' => 'sometimes|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            if (!$enrollment->canReject) {
                return response()->json([
                    'success' => false,
                    'message' => 'Enrollment cannot be rejected in current status'
                ], 400);
            }

            $enrollment->reject(
                $request->rejection_reason,
                $request->coordinator_notes
            );

            return response()->json([
                'success' => true,
                'data' => $enrollment->fresh()->load(['user', 'beneficiary', 'farmProfile']),
                'message' => 'Enrollment rejected successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reject enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get enrollment by user ID
     */
    public function getByUserId(int $userId): JsonResponse
    {
        try {
            $enrollment = RSBSAEnrollment::with([
                'user:id,name,email',
                'beneficiary',
                'farmProfile.livelihoodCategory',
                'farmParcels',
                'farmerDetails',
                'fisherfolkDetails',
                'farmworkerDetails',
                'agriYouthDetails'
            ])->where('user_id', $userId)->latest()->first();

            if (!$enrollment) {
                return response()->json([
                    'success' => true,
                    'data' => null,
                    'message' => 'No RSBSA enrollment found for this user'
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $enrollment,
                'message' => 'RSBSA enrollment retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve RSBSA enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get enrollment by beneficiary ID
     */
    public function getByBeneficiaryId(int $beneficiaryId): JsonResponse
    {
        try {
            $enrollment = RSBSAEnrollment::with([
                'user:id,name,email',
                'beneficiary',
                'farmProfile.livelihoodCategory',
                'farmParcels',
                'farmerDetails',
                'fisherfolkDetails',
                'farmworkerDetails',
                'agriYouthDetails'
            ])->where('beneficiary_id', $beneficiaryId)->latest()->first();

            if (!$enrollment) {
                return response()->json([
                    'success' => true,
                    'data' => null,
                    'message' => 'No RSBSA enrollment found for this beneficiary'
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $enrollment,
                'message' => 'RSBSA enrollment retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve RSBSA enrollment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get enrollment status
     */
    public function getStatus(int $id): JsonResponse
    {
        try {
            $enrollment = RSBSAEnrollment::with([
                'user:id,name,email',
                'beneficiary:id,barangay,municipality,province,region',
                'farmProfile:id,livelihood_category_id',
                'farmProfile.livelihoodCategory:id,name'
            ])->findOrFail($id);

            $statusData = [
                'id' => $enrollment->id,
                'application_reference_code' => $enrollment->application_reference_code,
                'application_status' => $enrollment->application_status,
                'status_display' => $enrollment->status_display,
                'status_color' => $enrollment->status_color,
                'enrollment_year' => $enrollment->enrollment_year,
                'enrollment_type' => $enrollment->enrollment_type,
                'submitted_at' => $enrollment->submitted_at,
                'approved_at' => $enrollment->approved_at,
                'rejected_at' => $enrollment->rejected_at,
                'assigned_rsbsa_number' => $enrollment->assigned_rsbsa_number,
                'rejection_reason' => $enrollment->rejection_reason,
                'coordinator_notes' => $enrollment->coordinator_notes,
                'reviewed_by' => $enrollment->reviewed_by,
                'reviewer' => $enrollment->reviewer,
                'beneficiary' => $enrollment->beneficiary,
                'farm_profile' => $enrollment->farmProfile,
                'can_submit' => $enrollment->canSubmit,
                'can_approve' => $enrollment->canApprove,
                'can_reject' => $enrollment->canReject,
                'is_completed' => $enrollment->isCompleted,
                'created_at' => $enrollment->created_at,
                'updated_at' => $enrollment->updated_at
            ];

            return response()->json([
                'success' => true,
                'data' => $statusData,
                'message' => 'Enrollment status retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve enrollment status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get enrollment statistics
     */
    public function getStatistics(): JsonResponse
    {
        try {
            $stats = [
                'total_enrollments' => RSBSAEnrollment::count(),
                'by_status' => RSBSAEnrollment::selectRaw('application_status, count(*) as count')
                    ->groupBy('application_status')
                    ->pluck('count', 'application_status'),
                'by_year' => RSBSAEnrollment::selectRaw('enrollment_year, count(*) as count')
                    ->groupBy('enrollment_year')
                    ->orderBy('enrollment_year', 'desc')
                    ->pluck('count', 'enrollment_year'),
                'pending_review' => RSBSAEnrollment::pending()->count(),
                'approved_this_year' => RSBSAEnrollment::approved()->byYear(date('Y'))->count(),
                'rejected_this_year' => RSBSAEnrollment::rejected()->byYear(date('Y'))->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Enrollment statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve enrollment statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}