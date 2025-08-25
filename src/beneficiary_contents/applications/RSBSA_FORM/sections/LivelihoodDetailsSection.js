import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  Alert,
  Chip,
  Paper
} from '@mui/material';
import {
  Work as WorkIcon,
  Agriculture as AgricultureIcon,
  Waves as WavesIcon,
  Engineering as EngineeringIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const LivelihoodDetailsSection = ({
  livelihoodDetails,
  updateLivelihoodDetails
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFieldChange = (category, field, value) => {
    updateLivelihoodDetails(category, field, value);
  };

  const TabPanel = ({ children, value, index }) => (
    <div 
      role="tabpanel"
      hidden={value !== index}
      id={`livelihood-tabpanel-${index}`}
      aria-labelledby={`livelihood-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, minHeight: '400px' }}>
          {children}
        </Box>
      )}
    </div>
  );

  const getTabIcon = (index) => {
    const icons = [<AgricultureIcon />, <WavesIcon />, <EngineeringIcon />, <SchoolIcon />];
    return icons[index] || <WorkIcon />;
  };

  const getTabLabel = (index) => {
    const labels = ['Farmer', 'Fisherfolk', 'Farmworker', 'Agri-Youth'];
    return labels[index] || 'Unknown';
  };

  return (
    <Box>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <WorkIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
            Livelihood Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Provide specific details about your agricultural activities and involvement
          </Typography>
        </Box>
      </Box>

      {/* Information Alert */}
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        <Typography variant="body2">
          Complete the sections that apply to your primary livelihood category. You can fill multiple sections if you're involved in various agricultural activities.
        </Typography>
      </Alert>

      {/* Main Card with Tabs */}
      <Card variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="livelihood details tabs"
            sx={{
              '& .MuiTab-root': {
                minHeight: 72,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 'medium',
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  borderBottom: '2px solid',
                  borderColor: 'primary.main'
                }
              },
              '& .MuiTabs-indicator': {
                display: 'none'
              }
            }}
          >
            <Tab
              icon={<AgricultureIcon />}
              label="Farmer Details"
              iconPosition="start"
              id="livelihood-tab-0"
              aria-controls="livelihood-tabpanel-0"
            />
            <Tab
              icon={<WavesIcon />}
              label="Fisherfolk Details"
              iconPosition="start"
              id="livelihood-tab-1"
              aria-controls="livelihood-tabpanel-1"
            />
            <Tab
              icon={<EngineeringIcon />}
              label="Farmworker Details"
              iconPosition="start"
              id="livelihood-tab-2"
              aria-controls="livelihood-tabpanel-2"
            />
            <Tab
              icon={<SchoolIcon />}
              label="Agri-Youth Details"
              iconPosition="start"
              id="livelihood-tab-3"
              aria-controls="livelihood-tabpanel-3"
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ position: 'relative' }}>
          {/* Farmer Details Tab */}
          <TabPanel value={currentTab} index={0}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AgricultureIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Farming Activities
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {/* Crop Production */}
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="medium" color="primary">
                      Crop Production
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.farmer?.is_rice || false}
                        onChange={(e) => handleFieldChange('farmer', 'is_rice', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Rice Production" 
                          size="small" 
                          color={livelihoodDetails.farmer?.is_rice ? "success" : "default"}
                          variant={livelihoodDetails.farmer?.is_rice ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.farmer?.is_corn || false}
                        onChange={(e) => handleFieldChange('farmer', 'is_corn', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Corn Production" 
                          size="small" 
                          color={livelihoodDetails.farmer?.is_corn ? "success" : "default"}
                          variant={livelihoodDetails.farmer?.is_corn ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.farmer?.is_other_crops || false}
                        onChange={(e) => handleFieldChange('farmer', 'is_other_crops', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Other Crops" 
                          size="small" 
                          color={livelihoodDetails.farmer?.is_other_crops ? "success" : "default"}
                          variant={livelihoodDetails.farmer?.is_other_crops ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                {livelihoodDetails.farmer?.is_other_crops && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Other Crops Description"
                      multiline
                      rows={3}
                      value={livelihoodDetails.farmer?.other_crops_description || ''}
                      onChange={(e) => handleFieldChange('farmer', 'other_crops_description', e.target.value)}
                      placeholder="Specify other crops you produce (e.g., vegetables, fruits, root crops)"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                )}

                {/* Livestock and Poultry */}
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2, mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="medium" color="primary">
                      Livestock and Poultry
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.farmer?.is_livestock || false}
                        onChange={(e) => handleFieldChange('farmer', 'is_livestock', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Livestock Raising" 
                          size="small" 
                          color={livelihoodDetails.farmer?.is_livestock ? "success" : "default"}
                          variant={livelihoodDetails.farmer?.is_livestock ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.farmer?.is_poultry || false}
                        onChange={(e) => handleFieldChange('farmer', 'is_poultry', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Poultry Raising" 
                          size="small" 
                          color={livelihoodDetails.farmer?.is_poultry ? "success" : "default"}
                          variant={livelihoodDetails.farmer?.is_poultry ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                {livelihoodDetails.farmer?.is_livestock && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Livestock Description"
                      multiline
                      rows={3}
                      value={livelihoodDetails.farmer?.livestock_description || ''}
                      onChange={(e) => handleFieldChange('farmer', 'livestock_description', e.target.value)}
                      placeholder="Specify types of livestock you raise (e.g., cattle, swine, goats, sheep)"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                )}

                {livelihoodDetails.farmer?.is_poultry && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Poultry Description"
                      multiline
                      rows={3}
                      value={livelihoodDetails.farmer?.poultry_description || ''}
                      onChange={(e) => handleFieldChange('farmer', 'poultry_description', e.target.value)}
                      placeholder="Specify types of poultry you raise (e.g., chickens, ducks, turkeys)"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </TabPanel>

          {/* Fisherfolk Details Tab */}
          <TabPanel value={currentTab} index={1}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WavesIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Fishing Activities
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="medium" color="primary">
                      Fishing Methods
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.fisherfolk?.is_fish_capture || false}
                        onChange={(e) => handleFieldChange('fisherfolk', 'is_fish_capture', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Fish Capture" 
                          size="small" 
                          color={livelihoodDetails.fisherfolk?.is_fish_capture ? "success" : "default"}
                          variant={livelihoodDetails.fisherfolk?.is_fish_capture ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.fisherfolk?.is_aquaculture || false}
                        onChange={(e) => handleFieldChange('fisherfolk', 'is_aquaculture', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Aquaculture" 
                          size="small" 
                          color={livelihoodDetails.fisherfolk?.is_aquaculture ? "success" : "default"}
                          variant={livelihoodDetails.fisherfolk?.is_aquaculture ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.fisherfolk?.is_fish_processing || false}
                        onChange={(e) => handleFieldChange('fisherfolk', 'is_fish_processing', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Fish Processing" 
                          size="small" 
                          color={livelihoodDetails.fisherfolk?.is_fish_processing ? "success" : "default"}
                          variant={livelihoodDetails.fisherfolk?.is_fish_processing ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Other Fishing Activities"
                    multiline
                    rows={3}
                    value={livelihoodDetails.fisherfolk?.other_fishing_description || ''}
                    onChange={(e) => handleFieldChange('fisherfolk', 'other_fishing_description', e.target.value)}
                    placeholder="Describe any other fishing-related activities you're involved in"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Farmworker Details Tab */}
          <TabPanel value={currentTab} index={2}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EngineeringIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Farm Work Activities
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="medium" color="primary">
                      Work Categories
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.farmworker?.is_land_preparation || false}
                        onChange={(e) => handleFieldChange('farmworker', 'is_land_preparation', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Land Preparation" 
                          size="small" 
                          color={livelihoodDetails.farmworker?.is_land_preparation ? "success" : "default"}
                          variant={livelihoodDetails.farmworker?.is_land_preparation ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.farmworker?.is_cultivation || false}
                        onChange={(e) => handleFieldChange('farmworker', 'is_cultivation', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Cultivation" 
                          size="small" 
                          color={livelihoodDetails.farmworker?.is_cultivation ? "success" : "default"}
                          variant={livelihoodDetails.farmworker?.is_cultivation ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.farmworker?.is_harvesting || false}
                        onChange={(e) => handleFieldChange('farmworker', 'is_harvesting', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Harvesting" 
                          size="small" 
                          color={livelihoodDetails.farmworker?.is_harvesting ? "success" : "default"}
                          variant={livelihoodDetails.farmworker?.is_harvesting ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Other Work Description"
                    multiline
                    rows={3}
                    value={livelihoodDetails.farmworker?.other_work_description || ''}
                    onChange={(e) => handleFieldChange('farmworker', 'other_work_description', e.target.value)}
                    placeholder="Describe any other farm work activities you perform"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Agri-Youth Details Tab */}
          <TabPanel value={currentTab} index={3}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Agricultural Youth Involvement
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="medium" color="primary">
                      Youth Category & Education
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.agriYouth?.is_agri_youth || false}
                        onChange={(e) => handleFieldChange('agriYouth', 'is_agri_youth', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Agricultural Youth" 
                          size="small" 
                          color={livelihoodDetails.agriYouth?.is_agri_youth ? "success" : "default"}
                          variant={livelihoodDetails.agriYouth?.is_agri_youth ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.agriYouth?.is_part_of_farming_household || false}
                        onChange={(e) => handleFieldChange('agriYouth', 'is_part_of_farming_household', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Farming Household Member" 
                          size="small" 
                          color={livelihoodDetails.agriYouth?.is_part_of_farming_household ? "success" : "default"}
                          variant={livelihoodDetails.agriYouth?.is_part_of_farming_household ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.agriYouth?.is_formal_agri_course || false}
                        onChange={(e) => handleFieldChange('agriYouth', 'is_formal_agri_course', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Formal Agricultural Course" 
                          size="small" 
                          color={livelihoodDetails.agriYouth?.is_formal_agri_course ? "success" : "default"}
                          variant={livelihoodDetails.agriYouth?.is_formal_agri_course ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.agriYouth?.is_nonformal_agri_course || false}
                        onChange={(e) => handleFieldChange('agriYouth', 'is_nonformal_agri_course', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Non-Formal Agricultural Course" 
                          size="small" 
                          color={livelihoodDetails.agriYouth?.is_nonformal_agri_course ? "success" : "default"}
                          variant={livelihoodDetails.agriYouth?.is_nonformal_agri_course ? "filled" : "outlined"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.agriYouth?.is_agri_program_participant || false}
                        onChange={(e) => handleFieldChange('agriYouth', 'is_agri_program_participant', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label="Agricultural Program Participant" 
                          size="small" 
                          color={livelihoodDetails.agriYouth?.is_agri_program_participant ? "success" : "default"}
                          variant={livelihoodDetails.agriYouth?.is_agri_program_participant ? "filled" : "default"}
                        />
                      </Box>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Other Involvement Description"
                    multiline
                    rows={3}
                    value={livelihoodDetails.agriYouth?.other_involvement_description || ''}
                    onChange={(e) => handleFieldChange('agriYouth', 'other_involvement_description', e.target.value)}
                    placeholder="Describe any other agricultural youth involvement or activities"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </Card>
    </Box>
  );
};

export default LivelihoodDetailsSection;