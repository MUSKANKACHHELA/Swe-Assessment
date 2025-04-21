import { useState, useEffect } from 'react';
import Filters from './components/Filters';
import ChartContainer from './components/ChartContainer';
import TrendAnalysis from './components/TrendAnalysis';
import QualityIndicator from './components/QualityIndicator';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getLocations,
  getMetrics,
  getClimateData,
  getClimateSummary,
  getTrends
} from './api';

function App() {
  // App-level state management
  const [locations, setLocations] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [climateData, setClimateData] = useState([]);
  const [trendData, setTrendData] = useState(null);
  const [filters, setFilters] = useState({
    locationId: '',
    startDate: '',
    endDate: '',
    metric: '',
    qualityThreshold: '',
    analysisType: 'raw'
  });
  const [loading, setLoading] = useState(false);

  // Initial fetch for static dropdown values
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const [locRes, metricRes] = await Promise.all([
          getLocations(),
          getMetrics()
        ]);
        setLocations(locRes.data);
        setMetrics(metricRes.data);
      } catch (err) {
        console.error('Error loading initial data:', err);
      }
    };
    fetchInitial();
  }, []);

  // Trigger data fetch when filters change
  useEffect(() => {
    if (filters.locationId && filters.metric) {
      fetchData();
    }
  }, [filters]);

  // Fetch and update data based on selected analysis type
  const fetchData = async () => {
    setLoading(true);
    try {
      let res;
      if (filters.analysisType === 'trends') {
        res = await getTrends(filters);
        setTrendData(res.data);
        if (!res.data || Object.keys(res.data).length === 0) {
          toast.warn("No trend data found. Try different filters.");
        }
      } else if (filters.analysisType === 'weighted') {
        res = await getClimateSummary(filters);
        const summaryArray = Object.entries(res.data).map(([metric, stats]) => ({
          ...stats,
          metric_name: metric,
          date: '',
          value: stats.weighted_avg,
          location_name: 'Summary',
          quality: 'excellent',
          unit: stats.unit || 'celsius',
        }));
        setClimateData(summaryArray);
        if (summaryArray.length === 0) {
          toast.warn("No summary data found. Try different filters.");
        }
      } else {
        res = await getClimateData(filters);
        setClimateData(res.data);
        if (!res.data || res.data.length === 0) {
          toast.warn("No climate data found. Try different filters.");
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-eco-primary mb-2">
          EcoVision: Climate Visualizer
        </h1>
        <p className="text-gray-600 italic">
          Transforming climate data into actionable insights for a sustainable future
        </p>
      </header>

      {/* Filters Component */}
      <Filters 
        locations={locations}
        metrics={metrics}
        filters={filters}
        onFilterChange={setFilters}
        onApplyFilters={fetchData}
      />

      {/* Visualization Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {filters.analysisType === 'trends' ? (
          <TrendAnalysis 
            data={trendData}
            loading={loading}
          />
        ) : (
          <>
            <ChartContainer 
              title="Climate Trends"
              loading={loading}
              chartType="line"
              data={climateData}
              showQuality={true}
            />
            <ChartContainer 
              title="Quality Distribution"
              loading={loading}
              chartType="bar"
              data={climateData}
              showQuality={true}
            />
          </>
        )}
      </div>

      {/* Quality Indicator + Toast Alerts */}
      <QualityIndicator 
        data={climateData}
        className="mt-6"
      />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;



