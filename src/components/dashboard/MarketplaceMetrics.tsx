// MarketplaceMetrics.tsx
import React from 'react';
import { useDashboard } from '../../context/dashboardContext';
import DateRangePicker from '../common/DateRangePicker';

const MarketplaceMetrics: React.FC = () => {
  const { metrics, dateRange, setDateRange, loading } = useDashboard();

  const handleDateChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  // Filter metrics based on the selected date range
  const filteredMetrics = metrics.filter(metric => {
    const metricDate = new Date(metric.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    return metricDate >= startDate && metricDate <= endDate;
  });

  // Calculate totals for the summary cards
  const totals = filteredMetrics.reduce((acc, metric) => ({
    clicks: acc.clicks + metric.clicks,
    dpv: acc.dpv + metric.dpv,
    atc: acc.atc + metric.atc,
    salesCommission: acc.salesCommission + metric.salesCommission,
    conversionRate: acc.conversionRate + metric.conversionRate,
    earningsPerClick: acc.earningsPerClick + metric.earningsPerClick,
  }), {
    clicks: 0,
    dpv: 0,
    atc: 0,
    salesCommission: 0,
    conversionRate: 0,
    earningsPerClick: 0,
  });

  // Calculate averages
  const avgConversionRate = filteredMetrics.length > 0 
    ? totals.conversionRate / filteredMetrics.length 
    : 0;
  const avgEarningsPerClick = filteredMetrics.length > 0 
    ? totals.earningsPerClick / filteredMetrics.length 
    : 0;

  // Calculate conversion count (assuming conversion rate is percentage of clicks)
  const conversions = (totals.clicks * avgConversionRate / 100).toFixed(0);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="lg:flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 lg:mb-0 mb-2">Marketplace</h2>
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onDateChange={handleDateChange}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-800`}>
          <div className="text-left">
            <div className="font-medium">Clicks</div>
            <div className="text-sm">{totals.clicks.toLocaleString()}</div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-800`}>
          <div className="text-left">
            <div className="font-medium">Detail Page Views</div>
            <div className="text-sm">{totals.dpv.toLocaleString()}</div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-800`}>
          <div className="text-left">
            <div className="font-medium">Add to Carts</div>
            <div className="text-sm">{totals.atc.toLocaleString()}</div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-800`}>
          <div className="text-left">
            <div className="font-medium">Conversions</div>
            <div className="text-sm">{conversions}</div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-800`}>
          <div className="text-left">
            <div className="font-medium">Sales</div>
            <div className="text-sm">${totals.salesCommission.toLocaleString()}</div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-800`}>
          <div className="text-left">
            <div className="font-medium">Commission</div>
            <div className="text-sm">${(totals.salesCommission * 0.2).toLocaleString()}</div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-800`}>
          <div className="text-left">
            <div className="font-medium">Conversion Rate</div>
            <div className="text-sm">{avgConversionRate.toFixed(2)}%</div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-800`}>
          <div className="text-left">
            <div className="font-medium">Earnings Per Click</div>
            <div className="text-sm">${avgEarningsPerClick.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Optional: Display date range info */}
      <div className="text-sm text-gray-500 mb-4">
        Showing data from {new Date(dateRange.startDate).toLocaleDateString()} to {new Date(dateRange.endDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default MarketplaceMetrics;