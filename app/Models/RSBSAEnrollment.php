<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RSBSAEnrollment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'rsbsa_enrollments';

    protected $fillable = [
        'user_id',
        'beneficiary_id',
        'farm_profile_id',
        'application_reference_code',
        'enrollment_year',
        'enrollment_type',
        'application_status',
        'submitted_at',
        'approved_at',
        'rejected_at',
        'rejection_reason',
        'coordinator_notes',
        'reviewed_by',
        'assigned_rsbsa_number',
        'rsbsa_number_assigned_at'
    ];

    protected $casts = [
        'enrollment_year' => 'integer',
        'submitted_at' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
        'rsbsa_number_assigned_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Enums
    const ENROLLMENT_TYPES = ['new', 'renewal', 'update'];
    const APPLICATION_STATUSES = ['draft', 'submitted', 'reviewing', 'approved', 'rejected', 'cancelled'];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function beneficiary(): BelongsTo
    {
        return $this->belongsTo(BeneficiaryDetails::class, 'beneficiary_id');
    }

    public function farmProfile(): BelongsTo
    {
        return $this->belongsTo(FarmProfile::class, 'farm_profile_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function farmParcels(): HasMany
    {
        return $this->hasMany(FarmParcel::class, 'farm_profile_id', 'farm_profile_id');
    }

    public function livelihoodDetails(): HasMany
    {
        return $this->hasMany(FarmerDetails::class, 'farm_profile_id', 'farm_profile_id')
            ->orWhereHas('fisherfolkDetails', function($query) {
                $query->where('farm_profile_id', $this->farm_profile_id);
            })
            ->orWhereHas('farmworkerDetails', function($query) {
                $query->where('farm_profile_id', $this->farm_profile_id);
            })
            ->orWhereHas('agriYouthDetails', function($query) {
                $query->where('farm_profile_id', $this->farm_profile_id);
            });
    }

    // Scopes
    public function scopeByStatus($query, $status)
    {
        return $query->where('application_status', $status);
    }

    public function scopeByYear($query, $year)
    {
        return $query->where('enrollment_year', $year);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByBeneficiary($query, $beneficiaryId)
    {
        return $query->where('beneficiary_id', $beneficiaryId);
    }

    public function scopePending($query)
    {
        return $query->whereIn('application_status', ['draft', 'submitted']);
    }

    public function scopeApproved($query)
    {
        return $query->where('application_status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('application_status', 'rejected');
    }

    // Accessors
    public function getStatusDisplayAttribute(): string
    {
        $statusMap = [
            'draft' => 'Draft',
            'submitted' => 'Submitted for Review',
            'reviewing' => 'Under Review',
            'approved' => 'Approved',
            'rejected' => 'Rejected',
            'cancelled' => 'Cancelled'
        ];

        return $statusMap[$this->application_status] ?? $this->application_status;
    }

    public function getStatusColorAttribute(): string
    {
        $colorMap = [
            'draft' => 'default',
            'submitted' => 'info',
            'reviewing' => 'warning',
            'approved' => 'success',
            'rejected' => 'error',
            'cancelled' => 'error'
        ];

        return $colorMap[$this->application_status] ?? 'default';
    }

    public function getIsCompletedAttribute(): bool
    {
        return in_array($this->application_status, ['approved', 'rejected']);
    }

    public function getCanSubmitAttribute(): bool
    {
        return $this->application_status === 'draft';
    }

    public function getCanApproveAttribute(): bool
    {
        return $this->application_status === 'submitted';
    }

    public function getCanRejectAttribute(): bool
    {
        return in_array($this->application_status, ['submitted', 'reviewing']);
    }

    // Methods
    public function submit(): bool
    {
        if (!$this->canSubmit) {
            return false;
        }

        $this->update([
            'application_status' => 'submitted',
            'submitted_at' => now()
        ]);

        return true;
    }

    public function approve(string $rsbsaNumber, ?string $coordinatorNotes = null): bool
    {
        if (!$this->canApprove) {
            return false;
        }

        $this->update([
            'application_status' => 'approved',
            'approved_at' => now(),
            'assigned_rsbsa_number' => $rsbsaNumber,
            'coordinator_notes' => $coordinatorNotes,
            'rsbsa_number_assigned_at' => now()
        ]);

        return true;
    }

    public function reject(string $rejectionReason, ?string $coordinatorNotes = null): bool
    {
        if (!$this->canReject) {
            return false;
        }

        $this->update([
            'application_status' => 'rejected',
            'rejected_at' => now(),
            'rejection_reason' => $rejectionReason,
            'coordinator_notes' => $coordinatorNotes
        ]);

        return true;
    }

    public function assignReviewer(int $reviewerId): bool
    {
        if (!in_array($this->application_status, ['submitted', 'reviewing'])) {
            return false;
        }

        $this->update([
            'reviewed_by' => $reviewerId,
            'application_status' => 'reviewing'
        ]);

        return true;
    }

    public function generateReferenceCode(): string
    {
        $year = $this->enrollment_year ?? date('Y');
        $sequence = static::where('enrollment_year', $year)->count() + 1;
        
        return "RSBSA-{$year}-" . str_pad($sequence, 6, '0', STR_PAD_LEFT);
    }

    // Boot method to auto-generate reference code
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($enrollment) {
            if (empty($enrollment->application_reference_code)) {
                $enrollment->application_reference_code = $enrollment->generateReferenceCode();
            }
            
            if (empty($enrollment->enrollment_year)) {
                $enrollment->enrollment_year = date('Y');
            }
        });
    }
}