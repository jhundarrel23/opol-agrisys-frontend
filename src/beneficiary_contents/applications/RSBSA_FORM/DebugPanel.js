import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Button,
  Paper,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  BugReport as BugIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

const DebugPanel = ({ 
  formData, 
  errors, 
  currentStep, 
  totalSteps, 
  isLoading, 
  isSubmitting, 
  apiResponse,
  hasPreFilledData 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isVisible) {
    return (
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
        <Button
          variant="contained"
          startIcon={<BugIcon />}
          onClick={() => setIsVisible(true)}
          sx={{ 
            borderRadius: 2,
            boxShadow: 3,
            '&:hover': { transform: 'scale(1.05)' }
          }}
        >
          Debug
        </Button>
      </Box>
    );
  }

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        width: 400,
        maxHeight: '80vh',
        overflow: 'auto',
        zIndex: 1000,
        borderRadius: 2
      }}
    >
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BugIcon /> Debug Panel
          </Typography>
          <Button
            size="small"
            onClick={() => setIsVisible(false)}
            sx={{ color: 'white', minWidth: 'auto' }}
          >
            <VisibilityOffIcon />
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Form Status */}
        <Accordion 
          expanded={expandedSections.status}
          onChange={() => toggleSection('status')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Form Status</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Current Step:</Typography>
                <Chip 
                  label={`${currentStep}/${totalSteps}`} 
                  size="small" 
                  color="primary" 
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Loading:</Typography>
                <Chip 
                  label={isLoading ? 'Yes' : 'No'} 
                  size="small" 
                  color={isLoading ? 'warning' : 'default'} 
                />
              </Box>
              <Box sx={{ display: 'space-between' }}>
                <Typography variant="body2">Submitting:</Typography>
                <Chip 
                  label={isSubmitting ? 'Yes' : 'No'} 
                  size="small" 
                  color={isSubmitting ? 'error' : 'default'} 
                />
              </Box>
              <Box sx={{ display: 'space-between' }}>
                <Typography variant="body2">Pre-filled Data:</Typography>
                <Chip 
                  label={hasPreFilledData ? 'Yes' : 'No'} 
                  size="small" 
                  color={hasPreFilledData ? 'success' : 'default'} 
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Validation Errors */}
        <Accordion 
          expanded={expandedSections.errors}
          onChange={() => toggleSection('errors')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">
              Validation Errors 
              {Object.keys(errors).length > 0 && (
                <Chip 
                  label={Object.keys(errors).length} 
                  size="small" 
                  color="error" 
                  sx={{ ml: 1 }} 
                />
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(errors).length === 0 ? (
              <Typography variant="body2" color="success.main">
                ✅ No validation errors
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Object.entries(errors).map(([field, error]) => (
                  <Box key={field} sx={{ p: 1, bgcolor: 'error.light', borderRadius: 1 }}>
                    <Typography variant="body2" color="error.dark" fontWeight="bold">
                      {field}:
                    </Typography>
                    <Typography variant="body2" color="error.dark">
                      {Array.isArray(error) ? error[0] : error}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>

        {/* API Response */}
        <Accordion 
          expanded={expandedSections.apiResponse}
          onChange={() => toggleSection('apiResponse')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">
              API Response
              {apiResponse && (
                <Chip 
                  label={apiResponse.success ? 'Success' : 'Error'} 
                  size="small" 
                  color={apiResponse.success ? 'success' : 'error'} 
                  sx={{ ml: 1 }} 
                />
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {!apiResponse ? (
              <Typography variant="body2" color="text.secondary">
                No API response yet
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Status:</Typography>
                  <Chip 
                    label={apiResponse.success ? 'Success' : 'Error'} 
                    size="small" 
                    color={apiResponse.success ? 'success' : 'error'} 
                  />
                </Box>
                {apiResponse.message && (
                  <Typography variant="body2">
                    <strong>Message:</strong> {apiResponse.message}
                  </Typography>
                )}
                {apiResponse.error && (
                  <Typography variant="body2" color="error.main">
                    <strong>Error:</strong> {apiResponse.error}
                  </Typography>
                )}
                {apiResponse.details && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      Details:
                    </Typography>
                    <Box 
                      component="pre" 
                      sx={{ 
                        fontSize: '0.75rem', 
                        bgcolor: 'grey.100', 
                        p: 1, 
                        borderRadius: 1,
                        overflow: 'auto',
                        maxHeight: 100
                      }}
                    >
                      {JSON.stringify(apiResponse.details, null, 2)}
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Form Data */}
        <Accordion 
          expanded={expandedSections.formData}
          onChange={() => toggleSection('formData')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Form Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box 
              component="pre" 
              sx={{ 
                fontSize: '0.75rem', 
                bgcolor: 'grey.100', 
                p: 1, 
                borderRadius: 1,
                overflow: 'auto',
                maxHeight: 200
              }}
            >
              {JSON.stringify(formData, null, 2)}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 2 }} />

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => console.log('Form Data:', formData)}
            fullWidth
          >
            Log to Console
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => console.log('Errors:', errors)}
            fullWidth
          >
            Log Errors
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DebugPanel;