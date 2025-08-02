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
    return <div>Loading...</div>;
  }

  // Calculate totals for the summary cards
  const totals = metrics.reduce((acc, metric) => ({
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

  const tabs = [
    { label: 'Clicks', value: '31K (+521.59%)' },
    { label: 'Detail Page Views', value: '49.8K (+736.59%)' },
    { label: 'Add to Carts', value: '3.4K (+1,616.33%)' },
    { label: 'Conversions', value: '1.5K (+1,798.75%)' },
    { label: 'Sales', value: '$158.6K (+1,899.97%)' },
    { label: 'Commission', value: '$26.6K (+1,650.86%)' },
    { label: 'Conversion Rate', value: '5% (150% increase)' },
    { label: 'Earnings Per Click', value: '$0.86 /click (+218.52%)' },
  ];

  const avgConversionRate = metrics.length > 0 ? totals.conversionRate / metrics.length : 0;
  const avgEarningsPerClick = metrics.length > 0 ? totals.earningsPerClick / metrics.length : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="lg:flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 lg:mb-0 mb-2">Marketplace Metrics</h2>
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onDateChange={handleDateChange}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {tabs.map(tab => (
          <button
            className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-800`}
          >
            <div className="text-left">
              <div className="font-medium">{tab.label}</div>
              <div className="text-sm">{tab.value}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceMetrics;