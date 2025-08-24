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
  BENEFICIARY_PROFILES: '/api/rsbsa/beneficiary-profiles',
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
  }
};

/**
 * Beneficiary Profile Operations
 */
export const beneficiaryProfileService = {
  // Create beneficiary profile
  async createProfile(profileData) {
    try {
      const response = await axiosInstance.post(RSBSA_ENDPOINTS.BENEFICIARY_PROFILES, profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create beneficiary profile',
        details: error.response?.data
      };
    }
  },

  // Get profile by ID
  async getProfile(profileId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.BENEFICIARY_PROFILES}/${profileId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch beneficiary profile',
        details: error.response?.data
      };
    }
  },

  // Get profile by user ID
  async getProfileByUserId(userId) {
    try {
      const response = await axiosInstance.get(`${RSBSA_ENDPOINTS.BENEFICIARY_PROFILES}/user/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch user profile',
        details: error.response?.data
      };
    }
  },

  // Update profile
  async updateProfile(profileId, updateData) {
    try {
      const response = await axiosInstance.put(`${RSBSA_ENDPOINTS.BENEFICIARY_PROFILES}/${profileId}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update beneficiary profile',
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
      // Step 1: Create beneficiary profile
      const beneficiaryResult = await beneficiaryProfileService.createProfile({
        ...formData.beneficiaryProfile,
        user_id: userId
      });

      if (!beneficiaryResult.success) {
        return beneficiaryResult;
      }

      const beneficiaryProfileId = beneficiaryResult.data.id;

      // Step 2: Create farm profile
      const farmProfileResult = await farmProfileService.createProfile({
        ...formData.farmProfile,
        beneficiary_id: beneficiaryProfileId
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
        ...formData.enrollment,
        user_id: userId,
        farm_profile_id: farmProfileId,
        reference_code: `RSBSA-${Date.now()}`,
        status: 'verifying',
        submitted_at: new Date().toISOString()
      });

      if (!enrollmentResult.success) {
        return enrollmentResult;
      }

      return {
        success: true,
        data: {
          enrollment: enrollmentResult.data,
          beneficiaryProfile: beneficiaryResult.data,
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

      // Get beneficiary profile
      const beneficiaryResult = await beneficiaryProfileService.getProfileByUserId(userId);
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
          beneficiaryProfile: beneficiaryResult.data,
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
  }
};

// Export all services
export default {
  rsbsaEnrollmentService,
  beneficiaryProfileService,
  farmProfileService,
  farmParcelsService,
  livelihoodDetailsService,
  referenceDataService,
  rsbsaFormService
};