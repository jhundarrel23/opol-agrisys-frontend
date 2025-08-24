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
  Paper
} from '@mui/material';
import {
  Person as PersonIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Import the API service for beneficiary details
import { beneficiaryDetailsService } from '../../../../api/rsbsaService';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5)
  }
}));

const BeneficiaryPersonalDetails = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    contact_number: '',
    emergency_contact_number: '',
    email: '',
    birth_date: '',
    civil_status: '',
    highest_education: '',
    is_pwd: false,
    address: '',
    barangay: '',
    municipality: 'Opol',
    province: 'Misamis Oriental',
    region: 'Region X (Northern Mindanao)'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Mock data for dropdowns - in real app, fetch from API
  const barangayOptions = [
    'Barra', 'Bonbon', 'Cauyunan', 'Luyongbonbon', 'Malagana', 'Poblacion', 'Taboc', 'Tingalan'
  ];

  const civilStatusOptions = [
    'Single', 'Married', 'Widowed', 'Divorced', 'Separated'
  ];

  const educationOptions = [
    'No Formal Education', 'Elementary Level', 'Elementary Graduate', 
    'High School Level', 'High School Graduate', 'College Level', 
    'College Graduate', 'Post Graduate'
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

      const result = await beneficiaryDetailsService.getDetailsByUserId(userId);
      
      if (result.success && result.data) {
        setFormData(prevData => ({
          ...prevData,
          ...result.data
        }));
        console.log('✅ Loaded existing beneficiary data:', result.data);
      } else {
        console.log('ℹ️ No existing data found, using default form');
      }
    } catch (error) {
      console.error('❌ Error loading beneficiary data:', error);
      setShowError(true);
      setErrorMessage('Failed to load existing data. Please try again.');
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
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name?.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name?.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!formData.contact_number?.trim()) {
      newErrors.contact_number = 'Contact number is required';
    }
    if (!formData.barangay?.trim()) {
      newErrors.barangay = 'Barangay is required';
    }
    if (!formData.birth_date) {
      newErrors.birth_date = 'Birth date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      // Get user ID from localStorage or auth context
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const userId = storedUser.id || '123'; // Placeholder - replace with actual user ID

      const result = await beneficiaryDetailsService.createDetails({
        ...formData,
        user_id: userId
      });

      if (result.success) {
        setShowSuccess(true);
        setIsEditing(false);
        console.log('✅ Personal details saved successfully:', result.data);
        
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        throw new Error(result.message || 'Failed to save personal details');
      }
    } catch (error) {
      console.error('❌ Error saving personal details:', error);
      setShowError(true);
      setErrorMessage(error.message || 'Failed to save personal details. Please try again.');
      
      // Hide error message after 5 seconds
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowSuccess(false);
    setShowError(false);
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
        {/* Header */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PersonIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h3" component="h1" fontWeight="bold">
                Personal Details
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage your personal information for RSBSA registration
              </Typography>
            </Box>
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
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              size="large"
            >
              Edit Personal Details
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleCancel}
                size="large"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={isSaving}
                size="large"
              >
                {isSaving ? <CircularProgress size={20} /> : 'Save Changes'}
              </Button>
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

              <Grid item xs={12} md={4}>
                <StyledTextField
                  fullWidth
                  label="First Name *"
                  value={formData.first_name}
                  onChange={(e) => handleFieldChange('first_name', e.target.value)}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <StyledTextField
                  fullWidth
                  label="Last Name *"
                  value={formData.last_name}
                  onChange={(e) => handleFieldChange('last_name', e.target.value)}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <StyledTextField
                  fullWidth
                  label="Middle Name"
                  value={formData.middle_name}
                  onChange={(e) => handleFieldChange('middle_name', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>

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
                  value={formData.contact_number}
                  onChange={(e) => handleFieldChange('contact_number', e.target.value)}
                  error={!!errors.contact_number}
                  helperText={errors.contact_number || 'Format: 09XXXXXXXXX'}
                  placeholder="09XXXXXXXXX"
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Emergency Contact Number"
                  value={formData.emergency_contact_number}
                  onChange={(e) => handleFieldChange('emergency_contact_number', e.target.value)}
                  placeholder="09XXXXXXXXX"
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  disabled={!isEditing}
                />
              </Grid>

              {/* Personal Details */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2, mb: 2 }}>
                  Personal Details
                </Typography>
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
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  >
                    {barangayOptions.map((barangay) => (
                      <MenuItem key={barangay} value={barangay}>
                        {barangay}
                      </MenuItem>
                    ))}
                  </Select>
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
                />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Complete Address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  placeholder="House/Unit Number, Street, Subdivision, etc."
                  disabled={!isEditing}
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
            </Grid>
          </CardContent>
        </StyledCard>
      </Container>
    </>
  );
};

export default BeneficiaryPersonalDetails;