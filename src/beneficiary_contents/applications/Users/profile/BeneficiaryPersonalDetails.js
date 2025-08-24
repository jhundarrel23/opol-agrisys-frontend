import React, { useState, useEffect } from 'react';
import {
  Helmet
} from 'react-helmet-async';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  Paper,
  FormControlLabel,
  Switch,
  FormHelperText,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Person as PersonIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Styled components for better UI
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-2px)'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`
    }
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1.5, 3),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[4]
  }
}));

const BeneficiaryPersonalDetails = () => {
  const [formData, setFormData] = useState({
    // RSBSA INFORMATION
    system_generated_rsbsa_number: '',
    manual_rsbsa_number: '',
    rsbsa_verification_status: 'not_verified',
    
    // LOCATION INFORMATION
    barangay: '',
    municipality: 'Opol',
    province: 'Misamis Oriental',
    region: 'Region X (Northern Mindanao)',
    address: '',
    
    // CONTACT INFORMATION
    contact_number: '',
    emergency_contact_number: '',
    email: '',
    
    // PERSONAL INFORMATION
    birth_date: '',
    place_of_birth: '',
    sex: '',
    civil_status: '',
    name_of_spouse: '',
    
    // EDUCATIONAL & DEMOGRAPHIC
    highest_education: '',
    religion: '',
    is_pwd: false,
    
    // GOVERNMENT ID
    has_government_id: 'no',
    gov_id_type: '',
    gov_id_number: '',
    
    // ASSOCIATION MEMBERSHIP
    is_association_member: 'no',
    association_name: '',
    
    // HOUSEHOLD INFORMATION
    mothers_maiden_name: '',
    is_household_head: false,
    household_head_name: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Mock data for dropdowns - in real app, fetch from API
  const barangayOptions = [
    'Barra', 'Bonbon', 'Cauyunan', 'Luyongbonbon', 'Malagana', 'Poblacion', 'Taboc', 'Tingalan'
  ];

  const civilStatusOptions = [
    'single', 'married', 'widowed', 'separated', 'divorced'
  ];

  const educationOptions = [
    'None', 'Pre-school', 'Elementary', 'Junior High School', 'Senior High School', 'Vocational', 'College', 'Post Graduate'
  ];

  const sexOptions = [
    'male', 'female'
  ];

  const governmentIdTypes = [
    'Philippine Passport', 'Driver\'s License', 'SSS ID', 'GSIS ID', 'Voter\'s ID', 'Postal ID', 'TIN ID', 'PhilHealth ID', 'Other'
  ];

  const religions = [
    'Roman Catholic', 'Protestant', 'Islam', 'Buddhism', 'Hinduism', 'Atheist', 'Agnostic', 'Other'
  ];

  // Load existing beneficiary data
  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    setIsLoading(true);
    try {
      // Get user ID from localStorage or auth context
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const userId = storedUser.id || '123'; // Placeholder - replace with actual user ID

      const response = await axios.get(`/api/beneficiary-details/${userId}`);
      
      if (response.data.success && response.data.data) {
        setFormData(prevData => ({
          ...prevData,
          ...response.data.data
        }));
        setCompletionPercentage(response.data.meta?.completion_percentage || 0);
        console.log('✅ Loaded existing beneficiary data:', response.data.data);
      } else {
        console.log('ℹ️ No existing data found, using default form');
      }
    } catch (error) {
      console.error('❌ Error loading beneficiary data:', error);
      if (error.response?.status !== 404) { // Don't show error for new users
        setShowError(true);
        setErrorMessage('Failed to load existing data. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }

    // Handle conditional fields
    if (field === 'civil_status' && value !== 'married') {
      setFormData(prev => ({ ...prev, name_of_spouse: '' }));
    }
    if (field === 'has_government_id' && value === 'no') {
      setFormData(prev => ({ ...prev, gov_id_type: '', gov_id_number: '' }));
    }
    if (field === 'is_association_member' && value === 'no') {
      setFormData(prev => ({ ...prev, association_name: '' }));
    }
    if (field === 'is_household_head' && value === true) {
      setFormData(prev => ({ ...prev, household_head_name: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.barangay?.trim()) {
      newErrors.barangay = 'Barangay is required';
    }
    if (!formData.contact_number?.trim()) {
      newErrors.contact_number = 'Contact number is required';
    } else if (!/^09[0-9]{9}$/.test(formData.contact_number)) {
      newErrors.contact_number = 'Contact number must be in format: 09XXXXXXXXX';
    }
    if (!formData.birth_date) {
      newErrors.birth_date = 'Birth date is required';
    }
    if (!formData.sex) {
      newErrors.sex = 'Sex is required';
    }

    // Conditional validation
    if (formData.civil_status === 'married' && !formData.name_of_spouse?.trim()) {
      newErrors.name_of_spouse = 'Spouse name is required for married status';
    }
    if (formData.has_government_id === 'yes') {
      if (!formData.gov_id_type?.trim()) {
        newErrors.gov_id_type = 'Government ID type is required';
      }
      if (!formData.gov_id_number?.trim()) {
        newErrors.gov_id_number = 'Government ID number is required';
      }
    }
    if (formData.is_association_member === 'yes' && !formData.association_name?.trim()) {
      newErrors.association_name = 'Association name is required';
    }
    if (!formData.is_household_head && !formData.household_head_name?.trim()) {
      newErrors.household_head_name = 'Household head name is required';
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Emergency contact validation
    if (formData.emergency_contact_number && !/^09[0-9]{9}$/.test(formData.emergency_contact_number)) {
      newErrors.emergency_contact_number = 'Emergency contact must be in format: 09XXXXXXXXX';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setShowError(true);
      setErrorMessage('Please fix the validation errors before saving.');
      return;
    }

    setIsSaving(true);
    try {
      // Get user ID from localStorage or auth context
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const userId = storedUser.id || '123'; // Placeholder - replace with actual user ID

      // Use upsert endpoint (store method handles both create and update)
      const response = await axios.post('/api/beneficiary-details', {
        ...formData,
        user_id: userId
      });

      if (response.data.success) {
        setShowSuccess(true);
        setIsEditing(false);
        setCompletionPercentage(response.data.meta?.completion_percentage || 0);
        console.log('✅ Personal details saved successfully:', response.data.data);
        
        // Hide success message after 4 seconds
        setTimeout(() => setShowSuccess(false), 4000);
      } else {
        throw new Error(response.data.message || 'Failed to save personal details');
      }
    } catch (error) {
      console.error('❌ Error saving personal details:', error);
      
      let errorMsg = 'Failed to save personal details. Please try again.';
      
      if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const backendErrors = error.response.data.errors;
        setErrors(backendErrors);
        errorMsg = 'Please fix the validation errors.';
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setShowError(true);
      setErrorMessage(errorMsg);
      
      // Hide error message after 6 seconds
      setTimeout(() => setShowError(false), 6000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowSuccess(false);
    setShowError(false);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadExistingData(); // Reload original data
    setErrors({});
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Personal Details - RSBSA Beneficiary</title>
        <meta 
          name="description" 
          content="Manage your personal information for RSBSA registration and benefits" 
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header with Progress */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PersonIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" component="h1" fontWeight="bold">
                Personal Details
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage your personal information for RSBSA registration
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h4" fontWeight="bold">
                {completionPercentage}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Profile Complete
              </Typography>
            </Box>
          </Box>
          
          {/* Progress Bar */}
          <Box sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 1, height: 8, mb: 2 }}>
            <Box 
              sx={{ 
                width: `${completionPercentage}%`, 
                bgcolor: 'success.main', 
                height: 8, 
                borderRadius: 1,
                transition: 'width 0.5s ease-in-out'
              }} 
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              label="RSBSA Ready" 
              color="success" 
              variant="filled"
              icon={<CheckCircleIcon />}
            />
            <Chip 
              label="Data Sync" 
              color="info" 
              variant="filled"
            />
            <Chip 
              label={`${completionPercentage}% Complete`}
              color={completionPercentage >= 80 ? "success" : completionPercentage >= 50 ? "warning" : "error"}
              variant="filled"
            />
          </Box>
        </Paper>

        {/* Success/Error Alerts */}
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              ✅ Personal Details Saved Successfully!
            </Typography>
            <Typography variant="body2">
              Your information has been updated and will be used to pre-fill your RSBSA application forms.
              Profile completion: {completionPercentage}%
            </Typography>
          </Alert>
        )}

        {showError && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              ❌ Error Saving Personal Details
            </Typography>
            <Typography variant="body2">
              {errorMessage}
            </Typography>
          </Alert>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
          {!isEditing ? (
            <StyledButton
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              size="large"
            >
              Edit Personal Details
            </StyledButton>
          ) : (
            <>
              <StyledButton
                variant="outlined"
                onClick={handleCancel}
                size="large"
              >
                Cancel
              </StyledButton>
              <StyledButton
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={isSaving}
                size="large"
              >
                {isSaving ? <CircularProgress size={20} /> : 'Save Changes'}
              </StyledButton>
            </>
          )}
        </Box>

        {/* Personal Information Form */}
        <StyledCard>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PersonIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
              <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
                Personal Information
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                  Basic Information
                  <Chip label="Required" color="error" size="small" sx={{ ml: 2 }} />
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="First Name"
                  value={formData.first_name || ''}
                  onChange={(e) => handleFieldChange('first_name', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Last Name"
                  value={formData.last_name || ''}
                  onChange={(e) => handleFieldChange('last_name', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={!isEditing}>
                  <InputLabel>Sex *</InputLabel>
                  <Select
                    value={formData.sex || ''}
                    onChange={(e) => handleFieldChange('sex', e.target.value)}
                    label="Sex *"
                    error={!!errors.sex}
                  >
                    {sexOptions.map((sex) => (
                      <MenuItem key={sex} value={sex}>
                        {sex.charAt(0).toUpperCase() + sex.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.sex && <FormHelperText error>{errors.sex}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Birth Date *"
                  type="date"
                  value={formData.birth_date ? formData.birth_date.split('T')[0] : ''}
                  onChange={(e) => handleFieldChange('birth_date', e.target.value ? new Date(e.target.value).toISOString() : null)}
                  error={!!errors.birth_date}
                  helperText={errors.birth_date}
                  InputLabelProps={{ shrink: true }}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Place of Birth"
                  value={formData.place_of_birth || ''}
                  onChange={(e) => handleFieldChange('place_of_birth', e.target.value)}
                  disabled={!isEditing}
                  placeholder="City, Province"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={!isEditing}>
                  <InputLabel>Civil Status</InputLabel>
                  <Select
                    value={formData.civil_status || ''}
                    onChange={(e) => handleFieldChange('civil_status', e.target.value)}
                    label="Civil Status"
                  >
                    {civilStatusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {formData.civil_status === 'married' && (
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Name of Spouse *"
                    value={formData.name_of_spouse || ''}
                    onChange={(e) => handleFieldChange('name_of_spouse', e.target.value)}
                    error={!!errors.name_of_spouse}
                    helperText={errors.name_of_spouse}
                    disabled={!isEditing}
                    placeholder="Full name of spouse"
                  />
                </Grid>
              )}

              {/* Contact Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2, mb: 2 }}>
                  Contact Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Contact Number *"
                  value={formData.contact_number || ''}
                  onChange={(e) => handleFieldChange('contact_number', e.target.value)}
                  error={!!errors.contact_number}
                  helperText={errors.contact_number || 'Format: 09XXXXXXXXX'}
                  placeholder="09XXXXXXXXX"
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Emergency Contact Number"
                  value={formData.emergency_contact_number || ''}
                  onChange={(e) => handleFieldChange('emergency_contact_number', e.target.value)}
                  error={!!errors.emergency_contact_number}
                  helperText={errors.emergency_contact_number}
                  placeholder="09XXXXXXXXX"
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  placeholder="your.email@example.com"
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Educational & Demographic */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2, mb: 2 }}>
                  Educational & Demographic Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={!isEditing}>
                  <InputLabel>Highest Education</InputLabel>
                  <Select
                    value={formData.highest_education || ''}
                    onChange={(e) => handleFieldChange('highest_education', e.target.value)}
                    label="Highest Education"
                  >
                    {educationOptions.map((education) => (
                      <MenuItem key={education} value={education}>
                        {education}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Religion"
                  value={formData.religion || ''}
                  onChange={(e) => handleFieldChange('religion', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Your religion"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_pwd || false}
                      onChange={(e) => handleFieldChange('is_pwd', e.target.checked)}
                      disabled={!isEditing}
                      color="primary"
                    />
                  }
                  label="Person with Disability (PWD)"
                />
              </Grid>

              {/* Government ID */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2, mb: 2 }}>
                  Government Identification
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={!isEditing}>
                  <InputLabel>Do you have a Government ID?</InputLabel>
                  <Select
                    value={formData.has_government_id || 'no'}
                    onChange={(e) => handleFieldChange('has_government_id', e.target.value)}
                    label="Do you have a Government ID?"
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {formData.has_government_id === 'yes' && (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth disabled={!isEditing}>
                      <InputLabel>Government ID Type *</InputLabel>
                      <Select
                        value={formData.gov_id_type || ''}
                        onChange={(e) => handleFieldChange('gov_id_type', e.target.value)}
                        label="Government ID Type *"
                        error={!!errors.gov_id_type}
                      >
                        {governmentIdTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.gov_id_type && <FormHelperText error>{errors.gov_id_type}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledTextField
                      fullWidth
                      label="Government ID Number *"
                      value={formData.gov_id_number || ''}
                      onChange={(e) => handleFieldChange('gov_id_number', e.target.value)}
                      error={!!errors.gov_id_number}
                      helperText={errors.gov_id_number}
                      disabled={!isEditing}
                      placeholder="ID number"
                    />
                  </Grid>
                </>
              )}

              {/* Association Membership */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2, mb: 2 }}>
                  Association Membership
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={!isEditing}>
                  <InputLabel>Are you a member of an association?</InputLabel>
                  <Select
                    value={formData.is_association_member || 'no'}
                    onChange={(e) => handleFieldChange('is_association_member', e.target.value)}
                    label="Are you a member of an association?"
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {formData.is_association_member === 'yes' && (
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Association Name *"
                    value={formData.association_name || ''}
                    onChange={(e) => handleFieldChange('association_name', e.target.value)}
                    error={!!errors.association_name}
                    helperText={errors.association_name}
                    disabled={!isEditing}
                    placeholder="Name of your association"
                  />
                </Grid>
              )}

              {/* Household Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2, mb: 2 }}>
                  Household Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Mother's Maiden Name"
                  value={formData.mothers_maiden_name || ''}
                  onChange={(e) => handleFieldChange('mothers_maiden_name', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Mother's maiden name"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_household_head || false}
                      onChange={(e) => handleFieldChange('is_household_head', e.target.checked)}
                      disabled={!isEditing}
                      color="primary"
                    />
                  }
                  label="Are you the household head?"
                />
              </Grid>

              {!formData.is_household_head && (
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    fullWidth
                    label="Household Head Name *"
                    value={formData.household_head_name || ''}
                    onChange={(e) => handleFieldChange('household_head_name', e.target.value)}
                    error={!!errors.household_head_name}
                    helperText={errors.household_head_name}
                    disabled={!isEditing}
                    placeholder="Name of household head"
                  />
                </Grid>
              )}

              {/* Location Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2, mb: 2 }}>
                  Location Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={!isEditing}>
                  <InputLabel>Barangay *</InputLabel>
                  <Select
                    value={formData.barangay || ''}
                    onChange={(e) => handleFieldChange('barangay', e.target.value)}
                    label="Barangay *"
                    error={!!errors.barangay}
                  >
                    {barangayOptions.map((barangay) => (
                      <MenuItem key={barangay} value={barangay}>
                        {barangay}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.barangay && <FormHelperText error>{errors.barangay}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Municipality"
                  value={formData.municipality}
                  onChange={(e) => handleFieldChange('municipality', e.target.value)}
                  InputProps={{ readOnly: true }}
                  sx={{ backgroundColor: 'action.hover' }}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Province"
                  value={formData.province}
                  onChange={(e) => handleFieldChange('province', e.target.value)}
                  InputProps={{ readOnly: true }}
                  sx={{ backgroundColor: 'action.hover' }}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Region"
                  value={formData.region}
                  onChange={(e) => handleFieldChange('region', e.target.value)}
                  InputProps={{ readOnly: true }}
                  sx={{ backgroundColor: 'action.hover' }}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Complete Address"
                  multiline
                  rows={3}
                  value={formData.address || ''}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  placeholder="House/Unit Number, Street, Subdivision, etc."
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>

        {/* Information Card */}
        <StyledCard sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              ℹ️ How This Works
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Data Sync:</strong> Your personal information here will automatically pre-fill your RSBSA application forms.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Always Updated:</strong> Keep your information current to ensure smooth application processing.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Upsert Functionality:</strong> The system automatically creates or updates your profile based on existing data.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Progress Tracking:</strong> Monitor your profile completion percentage to ensure all required information is provided.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Container>
    </>
  );
};

export default BeneficiaryPersonalDetails;