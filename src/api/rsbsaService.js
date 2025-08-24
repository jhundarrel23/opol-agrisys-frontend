import axiosInstance from './axiosInstance';

/**
 * RSBSA API Service
 * Handles all API operations for RSBSA (Registry System for Basic Sectors in Agriculture)
 */

// Base API endpoints
const RSBSA_ENDPOINTS = {
  // Main enrollment endpoints
  ENROLLMENTS: '/api/rsbsa/enrollments',
  ENROLLMENT_STATUS: '/api/rsbsa/enrollments/status',
  
  // Profile endpoints
  BENEFICIARY_DETAILS: '/api/rsbsa/beneficiary-details',
  FARM_PROFILES: '/api/rsbsa/farm-profiles',
  
  // Detail endpoints
  FARMER_DETAILS: '/api/rsbsa/farmer-details',
  FISHERFOLK_DETAILS: '/api/rsbsa/fisherfolk-details',
  FARMWORKER_DETAILS: '/api/rsbsa/farmworker-details',
  AGRI_YOUTH_DETAILS: '/api/rsbsa/agri-youth-details',
  
  // Farm parcels
  FARM_PARCELS: '/api/rsbsa/farm-parcels',
  
  // Reference data
  LIVELIHOOD_CATEGORIES: '/api/rsbsa/livelihood-categories',
  COMMODITIES: '/api/rsbsa/commodities',
  BARANGAYS: '/api/rsbsa/barangays',
  MUNICIPALITIES: '/api/rsbsa/municipalities',
  PROVINCES: '/api/rsbsa/provinces',
  REGIONS: '/api/rsbsa/regions'
};

/**
 * RSBSA Enrollment Operations
 */
export const rsbsaEnrollmentService = {
  // Create new RSBSA enrollment
  async createEnrollment(enrollmentData) {
    try {
      const response = await axiosInstance.post(RSBSA_ENDPOINTS.ENROLLMENTS, enrollmentData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create enrollment',
        details: error.response?.data
      };
    }
  },

  // Get enrollment by ID
  async getEnrollment(enrollmentId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.ENROLLMENTS}/${enrollmentId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch enrollment',
        details: error.response?.data
      };
    }
  },

  // Get enrollment by user ID
  async getEnrollmentByUserId(userId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.ENROLLMENTS}/user/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch user enrollment',
        details: error.response?.data
      };
    }
  },

  // Get enrollment by beneficiary ID
  async getEnrollmentByBeneficiaryId(beneficiaryId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.ENROLLMENTS}/beneficiary/${beneficiaryId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch beneficiary enrollment',
        details: error.response?.data
      };
    }
  },

  // Update enrollment
  async updateEnrollment(enrollmentId, updateData) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.ENROLLMENTS}/${enrollmentId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update enrollment',
        details: error.response?.data
      };
    }
  },

  // Get enrollment status
  async getEnrollmentStatus(enrollmentId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.ENROLLMENT_STATUS}/${enrollmentId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch enrollment status',
        details: error.response?.data
      };
    }
  },

  // Submit enrollment for review
  async submitEnrollment(enrollmentId) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.ENROLLMENTS}/${enrollmentId}/submit`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to submit enrollment',
        details: error.response?.data
      };
    }
  },

  // Approve enrollment
  async approveEnrollment(enrollmentId, rsbsaNumber, coordinatorNotes = '') {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.ENROLLMENTS}/${enrollmentId}/approve`, {
        assigned_rsbsa_number: rsbsaNumber,
        coordinator_notes: coordinatorNotes
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to approve enrollment',
        details: error.response?.data
      };
    }
  },

  // Reject enrollment
  async rejectEnrollment(enrollmentId, rejectionReason, coordinatorNotes = '') {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.ENROLLMENTS}/${enrollmentId}/reject`, {
        rejection_reason: rejectionReason,
        coordinator_notes: coordinatorNotes
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to reject enrollment',
        details: error.response?.data
      };
    }
  }
};

/**
 * Beneficiary Details Operations
 */
export const beneficiaryDetailsService = {
  // Create beneficiary details
  async createDetails(detailsData) {
    try {
      const response = await axiosInstance.post(RSBSA_ENDPOINTS.BENEFICIARY_DETAILS, detailsData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create beneficiary details',
        details: error.response?.data
      };
    }
  },

  // Get details by ID
  async getDetails(detailsId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.BENEFICIARY_DETAILS}/${detailsId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch beneficiary details',
        details: error.response?.data
      };
    }
  },

  // Get details by user ID
  async getDetailsByUserId(userId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.BENEFICIARY_DETAILS}/user/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch user details',
        details: error.response?.data
      };
    }
  },

  // Update details
  async updateDetails(detailsId, updateData) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.BENEFICIARY_DETAILS}/${detailsId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update beneficiary details',
        details: error.response?.data
      };
    }
  },

  // Check RSBSA number availability
  async checkRSBSANumberAvailability(rsbsaNumber) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.BENEFICIARY_DETAILS}/check-rsbsa/${rsbsaNumber}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to check RSBSA number availability',
        details: error.response?.data
      };
    }
  }
};

/**
 * Farm Profile Operations
 */
export const farmProfileService = {
  // Create farm profile
  async createProfile(profileData) {
    try {
      const response = await axiosInstance.post(RSBSA_ENDPOINTS.FARM_PROFILES, profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create farm profile',
        details: error.response?.data
      };
    }
  },

  // Get farm profile by ID
  async getProfile(profileId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.FARM_PROFILES}/${profileId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch farm profile',
        details: error.response?.data
      };
    }
  },

  // Update farm profile
  async updateProfile(profileId, updateData) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.FARM_PROFILES}/${profileId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update farm profile',
        details: error.response?.data
      };
    }
  }
};

/**
 * Farm Parcels Operations
 */
export const farmParcelsService = {
  // Create farm parcel
  async createParcel(parcelData) {
    try {
      const response = await axiosInstance.post(RSBSA_ENDPOINTS.FARM_PARCELS, parcelData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create farm parcel',
        details: error.response?.data
      };
    }
  },

  // Create multiple farm parcels
  async createMultipleParcels(parcelsData) {
    try {
      const response = await axiosInstance.post(`${RSBSA_ENDPOINTS.FARM_PARCELS}/bulk`, parcelsData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create farm parcels',
        details: error.response?.data
      };
    }
  },

  // Get parcels by farm profile ID
  async getParcelsByFarmProfile(farmProfileId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.FARM_PARCELS}/farm-profile/${farmProfileId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch farm parcels',
        details: error.response?.data
      };
    }
  },

  // Update farm parcel
  async updateParcel(parcelId, updateData) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.FARM_PARCELS}/${parcelId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update farm parcel',
        details: error.response?.data
      };
    }
  },

  // Delete farm parcel
  async deleteParcel(parcelId) {
    try {
      const response = await axiosInstance.delete(`${RSBSA_ENDPOINTS.FARM_PARCELS}/${parcelId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete farm parcel',
        details: error.response?.data
      };
    }
  }
};

/**
 * Livelihood Details Operations
 */
export const livelihoodDetailsService = {
  // Farmer details
  async createFarmerDetails(detailsData) {
    try {
      const response = await axiosInstance.post(RSBSA_ENDPOINTS.FARMER_DETAILS, detailsData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create farmer details',
        details: error.response?.data
      };
    }
  },

  async updateFarmerDetails(detailsId, updateData) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.FARMER_DETAILS}/${detailsId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update farmer details',
        details: error.response?.data
      };
    }
  },

  // Fisherfolk details
  async createFisherfolkDetails(detailsData) {
    try {
      const response = await axiosInstance.post(RSBSA_ENDPOINTS.FISHERFOLK_DETAILS, detailsData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create fisherfolk details',
        details: error.response?.data
      };
    }
  },

  async updateFisherfolkDetails(detailsId, updateData) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.FISHERFOLK_DETAILS}/${detailsId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update fisherfolk details',
        details: error.response?.data
      };
    }
  },

  // Farmworker details
  async createFarmworkerDetails(detailsData) {
    try {
      const response = await axiosInstance.post(RSBSA_ENDPOINTS.FARMWORKER_DETAILS, detailsData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create farmworker details',
        details: error.response?.data
      };
    }
  },

  async updateFarmworkerDetails(detailsId, updateData) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.FARMWORKER_DETAILS}/${detailsId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update farmworker details',
        details: error.response?.data
      };
    }
  },

  // Agri youth details
  async createAgriYouthDetails(detailsData) {
    try {
      const response = await axiosInstance.post(RSBSA_ENDPOINTS.AGRI_YOUTH_DETAILS, detailsData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create agri youth details',
        details: error.response?.data
      };
    }
  },

  async updateAgriYouthDetails(detailsId, updateData) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.AGRI_YOUTH_DETAILS}/${detailsId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update agri youth details',
        details: error.response?.data
      };
    }
  }
};

/**
 * Reference Data Operations
 */
export const referenceDataService = {
  // Get livelihood categories
  async getLivelihoodCategories() {
    try {
      const response = await axiosInstance.get(RSBSA_ENDPOINTS.LIVELIHOOD_CATEGORIES);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch livelihood categories',
        details: error.response?.data
      };
    }
  },

  // Get commodities
  async getCommodities() {
    try {
      const response = await axiosInstance.get(RSBSA_ENDPOINTS.COMMODITIES);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch commodities',
        details: error.response?.data
      };
    }
  },

  // Get barangays
  async getBarangays() {
    try {
      const response = await axiosInstance.get(RSBSA_ENDPOINTS.BARANGAYS);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch barangays',
        details: error.response?.data
      };
    }
  },

  // Get municipalities
  async getMunicipalities() {
    try {
      const response = await axiosInstance.get(RSBSA_ENDPOINTS.MUNICIPALITIES);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch municipalities',
        details: error.response?.data
      };
    }
  },

  // Get provinces
  async getProvinces() {
    try {
      const response = await axiosInstance.get(RSBSA_ENDPOINTS.PROVINCES);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch provinces',
        details: error.response?.data
      };
    }
  },

  // Get regions
  async getRegions() {
    try {
      const response = await axiosInstance.get(RSBSA_ENDPOINTS.REGIONS);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch regions',
        details: error.response?.data
      };
    }
  }
};

/**
 * Complete RSBSA Form Submission
 * This handles the entire form submission process
 */
export const rsbsaFormService = {
  async submitCompleteForm(formData, userId) {
    try {
      // Step 1: Create beneficiary details
      const beneficiaryResult = await beneficiaryDetailsService.createDetails({
        ...formData.beneficiaryDetails,
        user_id: userId,
        profile_completion_status: 'completed',
        data_source: 'self_registration'
      });

      if (!beneficiaryResult.success) {
        return beneficiaryResult;
      }

      const beneficiaryDetailsId = beneficiaryResult.data.id;

      // Step 2: Create farm profile
      const farmProfileResult = await farmProfileService.createProfile({
        ...formData.farmProfile,
        beneficiary_id: beneficiaryDetailsId
      });

      if (!farmProfileResult.success) {
        return farmProfileResult;
      }

      const farmProfileId = farmProfileResult.data.id;

      // Step 3: Create farm parcels
      const parcelsData = formData.farmParcels.map(parcel => ({
        ...parcel,
        farm_profile_id: farmProfileId
      }));

      const parcelsResult = await farmParcelsService.createMultipleParcels(parcelsData);
      if (!parcelsResult.success) {
        return parcelsResult;
      }

      // Step 4: Create livelihood details based on category
      let livelihoodDetailsResult = { success: true, data: null };

      if (formData.farmProfile.livelihood_category_id === 1) { // Farmer
        livelihoodDetailsResult = await livelihoodDetailsService.createFarmerDetails({
          ...formData.farmerDetails,
          farm_profile_id: farmProfileId
        });
      } else if (formData.farmProfile.livelihood_category_id === 2) { // Fisherfolk
        livelihoodDetailsResult = await livelihoodDetailsService.createFisherfolkDetails({
          ...formData.fisherfolkDetails,
          farm_profile_id: farmProfileId
        });
      } else if (formData.farmProfile.livelihood_category_id === 3) { // Farmworker
        livelihoodDetailsResult = await livelihoodDetailsService.createFarmworkerDetails({
          ...formData.farmworkerDetails,
          farm_profile_id: farmProfileId
        });
      } else if (formData.farmProfile.livelihood_category_id === 4) { // Agri Youth
        livelihoodDetailsResult = await livelihoodDetailsService.createAgriYouthDetails({
          ...formData.agriYouthDetails,
          farm_profile_id: farmProfileId
        });
      }

      if (!livelihoodDetailsResult.success) {
        return livelihoodDetailsResult;
      }

      // Step 5: Create RSBSA enrollment
      const enrollmentResult = await rsbsaEnrollmentService.createEnrollment({
        user_id: userId,
        beneficiary_id: beneficiaryDetailsId,
        farm_profile_id: farmProfileId,
        application_reference_code: `RSBSA-${Date.now()}`,
        enrollment_year: new Date().getFullYear(),
        enrollment_type: 'new',
        application_status: 'submitted',
        submitted_at: new Date().toISOString()
      });

      if (!enrollmentResult.success) {
        return enrollmentResult;
      }

      return {
        success: true,
        data: {
          enrollment: enrollmentResult.data,
          beneficiaryDetails: beneficiaryResult.data,
          farmProfile: farmProfileResult.data,
          farmParcels: parcelsResult.data,
          livelihoodDetails: livelihoodDetailsResult.data
        },
        message: 'RSBSA application submitted successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: 'Failed to submit RSBSA application',
        details: error.message
      };
    }
  },

  // Get complete RSBSA data for a user
  async getCompleteRSBSAData(userId) {
    try {
      // Get enrollment
      const enrollmentResult = await rsbsaEnrollmentService.getEnrollmentByUserId(userId);
      if (!enrollmentResult.success) {
        return enrollmentResult;
      }

      const enrollment = enrollmentResult.data;
      if (!enrollment) {
        return { success: true, data: null, message: 'No RSBSA enrollment found' };
      }

      // Get beneficiary details
      const beneficiaryResult = await beneficiaryDetailsService.getDetailsByUserId(userId);
      if (!beneficiaryResult.success) {
        return beneficiaryResult;
      }

      // Get farm profile
      const farmProfileResult = await farmProfileService.getProfile(enrollment.farm_profile_id);
      if (!farmProfileResult.success) {
        return farmProfileResult;
      }

      // Get farm parcels
      const parcelsResult = await farmParcelsService.getParcelsByFarmProfile(enrollment.farm_profile_id);
      if (!parcelsResult.success) {
        return parcelsResult;
      }

      // Get livelihood details based on category
      let livelihoodDetails = null;
      if (farmProfileResult.data.livelihood_category_id === 1) {
        const result = await livelihoodDetailsService.getFarmerDetails(farmProfileResult.data.id);
        livelihoodDetails = result.success ? result.data : null;
      } else if (farmProfileResult.data.livelihood_category_id === 2) {
        const result = await livelihoodDetailsService.getFisherfolkDetails(farmProfileResult.data.id);
        livelihoodDetails = result.success ? result.data : null;
      } else if (farmProfileResult.data.livelihood_category_id === 3) {
        const result = await livelihoodDetailsService.getFarmworkerDetails(farmProfileResult.data.id);
        livelihoodDetails = result.success ? result.data : null;
      } else if (farmProfileResult.data.livelihood_category_id === 4) {
        const result = await livelihoodDetailsService.getAgriYouthDetails(farmProfileResult.data.id);
        livelihoodDetails = result.success ? result.data : null;
      }

      return {
        success: true,
        data: {
          enrollment,
          beneficiaryDetails: beneficiaryResult.data,
          farmProfile: farmProfileResult.data,
          farmParcels: parcelsResult.data,
          livelihoodDetails
        }
      };

    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch RSBSA data',
        details: error.message
      };
    }
  },

  // Save draft form data
  async saveDraft(formData, userId) {
    try {
      // For draft, we only save to beneficiary details with pending status
      const beneficiaryResult = await beneficiaryDetailsService.createDetails({
        ...formData.beneficiaryDetails,
        user_id: userId,
        profile_completion_status: 'pending',
        data_source: 'self_registration'
      });

      if (!beneficiaryResult.success) {
        return beneficiaryResult;
      }

      return {
        success: true,
        data: {
          beneficiaryDetails: beneficiaryResult.data
        },
        message: 'Draft saved successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: 'Failed to save draft',
        details: error.message
      };
    }
  }
};

// Export all services
export default {
  rsbsaEnrollmentService,
  beneficiaryDetailsService,
  farmProfileService,
  farmParcelsService,
  livelihoodDetailsService,
  referenceDataService,
  rsbsaFormService
};