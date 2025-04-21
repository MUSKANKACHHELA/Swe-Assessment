// Base URL for all API endpoints
const API_BASE_URL = '/api/v1';

// Fetch filtered climate data (raw readings)
export const getClimateData = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.locationId) queryParams.append('location_id', filters.locationId);
  if (filters.startDate) queryParams.append('start_date', filters.startDate);
  if (filters.endDate) queryParams.append('end_date', filters.endDate);
  if (filters.metric) queryParams.append('metric', filters.metric);
  if (filters.qualityThreshold) queryParams.append('quality_threshold', filters.qualityThreshold);

  const response = await fetch(`${API_BASE_URL}/climate?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch climate data');
  return await response.json();
};

// Fetch climate summary (min, max, weighted average)
export const getClimateSummary = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.locationId) queryParams.append('location_id', filters.locationId);
  if (filters.startDate) queryParams.append('start_date', filters.startDate);
  if (filters.endDate) queryParams.append('end_date', filters.endDate);
  if (filters.metric) queryParams.append('metric', filters.metric);
  if (filters.qualityThreshold) queryParams.append('quality_threshold', filters.qualityThreshold);

  const response = await fetch(`${API_BASE_URL}/summary?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch climate summary');
  return await response.json();
};

// Fetch all available locations
export const getLocations = async () => {
  const response = await fetch(`${API_BASE_URL}/locations`);
  if (!response.ok) throw new Error('Failed to fetch locations');
  return await response.json();
};

// Fetch all available climate metrics
export const getMetrics = async () => {
  const response = await fetch(`${API_BASE_URL}/metrics`);
  if (!response.ok) throw new Error('Failed to fetch metrics');
  return await response.json();
};

// Fetch trend analysis data (rate, direction, anomalies)
export const getTrends = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.locationId) queryParams.append('location_id', filters.locationId);
  if (filters.startDate) queryParams.append('start_date', filters.startDate);
  if (filters.endDate) queryParams.append('end_date', filters.endDate);
  if (filters.metric) queryParams.append('metric', filters.metric);
  if (filters.qualityThreshold) queryParams.append('quality_threshold', filters.qualityThreshold);

  const response = await fetch(`${API_BASE_URL}/trends?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch trend data');
  return await response.json();
};
