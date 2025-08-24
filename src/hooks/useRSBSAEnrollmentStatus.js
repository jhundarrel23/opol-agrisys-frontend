import { useState, useEffect, useCallback } from 'react';
import { rsbsaEnrollmentService } from '../api/rsbsaService';

/**
 * Custom hook for managing RSBSA enrollment status and tracking
 * Handles enrollment status updates, coordinator operations, and tracking
 */
export const useRSBSAEnrollmentStatus = (enrollmentId, userId) => {
  // Enrollment data state
  const [enrollment, setEnrollment] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  
  // Loading states
  const [isLoadingEnrollment, setIsLoadingEnrollment] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  // Error states
  const [enrollmentError, setEnrollmentError] = useState(null);
  const [statusError, setStatusError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  // Load enrollment data
  const loadEnrollment = useCallback(async () => {
    if (!enrollmentId) return;

    setIsLoadingEnrollment(true);
    setEnrollmentError(null);

    try {
      const result = await rsbsaEnrollmentService.getEnrollment(enrollmentId);
      if (result.success) {
        setEnrollment(result.data);
      } else {
        setEnrollmentError(result.error);
      }
    } catch (error) {
      setEnrollmentError('Failed to load enrollment data');
    } finally {
      setIsLoadingEnrollment(false);
    }
  }, [enrollmentId]);

  // Load enrollment status
  const loadEnrollmentStatus = useCallback(async () => {
    if (!enrollmentId) return;

    setIsLoadingStatus(true);
    setStatusError(null);

    try {
      const result = await rsbsaEnrollmentService.getEnrollmentStatus(enrollmentId);
      if (result.success) {
        setEnrollmentStatus(result.data);
      } else {
        setStatusError(result.error);
      }
    } catch (error) {
      setStatusError('Failed to load enrollment status');
    } finally {
      setIsLoadingStatus(false);
    }
  }, [enrollmentId]);

  // Submit enrollment for review
  const submitEnrollment = useCallback(async () => {
    if (!enrollmentId) return false;

    setIsUpdatingStatus(true);
    setUpdateError(null);

    try {
      const result = await rsbsaEnrollmentService.submitEnrollment(enrollmentId);
      if (result.success) {
        setEnrollment(prev => prev ? { ...prev, application_status: 'submitted' } : null);
        setEnrollmentStatus(prev => prev ? { ...prev, application_status: 'submitted' } : null);
        return true;
      } else {
        setUpdateError(result.error);
        return false;
      }
    } catch (error) {
      setUpdateError('Failed to submit enrollment');
      return false;
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [enrollmentId]);

  // Approve enrollment (coordinator action)
  const approveEnrollment = useCallback(async (rsbsaNumber, coordinatorNotes = '') => {
    if (!enrollmentId) return false;

    setIsUpdatingStatus(true);
    setUpdateError(null);

    try {
      const result = await rsbsaEnrollmentService.approveEnrollment(enrollmentId, rsbsaNumber, coordinatorNotes);
      if (result.success) {
        setEnrollment(prev => prev ? { 
          ...prev, 
          application_status: 'approved',
          assigned_rsbsa_number: rsbsaNumber,
          coordinator_notes: coordinatorNotes
        } : null);
        setEnrollmentStatus(prev => prev ? { 
          ...prev, 
          application_status: 'approved',
          assigned_rsbsa_number: rsbsaNumber,
          coordinator_notes: coordinatorNotes
        } : null);
        return true;
      } else {
        setUpdateError(result.error);
        return false;
      }
    } catch (error) {
      setUpdateError('Failed to approve enrollment');
      return false;
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [enrollmentId]);

  // Reject enrollment (coordinator action)
  const rejectEnrollment = useCallback(async (rejectionReason, coordinatorNotes = '') => {
    if (!enrollmentId) return false;

    setIsUpdatingStatus(true);
    setUpdateError(null);

    try {
      const result = await rsbsaEnrollmentService.rejectEnrollment(enrollmentId, rejectionReason, coordinatorNotes);
      if (result.success) {
        setEnrollment(prev => prev ? { 
          ...prev, 
          application_status: 'rejected',
          rejection_reason: rejectionReason,
          coordinator_notes: coordinatorNotes
        } : null);
        setEnrollmentStatus(prev => prev ? { 
          ...prev, 
          application_status: 'rejected',
          rejection_reason: rejectionReason,
          coordinator_notes: coordinatorNotes
        } : null);
        return true;
      } else {
        setUpdateError(result.error);
        return false;
      }
    } catch (error) {
      setUpdateError('Failed to reject enrollment');
      return false;
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [enrollmentId]);

  // Update enrollment data
  const updateEnrollment = useCallback(async (updateData) => {
    if (!enrollmentId) return false;

    setIsUpdatingStatus(true);
    setUpdateError(null);

    try {
      const result = await rsbsaEnrollmentService.updateEnrollment(enrollmentId, updateData);
      if (result.success) {
        setEnrollment(prev => prev ? { ...prev, ...result.data } : null);
        setEnrollmentStatus(prev => prev ? { ...prev, ...result.data } : null);
        return true;
      } else {
        setUpdateError(result.error);
        return false;
      }
    } catch (error) {
      setUpdateError('Failed to update enrollment');
      return false;
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [enrollmentId]);

  // Refresh enrollment data
  const refreshEnrollment = useCallback(() => {
    if (enrollmentId) {
      loadEnrollment();
      loadEnrollmentStatus();
    }
  }, [enrollmentId, loadEnrollment, loadEnrollmentStatus]);

  // Get enrollment by user ID (for beneficiaries)
  const loadUserEnrollment = useCallback(async () => {
    if (!userId) return;

    setIsLoadingEnrollment(true);
    setEnrollmentError(null);

    try {
      const result = await rsbsaEnrollmentService.getEnrollmentByUserId(userId);
      if (result.success) {
        setEnrollment(result.data);
        if (result.data) {
          // Also load status for this enrollment
          await loadEnrollmentStatus();
        }
      } else {
        setEnrollmentError(result.error);
      }
    } catch (error) {
      setEnrollmentError('Failed to load user enrollment');
    } finally {
      setIsLoadingEnrollment(false);
    }
  }, [userId, loadEnrollmentStatus]);

  // Get enrollment by beneficiary ID
  const loadBeneficiaryEnrollment = useCallback(async (beneficiaryId) => {
    if (!beneficiaryId) return;

    setIsLoadingEnrollment(true);
    setEnrollmentError(null);

    try {
      const result = await rsbsaEnrollmentService.getEnrollmentByBeneficiaryId(beneficiaryId);
      if (result.success) {
        setEnrollment(result.data);
        if (result.data) {
          // Also load status for this enrollment
          await loadEnrollmentStatus();
        }
      } else {
        setEnrollmentError(result.error);
      }
    } catch (error) {
      setEnrollmentError('Failed to load beneficiary enrollment');
    } finally {
      setIsLoadingEnrollment(false);
    }
  }, [loadEnrollmentStatus]);

  // Check if enrollment can be submitted
  const canSubmit = useCallback(() => {
    return enrollment && enrollment.application_status === 'draft';
  }, [enrollment]);

  // Check if enrollment can be approved
  const canApprove = useCallback(() => {
    return enrollment && enrollment.application_status === 'submitted';
  }, [enrollment]);

  // Check if enrollment can be rejected
  const canReject = useCallback(() => {
    return enrollment && ['submitted', 'reviewing'].includes(enrollment.application_status);
  }, [enrollment]);

  // Check if enrollment is completed
  const isCompleted = useCallback(() => {
    return enrollment && ['approved', 'rejected'].includes(enrollment.application_status);
  }, [enrollment]);

  // Get status display text
  const getStatusDisplayText = useCallback(() => {
    if (!enrollment) return 'No enrollment found';
    
    const statusMap = {
      'draft': 'Draft',
      'submitted': 'Submitted for Review',
      'reviewing': 'Under Review',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'cancelled': 'Cancelled'
    };
    
    return statusMap[enrollment.application_status] || enrollment.application_status;
  }, [enrollment]);

  // Get status color
  const getStatusColor = useCallback(() => {
    if (!enrollment) return 'default';
    
    const colorMap = {
      'draft': 'default',
      'submitted': 'info',
      'reviewing': 'warning',
      'approved': 'success',
      'rejected': 'error',
      'cancelled': 'error'
    };
    
    return colorMap[enrollment.application_status] || 'default';
  }, [enrollment]);

  // Load initial data
  useEffect(() => {
    if (enrollmentId) {
      loadEnrollment();
      loadEnrollmentStatus();
    } else if (userId) {
      loadUserEnrollment();
    }
  }, [enrollmentId, userId, loadEnrollment, loadEnrollmentStatus, loadUserEnrollment]);

  return {
    // State
    enrollment,
    enrollmentStatus,
    isLoadingEnrollment,
    isLoadingStatus,
    isUpdatingStatus,
    enrollmentError,
    statusError,
    updateError,

    // Actions
    loadEnrollment,
    loadEnrollmentStatus,
    submitEnrollment,
    approveEnrollment,
    rejectEnrollment,
    updateEnrollment,
    refreshEnrollment,
    loadUserEnrollment,
    loadBeneficiaryEnrollment,

    // Computed values
    canSubmit: canSubmit(),
    canApprove: canApprove(),
    canReject: canReject(),
    isCompleted: isCompleted(),
    statusDisplayText: getStatusDisplayText(),
    statusColor: getStatusColor(),

    // Loading state
    isLoading: isLoadingEnrollment || isLoadingStatus || isUpdatingStatus
  };
};

export default useRSBSAEnrollmentStatus;