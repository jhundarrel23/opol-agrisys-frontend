// API service for beneficiary details - Laravel backend integration
// This matches the beneficiary_details table migration

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.token || user.access_token || null;
};

/**
 * Create headers for API requests
 */
const createHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(getAuthToken() && { 'Authorization': `Bearer ${getAuthToken()}` })
});

/**
 * Handle API response
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Transform frontend data to backend format
 */
const transformToBackend = (formData) => ({
  // RSBSA INFORMATION & VERIFICATION
  system_generated_rsbsa_number: formData.system_generated_rsbsa_number || null,
  manual_rsbsa_number: formData.manual_rsbsa_number || null,
  rsbsa_verification_status: formData.rsbsa_verification_status || 'not_verified',
  rsbsa_verification_notes: formData.rsbsa_verification_notes || null,

  // LOCATION INFORMATION
  barangay: formData.barangay,
  municipality: formData.municipality || 'Opol',
  province: formData.province || 'Misamis Oriental',
  region: formData.region || 'Region X (Northern Mindanao)',

  // CONTACT INFORMATION
  contact_number: formData.contact_number,
  emergency_contact_number: formData.emergency_contact_number || null,

  // PERSONAL INFORMATION
  birth_date: formData.birth_date,
  place_of_birth: formData.place_of_birth || null,
  sex: formData.sex.toLowerCase(), // Convert to lowercase for backend enum
  civil_status: formData.civil_status || null,
  name_of_spouse: formData.name_of_spouse || null,

  // EDUCATIONAL & DEMOGRAPHIC INFORMATION
  highest_education: formData.highest_education || null,
  religion: formData.religion || null,
  is_pwd: formData.is_pwd || false,

  // GOVERNMENT ID INFORMATION
  has_government_id: formData.has_government_id || 'no',
  gov_id_type: formData.gov_id_type || null,
  gov_id_number: formData.gov_id_number || null,

  // ASSOCIATION & ORGANIZATION MEMBERSHIP
  is_association_member: formData.is_association_member || 'no',
  association_name: formData.association_name || null,

  // HOUSEHOLD INFORMATION
  mothers_maiden_name: formData.mothers_maiden_name || null,
  is_household_head: formData.is_household_head || false,
  household_head_name: formData.household_head_name || null,

  // PROFILE COMPLETION & VERIFICATION SYSTEM
  profile_completion_status: 'completed',
  data_source: 'self_registration',
  last_updated_by_beneficiary: new Date().toISOString(),
  completion_tracking: formData.completion_tracking || {}
});

/**
 * Transform backend data to frontend format
 */
const transformToFrontend = (backendData) => ({
  ...backendData,
  // Convert sex back to title case for frontend display
  sex: backendData.sex ? backendData.sex.charAt(0).toUpperCase() + backendData.sex.slice(1) : '',
});

/**
 * Beneficiary Details API Service
 */
export const beneficiaryDetailsAPI = {
  /**
   * Get beneficiary details
   */
  async getBeneficiaryDetails(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/beneficiary-details/${userId}`, {
        method: 'GET',
        headers: createHeaders()
      });
      
      const data = await handleResponse(response);
      return {
        success: true,
        data: transformToFrontend(data.data || data)
      };
    } catch (error) {
      console.error('Error fetching beneficiary details:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Create or update beneficiary details
   */
  async saveBeneficiaryDetails(formData, userId) {
    try {
      const backendData = transformToBackend(formData);
      
      const response = await fetch(`${API_BASE_URL}/beneficiary-details`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify({
          user_id: userId,
          ...backendData
        })
      });
      
      const data = await handleResponse(response);
      return {
        success: true,
        data: transformToFrontend(data.data || data)
      };
    } catch (error) {
      console.error('Error saving beneficiary details:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Update beneficiary details
   */
  async updateBeneficiaryDetails(formData, userId) {
    try {
      const backendData = transformToBackend(formData);
      
      const response = await fetch(`${API_BASE_URL}/beneficiary-details/${userId}`, {
        method: 'PUT',
        headers: createHeaders(),
        body: JSON.stringify(backendData)
      });
      
      const data = await handleResponse(response);
      return {
        success: true,
        data: transformToFrontend(data.data || data)
      };
    } catch (error) {
      console.error('Error updating beneficiary details:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Get beneficiary verification status
   */
  async getVerificationStatus(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/beneficiary-details/${userId}/verification-status`, {
        method: 'GET',
        headers: createHeaders()
      });
      
      const data = await handleResponse(response);
      return {
        success: true,
        data: data.data || data
      };
    } catch (error) {
      console.error('Error fetching verification status:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

export default beneficiaryDetailsAPI;