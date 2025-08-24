import React, { useState, useEffect } from 'react';
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
  Alert
} from '@mui/material';

const BeneficiaryPersonalDetails = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    contact_number: '',
    email: '',
    birth_date: '',
    civil_status: '',
    barangay: '',
    municipality: 'Opol',
    province: 'Misamis Oriental',
    region: 'Region X'
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const barangayOptions = [
    'Barra', 'Bonbon', 'Cauyunan', 'Luyongbonbon', 'Malagana', 'Poblacion', 'Taboc', 'Tingalan'
  ];

  const civilStatusOptions = [
    'Single', 'Married', 'Widowed', 'Divorced', 'Separated'
  ];

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Simple save logic
    setShowSuccess(true);
    setIsEditing(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Personal Details
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Personal details saved successfully!
        </Alert>
      )}

      <Box sx={{ mb: 2, textAlign: 'right' }}>
        {!isEditing ? (
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        )}
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.first_name}
                onChange={(e) => handleFieldChange('first_name', e.target.value)}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.last_name}
                onChange={(e) => handleFieldChange('last_name', e.target.value)}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Middle Name"
                value={formData.middle_name}
                onChange={(e) => handleFieldChange('middle_name', e.target.value)}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                value={formData.contact_number}
                onChange={(e) => handleFieldChange('contact_number', e.target.value)}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Birth Date"
                type="date"
                value={formData.birth_date}
                onChange={(e) => handleFieldChange('birth_date', e.target.value)}
                disabled={!isEditing}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!isEditing}>
                <InputLabel>Civil Status</InputLabel>
                <Select
                  value={formData.civil_status}
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
                <InputLabel>Barangay</InputLabel>
                <Select
                  value={formData.barangay}
                  onChange={(e) => handleFieldChange('barangay', e.target.value)}
                  label="Barangay"
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
              <TextField
                fullWidth
                label="Municipality"
                value={formData.municipality}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Province"
                value={formData.province}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Region"
                value={formData.region}
                disabled
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BeneficiaryPersonalDetails;