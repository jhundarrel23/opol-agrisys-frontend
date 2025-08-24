import { useCallback } from 'react';
import useRSBSAFormWithAPI from '../beneficiary_contents/applications/RSBSA_FORM/useRSBSAFormWithAPI';
import useRSBSAReferenceData from './useRSBSAReferenceData';
import useRSBSAEnrollmentStatus from './useRSBSAEnrollmentStatus';

/**
 * Comprehensive RSBSA Hook
 * Combines all RSBSA functionality into one convenient hook
 * 
 * @param {string|number} userId - The user ID for the current user
 * @param {string|number} enrollmentId - Optional enrollment ID for existing enrollments
 * @returns {Object} Combined RSBSA functionality
 */
export const useRSBSAComplete = (userId, enrollmentId = null) => {
  // Initialize all the individual hooks
  const formHook = useRSBSAFormWithAPI(userId);
  const referenceDataHook = useRSBSAReferenceData();
  const enrollmentStatusHook = useRSBSAEnrollmentStatus(enrollmentId, userId);

  // Enhanced form submission with reference data validation
  const submitFormWithValidation = useCallback(async () => {
    // Check if reference data is loaded
    if (referenceDataHook.isLoading) {
      return { success: false, error: 'Reference data is still loading. Please wait.' };
    }

    // Check if reference data has errors
    if (referenceDataHook.hasErrors) {
      return { success: false, error: 'Failed to load reference data. Please refresh the page.' };
    }

    // Validate that required reference data exists
    const { livelihoodCategories, barangays, municipalities, provinces, regions } = referenceDataHook;
    
    if (livelihoodCategories.length === 0) {
      return { success: false, error: 'Livelihood categories not available. Please refresh the page.' };
    }

    if (barangays.length === 0) {
      return { success: false, error: 'Barangay data not available. Please refresh the page.' };
    }

    // Proceed with form submission
    return await formHook.submitForm();
  }, [formHook, referenceDataHook]);

  // Enhanced draft saving with reference data
  const saveDraftWithValidation = useCallback(async () => {
    // Check if reference data is loaded
    if (referenceDataHook.isLoading) {
      return { success: false, error: 'Reference data is still loading. Please wait.' };
    }

    // Proceed with draft saving
    return await formHook.saveDraft();
  }, [formHook, referenceDataHook]);

  // Get location options for cascading dropdowns
  const getLocationOptions = useCallback(() => {
    const { regions, provinces, municipalities, barangays } = referenceDataHook;
    
    return {
      regions: regions.map(region => ({ value: region.id, label: region.name })),
      provinces: provinces.map(province => ({ value: province.id, label: province.name })),
      municipalities: municipalities.map(municipality => ({ value: municipality.id, label: municipality.name })),
      barangays: barangays.map(barangay => ({ value: barangay.id, label: barangay.name }))
    };
  }, [referenceDataHook]);

  // Get livelihood category options
  const getLivelihoodCategoryOptions = useCallback(() => {
    return referenceDataHook.livelihoodCategories.map(category => ({
      value: category.id,
      label: category.name,
      description: category.description
    }));
  }, [referenceDataHook.livelihoodCategories]);

  // Get commodity options
  const getCommodityOptions = useCallback(() => {
    return referenceDataHook.commodities.map(commodity => ({
      value: commodity.id,
      label: commodity.name,
      category: commodity.category
    }));
  }, [referenceDataHook.commodities]);

  // Check if form can be submitted
  const canSubmitForm = useCallback(() => {
    return formHook.canSubmit && 
           !referenceDataHook.isLoading && 
           !referenceDataHook.hasErrors &&
           referenceDataHook.livelihoodCategories.length > 0;
  }, [formHook.canSubmit, referenceDataHook.isLoading, referenceDataHook.hasErrors, referenceDataHook.livelihoodCategories]);

  // Check if form can be saved as draft
  const canSaveDraft = useCallback(() => {
    return !referenceDataHook.isLoading && 
           !referenceDataHook.hasErrors &&
           formHook.formData.beneficiaryDetails.barangay.trim() !== '';
  }, [referenceDataHook.isLoading, referenceDataHook.hasErrors, formHook.formData.beneficiaryDetails.barangay]);

  // Get form completion status
  const getFormCompletionStatus = useCallback(() => {
    const { formProgress, isValid, canSubmit } = formHook;
    const { isLoading, hasErrors } = referenceDataHook;
    
    if (isLoading) {
      return { status: 'loading', message: 'Loading reference data...', progress: 0 };
    }
    
    if (hasErrors) {
      return { status: 'error', message: 'Failed to load reference data', progress: 0 };
    }
    
    if (formProgress === 100 && canSubmit) {
      return { status: 'complete', message: 'Form is complete and ready to submit', progress: 100 };
    }
    
    if (formProgress >= 80) {
      return { status: 'nearly_complete', message: 'Form is nearly complete', progress: formProgress };
    }
    
    if (formProgress >= 50) {
      return { status: 'half_complete', message: 'Form is half complete', progress: formProgress };
    }
    
    return { status: 'incomplete', message: 'Form is incomplete', progress: formProgress };
  }, [formHook.formProgress, formHook.isValid, formHook.canSubmit, referenceDataHook.isLoading, referenceDataHook.hasErrors]);

  // Get enrollment summary
  const getEnrollmentSummary = useCallback(() => {
    const { enrollment, statusDisplayText, statusColor } = enrollmentStatusHook;
    const { formData } = formHook;
    
    if (!enrollment) {
      return { status: 'no_enrollment', message: 'No RSBSA enrollment found' };
    }
    
    return {
      enrollmentId: enrollment.id,
      referenceCode: enrollment.application_reference_code,
      status: enrollment.application_status,
      statusDisplay: statusDisplayText,
      statusColor: statusColor,
      submittedAt: enrollment.submitted_at,
      assignedRSBSANumber: enrollment.assigned_rsbsa_number,
      coordinatorNotes: enrollment.coordinator_notes,
      rejectionReason: enrollment.rejection_reason,
      beneficiaryName: `${formData.beneficiaryDetails.first_name || ''} ${formData.beneficiaryDetails.last_name || ''}`.trim(),
      barangay: formData.beneficiaryDetails.barangay,
      municipality: formData.beneficiaryDetails.municipality
    };
  }, [enrollmentStatusHook, formHook.formData]);

  // Refresh all data
  const refreshAllData = useCallback(() => {
    referenceDataHook.refreshAllData();
    if (enrollmentId) {
      enrollmentStatusHook.refreshEnrollment();
    } else if (userId) {
      enrollmentStatusHook.loadUserEnrollment();
    }
  }, [referenceDataHook, enrollmentStatusHook, enrollmentId, userId]);

  // Check if any operations are in progress
  const isAnyOperationInProgress = useCallback(() => {
    return formHook.isSubmitting || 
           formHook.isSavingDraft || 
           enrollmentStatusHook.isUpdatingStatus ||
           referenceDataHook.isLoading;
  }, [formHook.isSubmitting, formHook.isSavingDraft, enrollmentStatusHook.isUpdatingStatus, referenceDataHook.isLoading]);

  return {
    // Form functionality
    ...formHook,
    
    // Reference data functionality
    ...referenceDataHook,
    
    // Enrollment status functionality
    ...enrollmentStatusHook,
    
    // Enhanced functions
    submitFormWithValidation,
    saveDraftWithValidation,
    getLocationOptions,
    getLivelihoodCategoryOptions,
    getCommodityOptions,
    canSubmitForm,
    canSaveDraft,
    getFormCompletionStatus,
    getEnrollmentSummary,
    refreshAllData,
    isAnyOperationInProgress,
    
    // Combined loading state
    isLoading: formHook.isLoading || 
               referenceDataHook.isLoading || 
               enrollmentStatusHook.isLoading ||
               formHook.isSubmitting ||
               formHook.isSavingDraft ||
               enrollmentStatusHook.isUpdatingStatus,
    
    // Combined error state
    hasAnyErrors: formHook.errors && Object.keys(formHook.errors).length > 0 ||
                  referenceDataHook.hasErrors ||
                  enrollmentStatusHook.enrollmentError ||
                  enrollmentStatusHook.statusError ||
                  enrollmentStatusHook.updateError
  };
};

export default useRSBSAComplete;