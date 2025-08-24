import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

/**
 * Personal Information Section for RSBSA Form
 * Handles pre-filled data from existing beneficiary profile
 */
const PersonalInfoSection = ({ 
  formData, 
  errors, 
  updateField, 
  hasPreFilledData,
  barangays = [],
  municipalities = [],
  provinces = [],
  regions = []
}) => {
  const { beneficiaryDetails } = formData;

  return (
    <Box>
      {/* Pre-filled Data Notice */}
      {hasPreFilledData && (
        <Alert 
          severity="info" 
          icon={<InfoIcon />}
          sx={{ mb: 3 }}
        >
          <Typography variant="body2">
            <strong>Personal information pre-filled:</strong> Your existing profile data has been automatically loaded. 
            You can review and edit this information as needed for your RSBSA application.
          </Typography>
        </Alert>
      )}

      {/* Section Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
          Personal Information
        </Typography>
        {hasPreFilledData && (
          <Chip 
            label="Data Pre-filled from Profile" 
            color="success" 
            variant="outlined" 
            size="small"
          />
        )}
      </Box>

      {/* Location Information */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
        Location Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors['beneficiaryDetails.region']}>
            <InputLabel>Region *</InputLabel>
            <Select
              value={beneficiaryDetails.region || ''}
              onChange={(e) => updateField('beneficiaryDetails', 'region', e.target.value)}
              label="Region *"
            >
              {regions.map((region) => (
                <MenuItem key={region.id} value={region.name}>
                  {region.name}
                </MenuItem>
              ))}
            </Select>
            {errors['beneficiaryDetails.region'] && (
              <FormHelperText>{errors['beneficiaryDetails.region']}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors['beneficiaryDetails.province']}>
            <InputLabel>Province *</InputLabel>
            <Select
              value={beneficiaryDetails.province || ''}
              onChange={(e) => updateField('beneficiaryDetails', 'province', e.target.value)}
              label="Province *"
            >
              {provinces.map((province) => (
                <MenuItem key={province.id} value={province.name}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
            {errors['beneficiaryDetails.province'] && (
              <FormHelperText>{errors['beneficiaryDetails.province']}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors['beneficiaryDetails.municipality']}>
            <InputLabel>Municipality *</InputLabel>
            <Select
              value={beneficiaryDetails.municipality || ''}
              onChange={(e) => updateField('beneficiaryDetails', 'municipality', e.target.value)}
              label="Municipality *"
            >
              {municipalities.map((municipality) => (
                <MenuItem key={municipality.id} value={municipality.name}>
                  {municipality.name}
                </MenuItem>
              ))}
            </Select>
            {errors['beneficiaryDetails.municipality'] && (
              <FormHelperText>{errors['beneficiaryDetails.municipality']}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors['beneficiaryDetails.barangay']}>
            <InputLabel>Barangay *</InputLabel>
            <Select
              value={beneficiaryDetails.barangay || ''}
              onChange={(e) => updateField('beneficiaryDetails', 'barangay', e.target.value)}
              label="Barangay *"
            >
              {barangays.map((barangay) => (
                <MenuItem key={barangay.id} value={barangay.name}>
                  {barangay.name}
                </MenuItem>
              ))}
            </Select>
            {errors['beneficiaryDetails.barangay'] && (
              <FormHelperText>{errors['beneficiaryDetails.barangay']}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>

      {/* Contact Information */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Contact Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Contact Number *"
            value={beneficiaryDetails.contact_number || ''}
            onChange={(e) => updateField('beneficiaryDetails', 'contact_number', e.target.value)}
            error={!!errors['beneficiaryDetails.contact_number']}
            helperText={errors['beneficiaryDetails.contact_number'] || ''}
            placeholder="Enter your contact number"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Emergency Contact Number"
            value={beneficiaryDetails.emergency_contact_number || ''}
            onChange={(e) => updateField('beneficiaryDetails', 'emergency_contact_number', e.target.value)}
            error={!!errors['beneficiaryDetails.emergency_contact_number']}
            helperText={errors['beneficiaryDetails.emergency_contact_number'] || ''}
            placeholder="Enter emergency contact number"
          />
        </Grid>
      </Grid>

      {/* Personal Details */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Personal Details
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Birth Date *"
            type="date"
            value={beneficiaryDetails.birth_date || ''}
            onChange={(e) => updateField('beneficiaryDetails', 'birth_date', e.target.value)}
            error={!!errors['beneficiaryDetails.birth_date']}
            helperText={errors['beneficiaryDetails.birth_date'] || ''}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Place of Birth"
            value={beneficiaryDetails.place_of_birth || ''}
            onChange={(e) => updateField('beneficiaryDetails', 'place_of_birth', e.target.value)}
            error={!!errors['beneficiaryDetails.place_of_birth']}
            helperText={errors['beneficiaryDetails.place_of_birth'] || ''}
            placeholder="Enter place of birth"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors['beneficiaryDetails.sex']}>
            <InputLabel>Sex *</InputLabel>
            <Select
              value={beneficiaryDetails.sex || ''}
              onChange={(e) => updateField('beneficiaryDetails', 'sex', e.target.value)}
              label="Sex *"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            {errors['beneficiaryDetails.sex'] && (
              <FormHelperText>{errors['beneficiaryDetails.sex']}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors['beneficiaryDetails.civil_status']}>
            <InputLabel>Civil Status *</InputLabel>
            <Select
              value={beneficiaryDetails.civil_status || ''}
              onChange={(e) => updateField('beneficiaryDetails', 'civil_status', e.target.value)}
              label="Civil Status *"
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="widowed">Widowed</MenuItem>
              <MenuItem value="separated">Separated</MenuItem>
              <MenuItem value="divorced">Divorced</MenuItem>
            </Select>
            {errors['beneficiaryDetails.civil_status'] && (
              <FormHelperText>{errors['beneficiaryDetails.civil_status']}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Name of Spouse"
            value={beneficiaryDetails.name_of_spouse || ''}
            onChange={(e) => updateField('beneficiaryDetails', 'name_of_spouse', e.target.value)}
            error={!!errors['beneficiaryDetails.name_of_spouse']}
            helperText={errors['beneficiaryDetails.name_of_spouse'] || ''}
            placeholder="Enter spouse name (if applicable)"
            disabled={beneficiaryDetails.civil_status !== 'married'}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors['beneficiaryDetails.highest_education']}>
            <InputLabel>Highest Education</InputLabel>
            <Select
              value={beneficiaryDetails.highest_education || ''}
              onChange={(e) => updateField('beneficiaryDetails', 'highest_education', e.target.value)}
              label="Highest Education"
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Pre-school">Pre-school</MenuItem>
              <MenuItem value="Elementary">Elementary</MenuItem>
              <MenuItem value="Junior High School">Junior High School</MenuItem>
              <MenuItem value="Senior High School">Senior High School</MenuItem>
              <MenuItem value="Vocational">Vocational</MenuItem>
              <MenuItem value="College">College</MenuItem>
              <MenuItem value="Post Graduate">Post Graduate</MenuItem>
            </Select>
            {errors['beneficiaryDetails.highest_education'] && (
              <FormHelperText>{errors['beneficiaryDetails.highest_education']}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>

      {/* Additional Information */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Additional Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Religion"
            value={beneficiaryDetails.religion || ''}
            onChange={(e) => updateField('beneficiaryDetails', 'religion', e.target.value)}
            error={!!errors['beneficiaryDetails.religion']}
            helperText={errors['beneficiaryDetails.religion'] || ''}
            placeholder="Enter your religion"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Mother's Maiden Name"
            value={beneficiaryDetails.mothers_maiden_name || ''}
            onChange={(e) => updateField('beneficiaryDetails', 'mothers_maiden_name', e.target.value)}
            error={!!errors['beneficiaryDetails.mothers_maiden_name']}
            helperText={errors['beneficiaryDetails.mothers_maiden_name'] || ''}
            placeholder="Enter mother's maiden name"
          />
        </Grid>
      </Grid>

      {/* Help Text */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Note:</strong> Fields marked with * are required. If you have existing profile data, 
          it has been pre-filled for your convenience. You can edit any field as needed for your RSBSA application.
        </Typography>
      </Box>
    </Box>
  );
};

export default PersonalInfoSection;