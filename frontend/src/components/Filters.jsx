import { useState } from 'react';

function Filters({ locations, metrics, filters, onFilterChange, onApplyFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  console.log("📍 Locations:", locations);
  console.log("📊 Metrics:", metrics);


  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-eco-primary mb-4">Filter Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4 items-end">
        
        
        <div className="md:col-span-2">
          <label htmlFor="qualityThreshold" className="block text-sm font-medium text-gray-700 mb-1">
            Quality
          </label>
          <select
            id="qualityThreshold"
            name="qualityThreshold"
            value={localFilters.qualityThreshold}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-eco-primary focus:ring focus:ring-eco-primary focus:ring-opacity-50"
          >
            <option value="">All Quality Levels</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="questionable">Questionable</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        {/* Add location filter */}
        <div className="md:col-span-2">
          <label htmlFor="locationId" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            id="locationId"
            name="locationId"
            value={localFilters.locationId}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-eco-primary focus:ring focus:ring-eco-primary focus:ring-opacity-50"
          >
            <option value="">Select Location</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>

        {/* Add metric filter */}
        <div className="md:col-span-2">
          <label htmlFor="metric" className="block text-sm font-medium text-gray-700 mb-1">
            Metric
          </label>
          <select
            id="metric"
            name="metric"
            value={localFilters.metric}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-eco-primary focus:ring focus:ring-eco-primary focus:ring-opacity-50"
          >
            <option value="">Select Metric</option>
            {metrics.map(metric => (
              <option key={metric.name} value={metric.name}>{metric.display_name}</option>
            ))}
          </select>
        </div>


        <div className="md:col-span-2">
          <label htmlFor="analysisType" className="block text-sm font-medium text-gray-700 mb-1">
            Analysis
          </label>
          <select
            id="analysisType"
            name="analysisType"
            value={localFilters.analysisType}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-eco-primary focus:ring focus:ring-eco-primary focus:ring-opacity-50"
          >
            <option value="raw">Raw Data</option>
            <option value="trends">Trend Analysis</option>
            <option value="weighted">Quality Weighted</option>
            <option value="anomalies">Anomalies</option>
          </select>
        </div>
        <button
          type="submit"
          className="md:col-span-2 bg-eco-primary text-white py-2 px-4 rounded hover:bg-eco-primary-dark"
        >
          Apply Filters
        </button>

        
      </form>
    </div>
  );
}

export default Filters;