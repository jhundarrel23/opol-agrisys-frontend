/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Chip,
  Avatar,
  LinearProgress,
  Alert,
  Button,
  Stack,
  Paper
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Badge as BadgeIcon,
  Assignment as AssignmentIcon,
  Verified as VerifiedIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StatusCard = styled(Paper)(({ theme, status }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  border: `2px solid ${
    status === 'verified' ? theme.palette.success.main :
    status === 'verifying' ? theme.palette.warning.main :
    status === 'rejected' ? theme.palette.error.main :
    theme.palette.grey[300]
  }`,
  backgroundColor: 
    status === 'verified' ? theme.palette.success.light :
    status === 'verifying' ? theme.palette.warning.light :
    status === 'rejected' ? theme.palette.error.light :
    theme.palette.grey[50]
}));

const StatusIcon = styled(Avatar)(({ theme, status }) => ({
  backgroundColor: 
    status === 'verified' ? theme.palette.success.main :
    status === 'verifying' ? theme.palette.warning.main :
    status === 'rejected' ? theme.palette.error.main :
    theme.palette.grey[400],
  width: 60,
  height: 60
}));

function RSBSAStatus() {
  // This would typically come from your state management or API
  const rsbsaData = {
    status: 'verifying', // pending, verifying, verified, rejected
    reference_code: 'RSBSA-2024-001234',
    system_generated_number: 'SYS-2024-001234-MOR',
    manual_number: '',
    submitted_at: '2024-01-15T10:30:00Z',
    verified_at: null,
    rejection_reason: null,
    completion_percentage: 85,
    verification_notes: 'Profile under review by regional office',
    next_steps: [
      'Complete farm parcel documentation',
      'Provide additional livelihood details',
      'Submit required documents to local DA office'
    ]
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case 'verified':
        return {
          icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
          label: 'Verified',
          color: 'success',
          description: 'Your RSBSA registration has been verified and approved'
        };
      case 'verifying':
        return {
          icon: <PendingIcon sx={{ fontSize: 40 }} />,
          label: 'Under Verification',
          color: 'warning',
          description: 'Your application is currently being reviewed'
        };
      case 'rejected':
        return {
          icon: <ErrorIcon sx={{ fontSize: 40 }} />,
          label: 'Requires Attention',
          color: 'error',
          description: 'Additional information needed for verification'
        };
      default:
        return {
          icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
          label: 'Pending Submission',
          color: 'default',
          description: 'Complete your profile to submit for verification'
        };
    }
  };

  const statusDetails = getStatusDetails(rsbsaData.status);
  const submittedDate = new Date(rsbsaData.submitted_at).toLocaleDateString();

  return (
    <Card>
      <CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <BadgeIcon />
          </Avatar>
        }
        title="RSBSA Registration Status" 
        subheader="Track your Registry System for Basic Sectors in Agriculture status"
      />
      <Divider />
      
      <CardContent>
        {/* Main Status Display */}
        <StatusCard status={rsbsaData.status} sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <StatusIcon status={rsbsaData.status}>
                {statusDetails.icon}
              </StatusIcon>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {statusDetails.label}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {statusDetails.description}
              </Typography>
              <Chip 
                label={`Reference: ${rsbsaData.reference_code}`}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </StatusCard>

        {/* RSBSA Numbers Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                System Generated Number
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {rsbsaData.system_generated_number || 'Not yet assigned'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Manual RSBSA Number
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {rsbsaData.manual_number || 'None provided'}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Progress Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Profile Completion
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {rsbsaData.completion_percentage}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={rsbsaData.completion_percentage}
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4
              }
            }}
          />
        </Box>

        {/* Timeline/Status Info */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AssignmentIcon color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Submitted
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {submittedDate}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          {rsbsaData.verified_at && (
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <VerifiedIcon color="success" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Verified
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {new Date(rsbsaData.verified_at).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          )}
        </Grid>

        {/* Verification Notes */}
        {rsbsaData.verification_notes && (
          <Alert 
            severity={rsbsaData.status === 'rejected' ? 'error' : 'info'} 
            sx={{ mb: 3 }}
          >
            <Typography variant="subtitle2" gutterBottom>
              {rsbsaData.status === 'rejected' ? 'Action Required' : 'Status Update'}
            </Typography>
            {rsbsaData.verification_notes}
          </Alert>
        )}

        {/* Next Steps */}
        {rsbsaData.next_steps && rsbsaData.next_steps.length > 0 && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Next Steps
            </Typography>
            <Stack spacing={1}>
              {rsbsaData.next_steps.map((step, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      mr: 2 
                    }} 
                  />
                  <Typography variant="body2">{step}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Action Button */}
        {rsbsaData.status !== 'verified' && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              startIcon={<AssignmentIcon />}
            >
              {rsbsaData.status === 'pending' ? 'Complete Profile' : 'Update Information'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default RSBSAStatus;