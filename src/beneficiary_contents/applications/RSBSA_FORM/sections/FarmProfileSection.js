import React, { useState, useEffect } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  FormHelperText,
  Chip,
  Alert,
  CircularProgress,
  TextField,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from '@mui/material';
import { 
  Agriculture as AgricultureIcon,
  Work as WorkIcon,
  Waves as WavesIcon,
  Engineering as EngineeringIcon,
  School as SchoolIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

const FarmProfileSection = ({ 
  formData, 
  errors, 
  updateField,
  // Livelihood details data
  farmerDetails,
  fisherfolkDetails,
  farmworkerDetails,
  agriYouthDetails,
  updateLivelihoodDetails
}) => {
  const [livelihoodCategories, setLivelihoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  // Mock livelihood categories based on database structure
  useEffect(() => {
    const fetchLivelihoodCategories = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on typical RSBSA livelihood categories
        const categories = [
          {
            id: 1,
            livelihood_category_name: 'Rice Farmer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            livelihood_category_name: 'Corn Farmer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 3,
            livelihood_category_name: 'Vegetable Farmer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 4,
            livelihood_category_name: 'Fruit Farmer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 5,
            livelihood_category_name: 'Livestock Raiser',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 6,
            livelihood_category_name: 'Poultry Raiser',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 7,
            livelihood_category_name: 'Fisherfolk',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 8,
            livelihood_category_name: 'Aquaculture',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 9,
            livelihood_category_name: 'Agricultural Worker/Farmworker',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 10,
            livelihood_category_name: 'Agri-Youth',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 11,
            livelihood_category_name: 'Coconut Farmer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 12,
            livelihood_category_name: 'Sugarcane Farmer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 13,
            livelihood_category_name: 'Coffee Farmer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 14,
            livelihood_category_name: 'Cacao Farmer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 15,
            livelihood_category_name: 'Mixed Farming',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
        
        setLivelihoodCategories(categories);
      } catch (error) {
        console.error('Error fetching livelihood categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivelihoodCategories();
  }, []);

  const handleFieldChange = (field, value) => {
    updateField(field, value);
  };

  const handleLivelihoodFieldChange = (category, field, value) => {
    // category should be one of: 'farmer', 'fisherfolk', 'farmworker', 'agriYouth'
    updateLivelihoodDetails(category, field, value);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const selectedCategory = livelihoodCategories.find(
    category => category.id === formData.livelihood_category_id
  );

  // Tab Panel Component
  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AgricultureIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
            Farm Profile & Livelihood Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select your primary livelihood category and provide detailed information about your agricultural activities
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Primary Livelihood Category Selection */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                Primary Livelihood Category
                <Chip label="Required" color="error" size="small" sx={{ ml: 2 }} />
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <CircularProgress />
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    Loading livelihood categories...
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors['farmProfile.livelihood_category_id']}>
                      <InputLabel>Primary Livelihood Category *</InputLabel>
                      <Select
                        value={formData.livelihood_category_id || ''}
                        onChange={(e) => handleFieldChange('livelihood_category_id', e.target.value)}
                        label="Primary Livelihood Category *"
                      >
                        {livelihoodCategories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.livelihood_category_name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors['farmProfile.livelihood_category_id'] && (
                        <FormHelperText>{errors['farmProfile.livelihood_category_id']}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {selectedCategory && (
                    <Grid item xs={12}>
                      <Alert severity="info" sx={{ borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Selected: {selectedCategory.livelihood_category_name}
                        </Typography>
                        <Typography variant="body2">
                          {getLivelihoodDescription(selectedCategory.livelihood_category_name)}
                        </Typography>
                      </Alert>
                    </Grid>
                  )}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Detailed Livelihood Activities */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <WorkIcon sx={{ mr: 1 }} />
                  Detailed Agricultural Activities
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Provide specific details about your agricultural activities. Complete the sections that apply to your livelihood.
                </Typography>
              </Box>

              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    minHeight: 72,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 'medium'
                  }
                }}
              >
                <Tab
                  icon={<AgricultureIcon />}
                  label="Farming Activities"
                  iconPosition="start"
                />
                <Tab
                  icon={<WavesIcon />}
                  label="Fishing Activities"
                  iconPosition="start"
                />
                <Tab
                  icon={<EngineeringIcon />}
                  label="Farm Work"
                  iconPosition="start"
                />
                <Tab
                  icon={<SchoolIcon />}
                  label="Agri-Youth"
                  iconPosition="start"
                />
              </Tabs>

              {/* Farming Activities Tab */}
              <TabPanel value={currentTab} index={0}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {/* Crop Production Section */}
                    <Grid item xs={12}>
                      <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h6" color="primary">Crop Production</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={farmerDetails?.is_rice || false}
                                    onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_rice', e.target.checked)}
                                    color="primary"
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="body2" fontWeight="medium">Rice Production</Typography>
                                    <Typography variant="caption" color="text.secondary">Palay cultivation</Typography>
                                  </Box>
                                }
                              />
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={farmerDetails?.is_corn || false}
                                    onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_corn', e.target.checked)}
                                    color="primary"
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="body2" fontWeight="medium">Corn Production</Typography>
                                    <Typography variant="caption" color="text.secondary">Feed and food corn</Typography>
                                  </Box>
                                }
                              />
                            </Grid>

                            <Grid item xs={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={farmerDetails?.is_other_crops || false}
                                    onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_other_crops', e.target.checked)}
                                    color="primary"
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="body2" fontWeight="medium">Other Crops</Typography>
                                    <Typography variant="caption" color="text.secondary">Vegetables, fruits, etc.</Typography>
                                  </Box>
                                }
                              />
                            </Grid>

                            {farmerDetails?.is_other_crops && (
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Other Crops Description"
                                  multiline
                                  rows={2}
                                  value={farmerDetails.other_crops_description || ''}
                                  onChange={(e) => handleLivelihoodFieldChange('farmer', 'other_crops_description', e.target.value)}
                                  placeholder="Specify other crops you produce (e.g., vegetables, fruits, root crops)"
                                  sx={{ mt: 2 }}
                                />
                              </Grid>
                            )}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>

                    {/* Livestock and Poultry Section */}
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h6" color="primary">Livestock & Poultry</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={farmerDetails?.is_livestock || false}
                                    onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_livestock', e.target.checked)}
                                    color="primary"
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="body2" fontWeight="medium">Livestock Raising</Typography>
                                    <Typography variant="caption" color="text.secondary">Cattle, carabao, goats, swine</Typography>
                                  </Box>
                                }
                              />
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={farmerDetails?.is_poultry || false}
                                    onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_poultry', e.target.checked)}
                                    color="primary"
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="body2" fontWeight="medium">Poultry Raising</Typography>
                                    <Typography variant="caption" color="text.secondary">Chickens, ducks, geese, turkeys</Typography>
                                  </Box>
                                }
                              />
                            </Grid>

                            {farmerDetails?.is_livestock && (
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  label="Livestock Description"
                                  multiline
                                  rows={2}
                                  value={farmerDetails.livestock_description || ''}
                                  onChange={(e) => handleLivelihoodFieldChange('farmer', 'livestock_description', e.target.value)}
                                  placeholder="Specify livestock types and numbers"
                                  sx={{ mt: 2 }}
                                />
                              </Grid>
                            )}

                            {farmerDetails?.is_poultry && (
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  label="Poultry Description"
                                  multiline
                                  rows={2}
                                  value={farmerDetails.poultry_description || ''}
                                  onChange={(e) => handleLivelihoodFieldChange('farmer', 'poultry_description', e.target.value)}
                                  placeholder="Specify poultry types and numbers"
                                  sx={{ mt: 2 }}
                                />
                              </Grid>
                            )}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {/* Fishing Activities Tab */}
              <TabPanel value={currentTab} index={1}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={fisherfolkDetails?.is_fish_capture || false}
                            onChange={(e) => handleLivelihoodFieldChange('fisherfolk', 'is_fish_capture', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Fish Capture</Typography>
                            <Typography variant="caption" color="text.secondary">Marine/inland fishing</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={fisherfolkDetails?.is_aquaculture || false}
                            onChange={(e) => handleLivelihoodFieldChange('fisherfolk', 'is_aquaculture', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Aquaculture</Typography>
                            <Typography variant="caption" color="text.secondary">Fish/shrimp farming</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={fisherfolkDetails?.is_fish_processing || false}
                            onChange={(e) => handleLivelihoodFieldChange('fisherfolk', 'is_fish_processing', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Fish Processing</Typography>
                            <Typography variant="caption" color="text.secondary">Drying, salting, canning</Typography>
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
                        value={fisherfolkDetails?.other_fishing_description || ''}
                        onChange={(e) => handleLivelihoodFieldChange('fisherfolk', 'other_fishing_description', e.target.value)}
                        placeholder="Describe other fishing-related activities or specify details about your fishing operations"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {/* Farm Work Tab */}
              <TabPanel value={currentTab} index={2}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={farmworkerDetails?.is_land_preparation || false}
                            onChange={(e) => handleLivelihoodFieldChange('farmworker', 'is_land_preparation', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Land Preparation</Typography>
                            <Typography variant="caption" color="text.secondary">Plowing, harrowing</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={farmworkerDetails?.is_cultivation || false}
                            onChange={(e) => handleLivelihoodFieldChange('farmworker', 'is_cultivation', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Cultivation</Typography>
                            <Typography variant="caption" color="text.secondary">Planting, weeding, care</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={farmworkerDetails?.is_harvesting || false}
                            onChange={(e) => handleLivelihoodFieldChange('farmworker', 'is_harvesting', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Harvesting</Typography>
                            <Typography variant="caption" color="text.secondary">Crop collection, post-harvest</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Other Work Activities"
                        multiline
                        rows={3}
                        value={farmworkerDetails?.other_work_description || ''}
                        onChange={(e) => handleLivelihoodFieldChange('farmworker', 'other_work_description', e.target.value)}
                        placeholder="Describe other farm work activities (e.g., irrigation, pest control, farm maintenance)"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {/* Agri-Youth Tab */}
              <TabPanel value={currentTab} index={3}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={agriYouthDetails?.is_agri_youth || false}
                            onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_agri_youth', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Agricultural Youth</Typography>
                            <Typography variant="caption" color="text.secondary">Age 15-30 years old</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={agriYouthDetails?.is_part_of_farming_household || false}
                            onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_part_of_farming_household', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Farming Household Member</Typography>
                            <Typography variant="caption" color="text.secondary">Family involved in agriculture</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={agriYouthDetails?.is_formal_agri_course || false}
                            onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_formal_agri_course', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Formal Agricultural Education</Typography>
                            <Typography variant="caption" color="text.secondary">College/university course</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={agriYouthDetails?.is_nonformal_agri_course || false}
                            onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_nonformal_agri_course', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Non-formal Agricultural Training</Typography>
                            <Typography variant="caption" color="text.secondary">Seminars, workshops</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={agriYouthDetails?.is_agri_program_participant || false}
                            onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_agri_program_participant', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">Agricultural Program Participant</Typography>
                            <Typography variant="caption" color="text.secondary">DA programs, cooperatives</Typography>
                          </Box>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Additional Agricultural Involvement"
                        multiline
                        rows={3}
                        value={agriYouthDetails?.other_involvement_description || ''}
                        onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'other_involvement_description', e.target.value)}
                        placeholder="Describe other agricultural involvement, programs, or future plans in agriculture"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>

        {/* Information Card */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              backgroundColor: 'background.default',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom color="primary">
              Important Guidelines
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Primary Category:</strong> Select the agricultural activity that provides most of your income.
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Multiple Activities:</strong> You can select multiple activities within each tab if applicable.
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Detailed Descriptions:</strong> Provide specific details to help with program matching.
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Benefits:</strong> Different categories may qualify for different DA programs and services.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Helper function to get description for each livelihood category
const getLivelihoodDescription = (categoryName) => {
  const descriptions = {
    'Rice Farmer': 'Engaged in rice production including land preparation, planting, care, and harvesting of rice crops.',
    'Corn Farmer': 'Involved in corn cultivation from planting to harvesting, including both feed and food corn varieties.',
    'Vegetable Farmer': 'Produces various vegetables for commercial or subsistence purposes including leafy greens, root crops, and fruit vegetables.',
    'Fruit Farmer': 'Cultivates fruit-bearing trees and plants such as mango, banana, citrus, and other tropical fruits.',
    'Livestock Raiser': 'Raises farm animals such as cattle, carabao, goats, sheep, and swine for meat, dairy, or draft purposes.',
    'Poultry Raiser': 'Engages in raising chickens, ducks, geese, turkeys, and other birds for eggs, meat, or breeding.',
    'Fisherfolk': 'Involved in capture fisheries using various fishing methods in marine or inland waters.',
    'Aquaculture': 'Practices fish farming, shrimp farming, or other aquatic species cultivation in controlled environments.',
    'Agricultural Worker/Farmworker': 'Provides labor services in agricultural operations including planting, harvesting, and farm maintenance.',
    'Agri-Youth': 'Young individuals (15-30 years old) engaged in agricultural activities or agribusiness ventures.',
    'Coconut Farmer': 'Cultivates coconut palms for copra, coconut oil, and other coconut-based products.',
    'Sugarcane Farmer': 'Grows sugarcane for sugar production or other industrial uses.',
    'Coffee Farmer': 'Cultivates coffee plants and processes coffee beans for local or export markets.',
    'Cacao Farmer': 'Grows cacao trees and processes cacao beans for chocolate and other cocoa products.',
    'Mixed Farming': 'Combines multiple agricultural activities such as crops, livestock, and other farm enterprises.'
  };

  return descriptions[categoryName] || 'Agricultural livelihood activity as specified in the RSBSA registration system.';
};

export default FarmProfileSection;