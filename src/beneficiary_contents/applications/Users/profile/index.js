import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Import the BeneficiaryPersonalDetails component
import BeneficiaryPersonalDetails from './BeneficiaryPersonalDetails';

// Styled components for better UI
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-2px)'
  }
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2, 2, 0, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.common.white}`,
  boxShadow: theme.shadows[4],
  margin: '0 auto',
  marginBottom: theme.spacing(2)
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  minHeight: 64,
  '&.Mui-selected': {
    color: theme.palette.primary.main
  }
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}));

function BeneficiaryProfile() {
  const [currentTab, setCurrentTab] = React.useState(0);

  // Mock user data - in real app, get from auth context or API
  const user = {
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@example.com',
    role: 'Beneficiary',
    status: 'Active',
    avatar: '/static/images/avatars/1.jpg',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20'
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index} style={{ paddingTop: '24px' }}>
      {value === index && children}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Profile - RSBSA Beneficiary</title>
        <meta 
          name="description" 
          content="Manage your RSBSA beneficiary profile and personal information" 
        />
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header */}
        <StyledPaper elevation={0}>
          <ProfileHeader>
            <StyledAvatar src={user.avatar} alt={user.name}>
              <PersonIcon sx={{ fontSize: 60 }} />
            </StyledAvatar>
            
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
              {user.name}
            </Typography>
            
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
              RSBSA Beneficiary
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip 
                label={user.role} 
                color="primary" 
                variant="filled"
                icon={<PersonIcon />}
              />
              <Chip 
                label={user.status} 
                color="success" 
                variant="filled"
              />
              <Chip 
                label="RSBSA Ready" 
                color="info" 
                variant="filled"
              />
            </Box>
          </ProfileHeader>

          {/* Profile Stats */}
          <Box sx={{ p: 3, backgroundColor: 'background.paper' }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    85%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Profile Complete
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Applications
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Benefits Received
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" fontWeight="bold">
                    2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending Reviews
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </StyledPaper>

        {/* Quick Info Cards */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <ProfileCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Account Information
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Email:</strong>
                    </Typography>
                    <Typography variant="body1" noWrap>
                      {user.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Member Since:</strong>
                    </Typography>
                    <Typography variant="body1">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Last Login:</strong>
                    </Typography>
                    <Typography variant="body1">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Status:</strong>
                    </Typography>
                    <Chip 
                      label={user.status} 
                      color="success" 
                      size="small"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </ProfileCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <ProfileCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Security & Privacy
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    Your personal information is securely stored and only accessible to authorized personnel.
                  </Typography>
                </Alert>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="2FA Enabled" color="success" size="small" />
                  <Chip label="Last Password Change: 30 days ago" color="info" size="small" />
                  <Chip label="Account Verified" color="success" size="small" />
                </Box>
              </CardContent>
            </ProfileCard>
          </Grid>
        </Grid>

        {/* Main Content Tabs */}
        <StyledPaper sx={{ mt: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange} 
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                }
              }}
            >
              <StyledTab 
                icon={<PersonIcon />} 
                label="Personal Details" 
                iconPosition="start"
              />
              <StyledTab 
                icon={<HistoryIcon />} 
                label="Application History" 
                iconPosition="start"
              />
              <StyledTab 
                icon={<SettingsIcon />} 
                label="Account Settings" 
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: 3 }}>
            <TabPanel value={currentTab} index={0}>
              <BeneficiaryPersonalDetails />
            </TabPanel>
            
            <TabPanel value={currentTab} index={1}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <HistoryIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  Application History
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Track your RSBSA applications and their current status.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Coming soon...
                </Typography>
              </Box>
            </TabPanel>
            
            <TabPanel value={currentTab} index={2}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <SettingsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  Account Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your account preferences and security settings.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Coming soon...
                </Typography>
              </Box>
            </TabPanel>
          </Box>
        </StyledPaper>
      </Container>
    </>
  );
}

export default BeneficiaryProfile;
