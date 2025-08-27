import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
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
  FormControlLabel,
  Switch,
  Tabs,
  Tab
} from '@mui/material';
import {
  Agriculture as AgricultureIcon,
  Work as WorkIcon,
  Waves as WavesIcon,
  Engineering as EngineeringIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { rsbsaService } from '../../../../api/rsbsaService';

// ✅ Fallback categories (constant outside to keep code clean)
const FALLBACK_CATEGORIES = [
  { id: 1, livelihood_category_name: 'Rice Farmer', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, livelihood_category_name: 'Corn Farmer', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, livelihood_category_name: 'Vegetable Farmer', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 4, livelihood_category_name: 'Fruit Farmer', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 5, livelihood_category_name: 'Livestock Raiser', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 6, livelihood_category_name: 'Poultry Raiser', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 7, livelihood_category_name: 'Fisherfolk', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 8, livelihood_category_name: 'Aquaculture', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 9, livelihood_category_name: 'Agricultural Worker/Farmworker', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 10, livelihood_category_name: 'Agri-Youth', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 11, livelihood_category_name: 'Coconut Farmer', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 12, livelihood_category_name: 'Sugarcane Farmer', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 13, livelihood_category_name: 'Coffee Farmer', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 14, livelihood_category_name: 'Cacao Farmer', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 15, livelihood_category_name: 'Mixed Farming', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

const FarmProfileSection = ({ formData, errors, updateField, livelihoodDetails, updateLivelihoodDetails }) => {
  const [livelihoodCategories, setLivelihoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  // ✅ Fetch livelihood categories from API
  useEffect(() => {
    const fetchLivelihoodCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching livelihood categories...');
        const categories = await rsbsaService.getLivelihoodCategories();
        console.log('Livelihood categories fetched:', categories);
        setLivelihoodCategories(categories);
      } catch (error) {
        console.error('Error fetching livelihood categories:', error);
        setError(error.message);

        // ✅ Use fallback if API fails
        setLivelihoodCategories(FALLBACK_CATEGORIES);
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
    if (typeof updateLivelihoodDetails === 'function') {
      updateLivelihoodDetails(category, field, value);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  const selectedCategory = livelihoodCategories.find(
    category => category.id === formData.livelihood_category_id
  );

  return (
    <Box>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AgricultureIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
            Farm Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select your primary agricultural livelihood activity
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Farm Profile Card */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                Livelihood Category
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
              ) : error ? (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    Using fallback data due to connection issues. Some features may be limited.
                  </Typography>
                </Alert>
              ) : null}

              {!loading && (
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

        {/* Information Card */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2, backgroundColor: 'background.default' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Important Notes
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Primary Livelihood:</strong> Select the agricultural activity that provides most of your income.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Multiple Activities:</strong> You can specify additional activities in the next sections.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category Benefits:</strong> Different categories may qualify for different DA programs.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Livelihood Details (moved here from separate section) */}
        <Grid item xs={12}>
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WorkIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1.5 }} />
              <Typography variant="h5" component="h3" fontWeight="bold" color="primary">
                Livelihood Details
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
              <Typography variant="body2">
                Complete the sections that apply to your livelihood category. You can fill multiple sections if involved in various activities.
              </Typography>
            </Alert>

            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 0 }}>
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
                  <Tab icon={<AgricultureIcon />} label="Farmer" iconPosition="start" />
                  <Tab icon={<WavesIcon />} label="Fisherfolk" iconPosition="start" />
                  <Tab icon={<EngineeringIcon />} label="Farmworker" iconPosition="start" />
                  <Tab icon={<SchoolIcon />} label="Agri-Youth" iconPosition="start" />
                </Tabs>

                {/* Farmer Tab */}
                <TabPanel value={currentTab} index={0}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">Farming Activities</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">Crop Production</Typography>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={livelihoodDetails?.farmer?.is_rice || false}
                              onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_rice', e.target.checked)}
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
                              checked={livelihoodDetails?.farmer?.is_corn || false}
                              onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_corn', e.target.checked)}
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
                              checked={livelihoodDetails?.farmer?.is_other_crops || false}
                              onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_other_crops', e.target.checked)}
                              color="primary"
                            />
                          }
                          label="Other Crops"
                        />
                      </Grid>

                      {livelihoodDetails?.farmer?.is_other_crops && (
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Other Crops Description"
                            multiline
                            rows={2}
                            value={livelihoodDetails?.farmer?.other_crops_description || ''}
                            onChange={(e) => handleLivelihoodFieldChange('farmer', 'other_crops_description', e.target.value)}
                            placeholder="Specify other crops you produce (e.g., vegetables, fruits, root crops)"
                          />
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium" sx={{ mt: 2 }}>Livestock and Poultry</Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={livelihoodDetails?.farmer?.is_livestock || false}
                              onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_livestock', e.target.checked)}
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
                              checked={livelihoodDetails?.farmer?.is_poultry || false}
                              onChange={(e) => handleLivelihoodFieldChange('farmer', 'is_poultry', e.target.checked)}
                              color="primary"
                            />
                          }
                          label="Poultry Raising"
                        />
                      </Grid>

                      {livelihoodDetails?.farmer?.is_livestock && (
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Livestock Description"
                            multiline
                            rows={2}
                            value={livelihoodDetails?.farmer?.livestock_description || ''}
                            onChange={(e) => handleLivelihoodFieldChange('farmer', 'livestock_description', e.target.value)}
                            placeholder="Specify livestock types (e.g., cattle, carabao, goats, swine)"
                          />
                        </Grid>
                      )}

                      {livelihoodDetails?.farmer?.is_poultry && (
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Poultry Description"
                            multiline
                            rows={2}
                            value={livelihoodDetails?.farmer?.poultry_description || ''}
                            onChange={(e) => handleLivelihoodFieldChange('farmer', 'poultry_description', e.target.value)}
                            placeholder="Specify poultry types (e.g., chickens, ducks, geese, turkeys)"
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </TabPanel>

                {/* Fisherfolk Tab */}
                <TabPanel value={currentTab} index={1}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">Fishing Activities</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={livelihoodDetails?.fisherfolk?.is_fish_capture || false}
                              onChange={(e) => handleLivelihoodFieldChange('fisherfolk', 'is_fish_capture', e.target.checked)}
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
                              checked={livelihoodDetails?.fisherfolk?.is_aquaculture || false}
                              onChange={(e) => handleLivelihoodFieldChange('fisherfolk', 'is_aquaculture', e.target.checked)}
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
                              checked={livelihoodDetails?.fisherfolk?.is_fish_processing || false}
                              onChange={(e) => handleLivelihoodFieldChange('fisherfolk', 'is_fish_processing', e.target.checked)}
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
                          value={livelihoodDetails?.fisherfolk?.other_fishing_description || ''}
                          onChange={(e) => handleLivelihoodFieldChange('fisherfolk', 'other_fishing_description', e.target.value)}
                          placeholder="Describe other fishing-related activities or specify details about your fishing operations"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>

                {/* Farmworker Tab */}
                <TabPanel value={currentTab} index={2}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">Farm Work Activities</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={livelihoodDetails?.farmworker?.is_land_preparation || false}
                              onChange={(e) => handleLivelihoodFieldChange('farmworker', 'is_land_preparation', e.target.checked)}
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
                              checked={livelihoodDetails?.farmworker?.is_cultivation || false}
                              onChange={(e) => handleLivelihoodFieldChange('farmworker', 'is_cultivation', e.target.checked)}
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
                              checked={livelihoodDetails?.farmworker?.is_harvesting || false}
                              onChange={(e) => handleLivelihoodFieldChange('farmworker', 'is_harvesting', e.target.checked)}
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
                          value={livelihoodDetails?.farmworker?.other_work_description || ''}
                          onChange={(e) => handleLivelihoodFieldChange('farmworker', 'other_work_description', e.target.value)}
                          placeholder="Describe other farm work activities you perform (e.g., irrigation, pest control, farm maintenance)"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>

                {/* Agri-Youth Tab */}
                <TabPanel value={currentTab} index={3}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">Agricultural Youth Involvement</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={livelihoodDetails?.agriYouth?.is_agri_youth || false}
                              onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_agri_youth', e.target.checked)}
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
                              checked={livelihoodDetails?.agriYouth?.is_part_of_farming_household || false}
                              onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_part_of_farming_household', e.target.checked)}
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
                              checked={livelihoodDetails?.agriYouth?.is_formal_agri_course || false}
                              onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_formal_agri_course', e.target.checked)}
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
                              checked={livelihoodDetails?.agriYouth?.is_nonformal_agri_course || false}
                              onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_nonformal_agri_course', e.target.checked)}
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
                              checked={livelihoodDetails?.agriYouth?.is_agri_program_participant || false}
                              onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'is_agri_program_participant', e.target.checked)}
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
                          value={livelihoodDetails?.agriYouth?.other_involvement_description || ''}
                          onChange={(e) => handleLivelihoodFieldChange('agriYouth', 'other_involvement_description', e.target.value)}
                          placeholder="Describe other agricultural involvement, programs participated in, or future plans in agriculture"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// ✅ Helper function to get description for each livelihood category
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
