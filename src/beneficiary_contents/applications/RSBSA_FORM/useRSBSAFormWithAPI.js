import { useState, useEffect, useCallback } from 'react';
import { 
  rsbsaEnrollmentService, 
  beneficiaryDetailsService, 
  farmProfileService, 
  farmParcelsService, 
  livelihoodDetailsService,
  rsbsaFormService 
} from '../../../../api/rsbsaService';

// Enhanced error logging for hooks
const logHookError = (context, error, additionalData = {}) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    context: `Hook: ${context}`,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    },
    additionalData,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  console.group(`🚨 RSBSA Hook Error: ${context}`);
  console.error('Error Details:', errorInfo);
  console.error('Full Error Object:', error);
  console.groupEnd();
};

// Form validation helper
const validateFormStep = (stepData, stepName) => {
  console.log(`🔍 Validating ${stepName} step:`, stepData);
  
  const errors = {};
  let hasErrors = false;

  switch (stepName) {
    case 'beneficiaryDetails':
      if (!stepData.first_name?.trim()) {
        errors.first_name = ['First name is required'];
        hasErrors = true;
      }
      if (!stepData.last_name?.trim()) {
        errors.last_name = ['Last name is required'];
        hasErrors = true;
      }
      if (!stepData.contact_number?.trim()) {
        errors.contact_number = ['Contact number is required'];
        hasErrors = true;
      }
      if (!stepData.barangay?.trim()) {
        errors.barangay = ['Barangay is required'];
        hasErrors = true;
      }
      if (!stepData.municipality?.trim()) {
        errors.municipality = ['Municipality is required'];
        hasErrors = true;
      }
      if (!stepData.province?.trim()) {
        errors.province = ['Province is required'];
        hasErrors = true;
      }
      if (!stepData.region?.trim()) {
        errors.region = ['Region is required'];
        hasErrors = true;
      }
      break;

    case 'farmProfile':
      if (!stepData.livelihood_category_id) {
        errors.livelihood_category_id = ['Livelihood category is required'];
        hasErrors = true;
      }
      break;

    case 'farmParcels':
      if (!stepData || stepData.length === 0) {
        errors.general = ['At least one farm parcel is required'];
        hasErrors = true;
      } else {
        stepData.forEach((parcel, index) => {
          const parcelErrors = {};
          if (!parcel.parcel_number?.trim()) {
            parcelErrors.parcel_number = ['Parcel number is required'];
          }
          if (!parcel.barangay?.trim()) {
            parcelErrors.barangay = ['Barangay is required'];
          }
          if (!parcel.tenure_type?.trim()) {
            parcelErrors.tenure_type = ['Tenure type is required'];
          }
          if (!parcel.farm_type?.trim()) {
            parcelErrors.farm_type = ['Farm type is required'];
          }
          if (!parcel.farm_area || Number(parcel.farm_area) <= 0) {
            parcelErrors.farm_area = ['Farm area must be greater than 0'];
          }
          
          if (Object.keys(parcelErrors).length > 0) {
            errors[index] = parcelErrors;
            hasErrors = true;
          }
        });
      }
      break;

    default:
      console.warn(`⚠️ Unknown step for validation: ${stepName}`);
  }

  if (hasErrors) {
    console.error(`❌ ${stepName} validation failed:`, errors);
  } else {
    console.log(`✅ ${stepName} validation passed`);
  }

  return { errors, hasErrors };
};

/**
 * Enhanced RSBSA Form Hook with API Integration
 * Based on the actual database schema:
 * - rsbsa_enrollments
 * - beneficiary_details
 * - farm_profiles
 * - farm_parcels
 * - farmer_details, fisherfolk_details, farmworker_details, agri_youth_details
 */
export const useRSBSAFormWithAPI = (userId) => {
  // Form state based on actual database structure
  const [formData, setFormData] = useState({
    // Beneficiary Details (beneficiary_details table)
    beneficiaryDetails: {
      id: null,
      user_id: userId,
      system_generated_rsbsa_number: null,
      manual_rsbsa_number: null,
      rsbsa_verification_status: 'not_verified',
      rsbsa_verification_notes: null,
      rsbsa_verified_at: null,
      rsbsa_verified_by: null,
      
      // Location Information
      barangay: '',
      municipality: 'Opol',
      province: 'Misamis Oriental',
      region: 'Region X (Northern Mindanao)',
      
      // Contact Information
      contact_number: '',
      emergency_contact_number: '',
      
      // Personal Information
      birth_date: null,
      place_of_birth: '',
      sex: null,
      civil_status: null,
      name_of_spouse: '',
      
      // Educational & Demographic
      highest_education: null,
      religion: '',
      is_pwd: false,
      
      // Government ID
      has_government_id: 'no',
      gov_id_type: '',
      gov_id_number: '',
      
      // Association & Organization
      is_association_member: 'no',
      association_name: '',
      
      // Household Information
      mothers_maiden_name: '',
      is_household_head: false,
      household_head_name: '',
      
      // Profile Status
      profile_completion_status: 'pending',
      is_profile_verified: false,
      verification_notes: null,
      profile_verified_at: null,
      profile_verified_by: null,
      
      // Data Source & Tracking
      data_source: 'self_registration',
      last_updated_by_beneficiary: null,
      completion_tracking: null
    },

    // Farm Profile (farm_profiles table)
    farmProfile: {
      id: null,
      beneficiary_id: null,
      livelihood_category_id: null,
      created_at: null,
      updated_at: null
    },

    // Farm Parcels (farm_parcels table) - Array for multiple parcels
    farmParcels: [],

    // Livelihood Details based on category
    farmerDetails: {
      id: null,
      farm_profile_id: null,
      is_rice: false,
      is_corn: false,
      is_other_crops: false,
      other_crops_description: '',
      is_livestock: false,
      livestock_description: '',
      is_poultry: false,
      poultry_description: '',
      created_at: null,
      updated_at: null
    },

    fisherfolkDetails: {
      id: null,
      farm_profile_id: null,
      is_fish_capture: false,
      is_aquaculture: false,
      is_fish_processing: false,
      other_fishing_description: '',
      created_at: null,
      updated_at: null
    },

    farmworkerDetails: {
      id: null,
      farm_profile_id: null,
      is_land_preparation: false,
      is_cultivation: false,
      is_harvesting: false,
      other_work_description: '',
      created_at: null,
      updated_at: null
    },

    agriYouthDetails: {
      id: null,
      farm_profile_id: null,
      is_agri_youth: false,
      is_part_of_farming_household: false,
      is_formal_agri_course: false,
      is_nonformal_agri_course: false,
      is_agri_program_participant: false,
      other_involvement_description: '',
      created_at: null,
      updated_at: null
    }
  });

  // Form validation errors
  const [errors, setErrors] = useState({});
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  // Form step management
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // API response states
  const [apiResponse, setApiResponse] = useState(null);
  const [lastSavedDraft, setLastSavedDraft] = useState(null);
  
  // Track if personal data was pre-filled
  const [hasPreFilledData, setHasPreFilledData] = useState(false);

  // Load existing beneficiary details and RSBSA data if user has already submitted
  useEffect(() => {
    if (userId) {
      loadExistingBeneficiaryData();
      loadExistingRSBSAData();
    }
  }, [userId]);

  // Load existing beneficiary details (personal information) from API
  const loadExistingBeneficiaryData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // First, try to get existing beneficiary details
      const beneficiaryResult = await beneficiaryDetailsService.getDetailsByUserId(userId);
      if (beneficiaryResult.success && beneficiaryResult.data) {
        // Pre-populate form with existing personal information
        setFormData(prevData => ({
          ...prevData,
          beneficiaryDetails: {
            ...prevData.beneficiaryDetails,
            ...beneficiaryResult.data,
            // Keep the form editable by not setting readonly flags
            // The user can still modify these fields
          }
        }));
        
        // Mark that we have pre-filled data
        setHasPreFilledData(true);
      }
    } catch (error) {
      logHookError('loadExistingBeneficiaryData', error, { userId });
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Load existing RSBSA enrollment data if user has already submitted
  const loadExistingRSBSAData = useCallback(async () => {
    if (!userId) return;

    try {
      const result = await rsbsaFormService.getCompleteRSBSAData(userId);
      if (result.success && result.data) {
        // Map API data to form state
        const { enrollment, beneficiaryDetails, farmProfile, farmParcels, livelihoodDetails } = result.data;
        
        setFormData(prevData => ({
          ...prevData,
          // Update beneficiary details with any RSBSA-specific data
          beneficiaryDetails: {
            ...prevData.beneficiaryDetails,
            ...beneficiaryDetails
          },
          farmProfile: {
            ...prevData.farmProfile,
            ...farmProfile
          },
          farmParcels: farmParcels || [],
          ...(livelihoodDetails && {
            farmerDetails: livelihoodDetails.farmer_details || prevData.farmerDetails,
            fisherfolkDetails: livelihoodDetails.fisherfolk_details || prevData.fisherfolkDetails,
            farmworkerDetails: livelihoodDetails.farmworker_details || prevData.farmworkerDetails,
            agriYouthDetails: livelihoodDetails.agri_youth_details || prevData.agriYouthDetails
          })
        }));

        // If enrollment exists, set current step to review
        if (enrollment) {
          setCurrentStep(5); // Review step
        }
      }
    } catch (error) {
      logHookError('loadExistingRSBSAData', error, { userId });
    }
  }, [userId]);

  // Update form field
  const updateField = useCallback((section, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));

    // Clear error for this field if it exists
    if (errors[`${section}.${field}`]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  }, [errors]);

  // Add new farm parcel
  const addFarmParcel = useCallback(() => {
    const newParcel = {
      id: Date.now(), // Temporary ID for frontend
      farm_profile_id: null,
      parcel_number: '',
      barangay: '',
      tenure_type: null, // enum: registered_owner, tenant, lessee
      ownership_document_number: '',
      is_ancestral_domain: false,
      is_agrarian_reform_beneficiary: false,
      farm_type: null, // enum: irrigated, rainfed_upland, rainfed_lowland
      is_organic_practitioner: false,
      farm_area: 0,
      remarks: '',
      created_at: null,
      updated_at: null
    };

    setFormData(prevData => ({
      ...prevData,
      farmParcels: [...prevData.farmParcels, newParcel]
    }));
  }, []);

  // Update farm parcel
  const updateFarmParcel = useCallback((index, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      farmParcels: prevData.farmParcels.map((parcel, i) =>
        i === index ? { ...parcel, [field]: value } : parcel
      )
    }));
  }, []);

  // Remove farm parcel
  const removeFarmParcel = useCallback((index) => {
    setFormData(prevData => ({
      ...prevData,
      farmParcels: prevData.farmParcels.filter((_, i) => i !== index)
    }));
  }, []);

  // Form validation
  const validateForm = useCallback(() => {
    console.log('🔍 Validating complete form...');
    
    const newErrors = {};

    // Validate beneficiary details
    const { beneficiaryDetails } = formData;
    if (!beneficiaryDetails.barangay.trim()) {
      newErrors['beneficiaryDetails.barangay'] = 'Barangay is required';
    }
    if (!beneficiaryDetails.municipality.trim()) {
      newErrors['beneficiaryDetails.municipality'] = 'Municipality is required';
    }
    if (!beneficiaryDetails.contact_number.trim()) {
      newErrors['beneficiaryDetails.contact_number'] = 'Contact number is required';
    }
    if (!beneficiaryDetails.birth_date) {
      newErrors['beneficiaryDetails.birth_date'] = 'Birth date is required';
    }
    if (!beneficiaryDetails.sex) {
      newErrors['beneficiaryDetails.sex'] = 'Sex is required';
    }
    if (!beneficiaryDetails.civil_status) {
      newErrors['beneficiaryDetails.civil_status'] = 'Civil status is required';
    }

    // Validate farm profile
    if (!formData.farmProfile.livelihood_category_id) {
      newErrors['farmProfile.livelihood_category_id'] = 'Livelihood category is required';
    }

    // Validate at least one farm parcel
    if (formData.farmParcels.length === 0) {
      newErrors['farmParcels'] = 'At least one farm parcel is required';
    } else {
      // Validate each farm parcel
      formData.farmParcels.forEach((parcel, index) => {
        if (!parcel.barangay.trim()) {
          newErrors[`farmParcels.${index}.barangay`] = 'Parcel barangay is required';
        }
        if (!parcel.tenure_type) {
          newErrors[`farmParcels.${index}.tenure_type`] = 'Tenure type is required';
        }
        if (!parcel.farm_area || parcel.farm_area <= 0) {
          newErrors[`farmParcels.${index}.farm_area`] = 'Farm area must be greater than 0';
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      console.error('❌ Form validation failed:', newErrors);
    } else {
      console.log('✅ Form validation passed');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Navigate to next step
  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Go to specific step
  const goToStep = useCallback((step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  // Save draft to API
  const saveDraft = useCallback(async () => {
    if (!userId) {
      setApiResponse({ success: false, error: 'User ID is required' });
      return false;
    }

    setIsSavingDraft(true);
    try {
      // Check if beneficiary details already exist
      const existingBeneficiary = await beneficiaryDetailsService.getDetailsByUserId(userId);
      
      let result;
      if (existingBeneficiary.success && existingBeneficiary.data) {
        // Update existing beneficiary details with draft data
        const updateResult = await beneficiaryDetailsService.updateDetails(
          existingBeneficiary.data.id, 
          {
            ...formData.beneficiaryDetails,
            profile_completion_status: 'pending',
            last_updated_by_beneficiary: new Date().toISOString()
          }
        );
        
        if (updateResult.success) {
          setLastSavedDraft(updateResult.data);
          setApiResponse({ success: true, message: 'Draft updated successfully' });
          return true;
        } else {
          setApiResponse({ success: false, error: 'Failed to update draft' });
          return false;
        }
      } else {
        // Create new beneficiary details as draft
        result = await rsbsaFormService.saveDraft(formData, userId);
        
        if (result.success) {
          setLastSavedDraft(result.data);
          setApiResponse({ success: true, message: 'Draft saved successfully' });
          return true;
        } else {
          setApiResponse({ success: false, error: result.error });
          return false;
        }
      }
    } catch (error) {
      logHookError('saveDraft', error, { formData, userId });
      setApiResponse({ success: false, error: 'Failed to save draft' });
      return false;
    } finally {
      setIsSavingDraft(false);
    }
  }, [formData, userId]);

  // Submit form to API
  const submitForm = useCallback(async () => {
    if (!validateForm()) {
      return false;
    }

    if (!userId) {
      setApiResponse({ success: false, error: 'User ID is required' });
      return false;
    }

    setIsSubmitting(true);
    try {
      // Check if beneficiary details already exist
      const existingBeneficiary = await beneficiaryDetailsService.getDetailsByUserId(userId);
      
      let result;
      if (existingBeneficiary.success && existingBeneficiary.data) {
        // Update existing beneficiary details first
        const updateResult = await beneficiaryDetailsService.updateDetails(
          existingBeneficiary.data.id, 
          formData.beneficiaryDetails
        );
        
        if (!updateResult.success) {
          setApiResponse({ success: false, error: 'Failed to update beneficiary details' });
          return false;
        }
        
        // Then submit the complete RSBSA form
        result = await rsbsaFormService.submitCompleteForm(formData, userId);
      } else {
        // Create new beneficiary details and submit RSBSA form
        result = await rsbsaFormService.submitCompleteForm(formData, userId);
      }
      
      if (result.success) {
        setApiResponse({ success: true, message: 'Form submitted successfully', data: result.data });
        
        // Update form data with returned IDs
        if (result.data) {
          setFormData(prevData => ({
            ...prevData,
            beneficiaryDetails: {
              ...prevData.beneficiaryDetails,
              ...result.data.beneficiaryDetails
            },
            farmProfile: {
              ...prevData.farmProfile,
              ...result.data.farmProfile
            }
          }));
        }
        
        return true;
      } else {
        setApiResponse({ success: false, error: result.error });
        return false;
      }
    } catch (error) {
      logHookError('submitForm', error, { formData, userId });
      setApiResponse({ success: false, error: 'Failed to submit form' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, userId, validateForm]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      beneficiaryDetails: {
        id: null,
        user_id: userId,
        system_generated_rsbsa_number: null,
        manual_rsbsa_number: null,
        rsbsa_verification_status: 'not_verified',
        rsbsa_verification_notes: null,
        rsbsa_verified_at: null,
        rsbsa_verified_by: null,
        barangay: '',
        municipality: 'Opol',
        province: 'Misamis Oriental',
        region: 'Region X (Northern Mindanao)',
        contact_number: '',
        emergency_contact_number: '',
        birth_date: null,
        place_of_birth: '',
        sex: null,
        civil_status: null,
        name_of_spouse: '',
        highest_education: null,
        religion: '',
        is_pwd: false,
        has_government_id: 'no',
        gov_id_type: '',
        gov_id_number: '',
        is_association_member: 'no',
        association_name: '',
        mothers_maiden_name: '',
        is_household_head: false,
        household_head_name: '',
        profile_completion_status: 'pending',
        is_profile_verified: false,
        verification_notes: null,
        profile_verified_at: null,
        profile_verified_by: null,
        data_source: 'self_registration',
        last_updated_by_beneficiary: null,
        completion_tracking: null
      },
      farmProfile: {
        id: null,
        beneficiary_id: null,
        livelihood_category_id: null,
        created_at: null,
        updated_at: null
      },
      farmParcels: [],
      farmerDetails: {
        id: null,
        farm_profile_id: null,
        is_rice: false,
        is_corn: false,
        is_other_crops: false,
        other_crops_description: '',
        is_livestock: false,
        livestock_description: '',
        is_poultry: false,
        poultry_description: '',
        created_at: null,
        updated_at: null
      },
      fisherfolkDetails: {
        id: null,
        farm_profile_id: null,
        is_fish_capture: false,
        is_aquaculture: false,
        is_fish_processing: false,
        other_fishing_description: '',
        created_at: null,
        updated_at: null
      },
      farmworkerDetails: {
        id: null,
        farm_profile_id: null,
        is_land_preparation: false,
        is_cultivation: false,
        is_harvesting: false,
        other_work_description: '',
        created_at: null,
        updated_at: null
      },
      agriYouthDetails: {
        id: null,
        farm_profile_id: null,
        is_agri_youth: false,
        is_part_of_farming_household: false,
        is_formal_agri_course: false,
        is_nonformal_agri_course: false,
        is_agri_program_participant: false,
        other_involvement_description: '',
        created_at: null,
        updated_at: null
      }
    });
    setErrors({});
    setCurrentStep(1);
    setApiResponse(null);
    setLastSavedDraft(null);
  }, [userId]);

  // Get form completion percentage
  const getFormProgress = useCallback(() => {
    const totalFields = 15; // Approximate number of required fields
    let completedFields = 0;

    // Check beneficiary details completion
    const { beneficiaryDetails } = formData;
    if (beneficiaryDetails.barangay) completedFields++;
    if (beneficiaryDetails.municipality) completedFields++;
    if (beneficiaryDetails.contact_number) completedFields++;
    if (beneficiaryDetails.birth_date) completedFields++;
    if (beneficiaryDetails.sex) completedFields++;
    if (beneficiaryDetails.civil_status) completedFields++;

    // Check farm profile completion
    if (formData.farmProfile.livelihood_category_id) completedFields++;

    // Check farm parcels completion
    if (formData.farmParcels.length > 0) {
      completedFields++;
      // Check if first parcel is properly filled
      const firstParcel = formData.farmParcels[0];
      if (firstParcel && firstParcel.barangay && firstParcel.tenure_type && firstParcel.farm_area > 0) {
        completedFields += 3;
      }
    }

    return Math.round((completedFields / totalFields) * 100);
  }, [formData]);

  // Clear API response
  const clearApiResponse = useCallback(() => {
    setApiResponse(null);
  }, []);

  return {
    // State
    formData,
    errors,
    isLoading,
    isSubmitting,
    isSavingDraft,
    currentStep,
    totalSteps,
    apiResponse,
    lastSavedDraft,
    hasPreFilledData,

    // Actions
    updateField,
    addFarmParcel,
    updateFarmParcel,
    removeFarmParcel,
    validateForm,
    nextStep,
    prevStep,
    goToStep,
    submitForm,
    saveDraft,
    resetForm,
    clearApiResponse,

    // Computed values
    formProgress: getFormProgress(),
    isValid: Object.keys(errors).length === 0,
    canSubmit: Object.keys(errors).length === 0 && formData.farmParcels.length > 0
  };
};

export default useRSBSAFormWithAPI;