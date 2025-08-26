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
  Alert
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
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

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
      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden"
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              minHeight: 70,
              "& .MuiTab-root": {
                minHeight: 70,
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "text.secondary",
                padding: "12px 8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "primary.main"
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.2rem",
                  marginRight: "6px"
                }
              },
              "& .MuiTab-root.Mui-selected": {
                color: "white !important",
                fontWeight: "bold",
                backgroundColor: "primary.main",
                borderRadius: "8px 8px 0 0",
                "&:hover": {
                  backgroundColor: "primary.dark"
                }
              },
              "& .MuiTabs-indicator": {
                display: "none"
              }
            }}
                      >
              <Tab icon={<AgricultureIcon />} label="Farmer" iconPosition="start" />
              <Tab icon={<WavesIcon />} label="Fisherfolk" iconPosition="start" />
              <Tab icon={<EngineeringIcon />} label="Farmworker" iconPosition="start" />
              <Tab icon={<SchoolIcon />} label="Agri-Youth" iconPosition="start" />
            </Tabs>

          {/* Farmer Details Tab */}
          <TabPanel value={currentTab} index={0}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Farming Activities
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2} alignItems="center">
                {/* Crop Production */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Crop Production
                  </Typography>
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
                    label="Rice Production"
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
                    label="Corn Production"
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
                    label="Other Crops"
                  />
                </Grid>

                {livelihoodDetails.farmer?.is_other_crops && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Other Crops Description"
                      multiline
                      rows={2}
                      value={livelihoodDetails.farmer?.other_crops_description || ''}
                      onChange={(e) => handleFieldChange('farmer', 'other_crops_description', e.target.value)}
                      placeholder="Specify other crops you produce (e.g., vegetables, fruits, root crops)"
                    />
                  </Grid>
                )}

                {/* Livestock and Poultry */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium" sx={{ mt: 2 }}>
                    Livestock and Poultry
                  </Typography>
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
                    label="Livestock Raising"
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
                    label="Poultry Raising"
                  />
                </Grid>

                {livelihoodDetails.farmer?.is_livestock && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Livestock Description"
                      multiline
                      rows={2}
                      value={livelihoodDetails.farmer?.livestock_description || ''}
                      onChange={(e) => handleFieldChange('farmer', 'livestock_description', e.target.value)}
                      placeholder="Specify livestock types (e.g., cattle, carabao, goats, swine)"
                    />
                  </Grid>
                )}

                {livelihoodDetails.farmer?.is_poultry && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Poultry Description"
                      multiline
                      rows={2}
                      value={livelihoodDetails.farmer?.poultry_description || ''}
                      onChange={(e) => handleFieldChange('farmer', 'poultry_description', e.target.value)}
                      placeholder="Specify poultry types (e.g., chickens, ducks, geese, turkeys)"
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </TabPanel>

          {/* Fisherfolk Details Tab */}
          <TabPanel value={currentTab} index={1}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Fishing Activities
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.fisherfolk?.is_fish_capture || false}
                        onChange={(e) => handleFieldChange('fisherfolk', 'is_fish_capture', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Fish Capture"
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
                    label="Aquaculture"
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
                    label="Fish Processing"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Other Fishing Activities Description"
                    multiline
                    rows={3}
                    value={livelihoodDetails.fisherfolk?.other_fishing_description || ''}
                    onChange={(e) => handleFieldChange('fisherfolk', 'other_fishing_description', e.target.value)}
                    placeholder="Describe other fishing-related activities or specify details about your fishing operations"
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Farmworker Details Tab */}
          <TabPanel value={currentTab} index={2}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Farm Work Activities
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.farmworker?.is_land_preparation || false}
                        onChange={(e) => handleFieldChange('farmworker', 'is_land_preparation', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Land Preparation"
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
                    label="Cultivation"
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
                    label="Harvesting"
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
                    placeholder="Describe other farm work activities you perform (e.g., irrigation, pest control, farm maintenance)"
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Agri-Youth Details Tab */}
          <TabPanel value={currentTab} index={3}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Agricultural Youth Involvement
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.agriYouth?.is_agri_youth || false}
                        onChange={(e) => handleFieldChange('agriYouth', 'is_agri_youth', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Agricultural Youth (15-30 years old)"
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
                    label="Part of Farming Household"
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
                    label="Formal Agricultural Course"
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
                    label="Non-formal Agricultural Course"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={livelihoodDetails.agriYouth?.is_agri_program_participant || false}
                        onChange={(e) => handleFieldChange('agriYouth', 'is_agri_program_participant', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Agricultural Program Participant"
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
                    placeholder="Describe other agricultural involvement, programs participated in, or future plans in agriculture"
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card variant="outlined" sx={{ mt: 3, borderRadius: 2, backgroundColor: 'background.default' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            Section Guidelines
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Multiple Activities:</strong> You can select multiple activities within each category if applicable to your situation.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Detailed Descriptions:</strong> Provide specific details in description fields to help with program matching.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LivelihoodDetailsSection;