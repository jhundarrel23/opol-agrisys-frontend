import { useState, useEffect, useCallback } from 'react';
import { referenceDataService } from '../api/rsbsaService';

/**
 * Custom hook for managing RSBSA reference data
 * Handles loading and caching of reference data like barangays, municipalities, etc.
 */
export const useRSBSAReferenceData = () => {
  // Reference data state
  const [livelihoodCategories, setLivelihoodCategories] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);

  // Loading states
  const [isLoadingLivelihoodCategories, setIsLoadingLivelihoodCategories] = useState(false);
  const [isLoadingCommodities, setIsLoadingCommodities] = useState(false);
  const [isLoadingBarangays, setIsLoadingBarangays] = useState(false);
  const [isLoadingMunicipalities, setIsLoadingMunicipalities] = useState(false);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingRegions, setIsLoadingRegions] = useState(false);

  // Error states
  const [livelihoodCategoriesError, setLivelihoodCategoriesError] = useState(null);
  const [commoditiesError, setCommoditiesError] = useState(null);
  const [barangaysError, setBarangaysError] = useState(null);
  const [municipalitiesError, setMunicipalitiesError] = useState(null);
  const [provincesError, setProvincesError] = useState(null);
  const [regionsError, setRegionsError] = useState(null);

  // Cache for loaded data to avoid unnecessary API calls
  const [dataCache, setDataCache] = useState({
    livelihoodCategories: null,
    commodities: null,
    barangays: null,
    municipalities: null,
    provinces: null,
    regions: null
  });

  // Load livelihood categories
  const loadLivelihoodCategories = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && dataCache.livelihoodCategories) {
      setLivelihoodCategories(dataCache.livelihoodCategories);
      return;
    }

    setIsLoadingLivelihoodCategories(true);
    setLivelihoodCategoriesError(null);

    try {
      const result = await referenceDataService.getLivelihoodCategories();
      if (result.success) {
        setLivelihoodCategories(result.data);
        setDataCache(prev => ({ ...prev, livelihoodCategories: result.data }));
      } else {
        setLivelihoodCategoriesError(result.error);
      }
    } catch (error) {
      setLivelihoodCategoriesError('Failed to load livelihood categories');
    } finally {
      setIsLoadingLivelihoodCategories(false);
    }
  }, [dataCache.livelihoodCategories]);

  // Load commodities
  const loadCommodities = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && dataCache.commodities) {
      setCommodities(dataCache.commodities);
      return;
    }

    setIsLoadingCommodities(true);
    setCommoditiesError(null);

    try {
      const result = await referenceDataService.getCommodities();
      if (result.success) {
        setCommodities(result.data);
        setDataCache(prev => ({ ...prev, commodities: result.data }));
      } else {
        setCommoditiesError(result.error);
      }
    } catch (error) {
      setCommoditiesError('Failed to load commodities');
    } finally {
      setIsLoadingCommodities(false);
    }
  }, [dataCache.commodities]);

  // Load barangays
  const loadBarangays = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && dataCache.barangays) {
      setBarangays(dataCache.barangays);
      return;
    }

    setIsLoadingBarangays(true);
    setBarangaysError(null);

    try {
      const result = await referenceDataService.getBarangays();
      if (result.success) {
        setBarangays(result.data);
        setDataCache(prev => ({ ...prev, barangays: result.data }));
      } else {
        setBarangaysError(result.error);
      }
    } catch (error) {
      setBarangaysError('Failed to load barangays');
    } finally {
      setIsLoadingBarangays(false);
    }
  }, [dataCache.barangays]);

  // Load municipalities
  const loadMunicipalities = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && dataCache.municipalities) {
      setMunicipalities(dataCache.municipalities);
      return;
    }

    setIsLoadingMunicipalities(true);
    setMunicipalitiesError(null);

    try {
      const result = await referenceDataService.getMunicipalities();
      if (result.success) {
        setMunicipalities(result.data);
        setDataCache(prev => ({ ...prev, municipalities: result.data }));
      } else {
        setMunicipalitiesError(result.error);
      }
    } catch (error) {
      setMunicipalitiesError('Failed to load municipalities');
    } finally {
      setIsLoadingMunicipalities(false);
    }
  }, [dataCache.municipalities]);

  // Load provinces
  const loadProvinces = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && dataCache.provinces) {
      setProvinces(dataCache.provinces);
      return;
    }

    setIsLoadingProvinces(true);
    setProvincesError(null);

    try {
      const result = await referenceDataService.getProvinces();
      if (result.success) {
        setProvinces(result.data);
        setDataCache(prev => ({ ...prev, provinces: result.data }));
      } else {
        setProvincesError(result.error);
      }
    } catch (error) {
      setProvincesError('Failed to load provinces');
    } finally {
      setIsLoadingProvinces(false);
    }
  }, [dataCache.provinces]);

  // Load regions
  const loadRegions = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && dataCache.regions) {
      setRegions(dataCache.regions);
      return;
    }

    setIsLoadingRegions(true);
    setRegionsError(null);

    try {
      const result = await referenceDataService.getRegions();
      if (result.success) {
        setRegions(result.data);
        setDataCache(prev => ({ ...prev, regions: result.data }));
      } else {
        setRegionsError(result.error);
      }
    } catch (error) {
      setRegionsError('Failed to load regions');
    } finally {
      setIsLoadingRegions(false);
    }
  }, [dataCache.regions]);

  // Load all reference data
  const loadAllReferenceData = useCallback(async (forceRefresh = false) => {
    await Promise.all([
      loadLivelihoodCategories(forceRefresh),
      loadCommodities(forceRefresh),
      loadBarangays(forceRefresh),
      loadMunicipalities(forceRefresh),
      loadProvinces(forceRefresh),
      loadRegions(forceRefresh)
    ]);
  }, [
    loadLivelihoodCategories,
    loadCommodities,
    loadBarangays,
    loadMunicipalities,
    loadProvinces,
    loadRegions
  ]);

  // Refresh all data (force refresh)
  const refreshAllData = useCallback(() => {
    loadAllReferenceData(true);
  }, [loadAllReferenceData]);

  // Clear cache
  const clearCache = useCallback(() => {
    setDataCache({
      livelihoodCategories: null,
      commodities: null,
      barangays: null,
      municipalities: null,
      provinces: null,
      regions: null
    });
  }, []);

  // Get livelihood category by ID
  const getLivelihoodCategoryById = useCallback((id) => {
    return livelihoodCategories.find(category => category.id === id);
  }, [livelihoodCategories]);

  // Get commodity by ID
  const getCommodityById = useCallback((id) => {
    return commodities.find(commodity => commodity.id === id);
  }, [commodities]);

  // Get barangay by ID
  const getBarangayById = useCallback((id) => {
    return barangays.find(barangay => barangay.id === id);
  }, [barangays]);

  // Get municipality by ID
  const getMunicipalityById = useCallback((id) => {
    return municipalities.find(municipality => municipality.id === id);
  }, [municipalities]);

  // Get province by ID
  const getProvinceById = useCallback((id) => {
    return provinces.find(province => province.id === id);
  }, [provinces]);

  // Get region by ID
  const getRegionById = useCallback((id) => {
    return regions.find(region => region.id === id);
  }, [regions]);

  // Get barangays by municipality
  const getBarangaysByMunicipality = useCallback((municipalityId) => {
    return barangays.filter(barangay => barangay.municipality_id === municipalityId);
  }, [barangays]);

  // Get municipalities by province
  const getMunicipalitiesByProvince = useCallback((provinceId) => {
    return municipalities.filter(municipality => municipality.province_id === provinceId);
  }, [municipalities]);

  // Get provinces by region
  const getProvincesByRegion = useCallback((regionId) => {
    return provinces.filter(province => province.region_id === regionId);
  }, [provinces]);

  // Check if any data is loading
  const isLoading = isLoadingLivelihoodCategories || 
                   isLoadingCommodities || 
                   isLoadingBarangays || 
                   isLoadingMunicipalities || 
                   isLoadingProvinces || 
                   isLoadingRegions;

  // Check if any errors exist
  const hasErrors = livelihoodCategoriesError || 
                   commoditiesError || 
                   barangaysError || 
                   municipalitiesError || 
                   provincesError || 
                   regionsError;

  // Load initial data on mount
  useEffect(() => {
    loadAllReferenceData();
  }, [loadAllReferenceData]);

  return {
    // Data
    livelihoodCategories,
    commodities,
    barangays,
    municipalities,
    provinces,
    regions,

    // Loading states
    isLoading,
    isLoadingLivelihoodCategories,
    isLoadingCommodities,
    isLoadingBarangays,
    isLoadingMunicipalities,
    isLoadingProvinces,
    isLoadingRegions,

    // Error states
    hasErrors,
    livelihoodCategoriesError,
    commoditiesError,
    barangaysError,
    municipalitiesError,
    provincesError,
    regionsError,

    // Actions
    loadLivelihoodCategories,
    loadCommodities,
    loadBarangays,
    loadMunicipalities,
    loadProvinces,
    loadRegions,
    loadAllReferenceData,
    refreshAllData,
    clearCache,

    // Utility functions
    getLivelihoodCategoryById,
    getCommodityById,
    getBarangayById,
    getMunicipalityById,
    getProvinceById,
    getRegionById,
    getBarangaysByMunicipality,
    getMunicipalitiesByProvince,
    getProvincesByRegion
  };
};

export default useRSBSAReferenceData;