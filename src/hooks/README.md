# RSBSA Hooks and API Services

This directory contains comprehensive hooks and API services for the RSBSA (Registry System for Basic Sectors in Agriculture) system.

## Overview

The RSBSA system consists of several interconnected components:
- **RSBSA Enrollments** - Main application records
- **Beneficiary Details** - User profile information
- **Farm Profiles** - Agricultural activity information
- **Farm Parcels** - Land ownership details
- **Livelihood Details** - Specific agricultural activities (Farmer, Fisherfolk, Farmworker, Agri Youth)
- **Reference Data** - Dropdown options (barangays, municipalities, provinces, regions, livelihood categories, commodities)

## API Services

### `rsbsaService.js`

Main API service file containing all RSBSA-related API calls.

#### Available Services:

- `rsbsaEnrollmentService` - Handle enrollment CRUD operations
- `beneficiaryDetailsService` - Manage beneficiary profile data
- `farmProfileService` - Handle farm profile operations
- `farmParcelsService` - Manage farm parcel data
- `livelihoodDetailsService` - Handle livelihood-specific details
- `referenceDataService` - Fetch reference data (locations, categories, commodities)
- `rsbsaFormService` - Complete form submission and data retrieval

#### Example Usage:

```javascript
import { rsbsaFormService, referenceDataService } from '../api/rsbsaService';

// Submit complete form
const result = await rsbsaFormService.submitCompleteForm(formData, userId);

// Get reference data
const barangays = await referenceDataService.getBarangays();
```

## Hooks

### 1. `useRSBSAReferenceData`

Manages reference data like barangays, municipalities, provinces, regions, livelihood categories, and commodities.

**Features:**
- Automatic data loading on mount
- Caching to avoid unnecessary API calls
- Error handling and loading states
- Utility functions for filtering and searching

**Usage:**

```javascript
import useRSBSAReferenceData from '../hooks/useRSBSAReferenceData';

const MyComponent = () => {
  const {
    barangays,
    municipalities,
    provinces,
    regions,
    livelihoodCategories,
    commodities,
    isLoading,
    hasErrors,
    getBarangaysByMunicipality,
    getMunicipalitiesByProvince,
    refreshAllData
  } = useRSBSAReferenceData();

  // Use the data in your component
  return (
    <div>
      {isLoading ? 'Loading...' : (
        <select>
          {barangays.map(barangay => (
            <option key={barangay.id} value={barangay.id}>
              {barangay.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
```

### 2. `useRSBSAFormWithAPI`

Enhanced form hook that integrates with the API and matches the actual database schema.

**Features:**
- Form state management
- API integration for saving drafts and submitting forms
- Validation
- Step-by-step navigation
- Auto-loading of existing data
- **Pre-filled personal information** from existing beneficiary profile
- **Editable pre-filled data** - users can modify any field
- **Smart data handling** - updates existing profiles or creates new ones

**Usage:**

```javascript
import useRSBSAFormWithAPI from '../hooks/useRSBSAFormWithAPI';

const RSBSAForm = () => {
  const userId = '123'; // Get from auth context
  const {
    formData,
    errors,
    currentStep,
    isLoading,
    isSubmitting,
    updateField,
    nextStep,
    prevStep,
    submitForm,
    saveDraft,
    resetForm
  } = useRSBSAFormWithAPI(userId);

  const handleSubmit = async () => {
    const success = await submitForm();
    if (success) {
      console.log('Form submitted successfully!');
    }
  };

  return (
    <form>
      {/* Your form fields */}
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

### 3. `useRSBSAEnrollmentStatus`

Manages enrollment status, tracking, and coordinator operations.

**Features:**
- Enrollment data loading and management
- Status updates (submit, approve, reject)
- Coordinator operations
- Status tracking and display

**Usage:**

```javascript
import useRSBSAEnrollmentStatus from '../hooks/useRSBSAEnrollmentStatus';

const EnrollmentStatus = () => {
  const enrollmentId = '456';
  const {
    enrollment,
    enrollmentStatus,
    isLoading,
    canSubmit,
    canApprove,
    canReject,
    submitEnrollment,
    approveEnrollment,
    rejectEnrollment,
    statusDisplayText,
    statusColor
  } = useRSBSAEnrollmentStatus(enrollmentId);

  return (
    <div>
      <h3>Status: {statusDisplayText}</h3>
      {canSubmit && (
        <button onClick={submitEnrollment}>Submit for Review</button>
      )}
      {canApprove && (
        <button onClick={() => approveEnrollment('RSBSA-001')}>Approve</button>
      )}
    </div>
  );
};
```

### 4. `useRSBSAComplete` (Recommended)

Comprehensive hook that combines all RSBSA functionality into one convenient interface.

**Features:**
- All form functionality
- All reference data functionality
- All enrollment status functionality
- Enhanced validation and error handling
- Utility functions for common operations

**Usage:**

```javascript
import useRSBSAComplete from '../hooks/useRSBSAComplete';

const RSBSAApplication = () => {
  const userId = '123';
  const {
    // Form data and actions
    formData,
    updateField,
    submitFormWithValidation,
    saveDraftWithValidation,
    
    // Reference data
    barangays,
    municipalities,
    provinces,
    regions,
    livelihoodCategories,
    
    // Enrollment status
    enrollment,
    enrollmentStatus,
    
    // Utility functions
    getLocationOptions,
    getFormCompletionStatus,
    getEnrollmentSummary,
    
    // Loading and error states
    isLoading,
    hasAnyErrors
  } = useRSBSAComplete(userId);

  const handleSubmit = async () => {
    const result = await submitFormWithValidation();
    if (result.success) {
      console.log('Application submitted!');
    } else {
      console.error('Submission failed:', result.error);
    }
  };

  return (
    <div>
      {isLoading ? 'Loading...' : (
        <form>
          {/* Your form fields */}
          <button onClick={handleSubmit}>Submit Application</button>
        </form>
      )}
    </div>
  );
};
```

## Database Schema Compatibility

The hooks are designed to work with the following database structure:

### `rsbsa_enrollments`
- `id`, `user_id`, `beneficiary_id`, `farm_profile_id`
- `application_reference_code`, `enrollment_year`, `enrollment_type`
- `application_status`, `submitted_at`, `approved_at`, `rejected_at`
- `rejection_reason`, `coordinator_notes`, `assigned_rsbsa_number`

### `beneficiary_details`
- `id`, `user_id`, `system_generated_rsbsa_number`, `manual_rsbsa_number`
- `barangay`, `municipality`, `province`, `region`
- `contact_number`, `birth_date`, `sex`, `civil_status`
- `highest_education`, `religion`, `is_pwd`
- `profile_completion_status`, `data_source`

### `farm_profiles`
- `id`, `beneficiary_id`, `livelihood_category_id`

### `farm_parcels`
- `id`, `farm_profile_id`, `parcel_number`, `barangay`
- `tenure_type`, `farm_area`, `farm_type`

### Livelihood Details Tables
- `farmer_details`, `fisherfolk_details`, `farmworker_details`, `agri_youth_details`

## Pre-filled Personal Information

The RSBSA form automatically loads existing personal information from the user's beneficiary profile and pre-fills the form fields. This data remains fully editable.

### How It Works:

1. **Automatic Loading**: When the form loads, it checks for existing beneficiary details
2. **Pre-population**: If found, personal information fields are automatically filled
3. **Editable**: All pre-filled fields remain editable - users can modify any information
4. **Smart Updates**: The system updates existing profiles or creates new ones as needed

### Usage Example:

```javascript
const RSBSAForm = () => {
  const userId = '123';
  const {
    formData,
    updateField,
    hasPreFilledData, // Check if data was pre-filled
    submitFormWithValidation
  } = useRSBSAComplete(userId);

  return (
    <div>
      {hasPreFilledData && (
        <Alert severity="info">
          Personal information pre-filled from your existing profile. 
          You can edit any field as needed.
        </Alert>
      )}
      
      <form>
        {/* Form fields will be pre-filled if data exists */}
        <TextField
          value={formData.beneficiaryDetails.contact_number || ''}
          onChange={(e) => updateField('beneficiaryDetails', 'contact_number', e.target.value)}
        />
      </form>
    </div>
  );
};
```

### Benefits:

- **User Experience**: No need to re-enter personal information
- **Data Consistency**: Ensures information is up-to-date
- **Flexibility**: Users can still modify any field
- **Efficiency**: Faster form completion

## Error Handling

All hooks include comprehensive error handling:

```javascript
const {
  enrollmentError,
  statusError,
  updateError,
  hasAnyErrors
} = useRSBSAComplete(userId);

if (hasAnyErrors) {
  // Handle errors appropriately
  console.error('Errors detected:', { enrollmentError, statusError, updateError });
}
```

## Loading States

All hooks provide loading states for better UX:

```javascript
const { isLoading, isSubmitting, isSavingDraft } = useRSBSAComplete(userId);

if (isLoading) {
  return <div>Loading application data...</div>;
}

if (isSubmitting) {
  return <div>Submitting application...</div>;
}
```

## Best Practices

1. **Use `useRSBSAComplete`** for most use cases - it provides everything you need
2. **Handle loading states** to provide good user experience
3. **Validate data** before submission using the built-in validation
4. **Use reference data** for dropdowns and selections
5. **Handle errors gracefully** using the error states provided
6. **Refresh data** when needed using the refresh functions

## Migration from Old Hook

If you're currently using the old `useRSBSAForm` hook:

```javascript
// Old usage
import { useRSBSAForm } from './useRSBSAForm';

// New usage
import useRSBSAComplete from '../hooks/useRSBSAComplete';

const MyComponent = () => {
  // Old
  const { formData, updateField, submitForm } = useRSBSAForm();
  
  // New
  const { formData, updateField, submitFormWithValidation } = useRSBSAComplete(userId);
  
  // The new hook provides the same interface plus much more
};
```

## API Endpoints

The hooks expect the following API endpoints to be available:

- `POST /api/rsbsa/enrollments` - Create enrollment
- `GET /api/rsbsa/enrollments/{id}` - Get enrollment
- `PUT /api/rsbsa/enrollments/{id}` - Update enrollment
- `POST /api/rsbsa/beneficiary-details` - Create beneficiary details
- `GET /api/rsbsa/barangays` - Get barangays
- `GET /api/rsbsa/municipalities` - Get municipalities
- `GET /api/rsbsa/provinces` - Get provinces
- `GET /api/rsbsa/regions` - Get regions
- `GET /api/rsbsa/livelihood-categories` - Get livelihood categories
- `GET /api/rsbsa/commodities` - Get commodities

## Support

For questions or issues with these hooks, please refer to the API documentation or contact the development team.