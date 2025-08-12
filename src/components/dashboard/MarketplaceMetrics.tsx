import React, { useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import DateRangePicker from '../common/DateRangePicker';
import {
  FaMousePointer,
  FaEye,
  FaCartPlus,
  FaCheckCircle,
  FaDollarSign,
  FaCoins,
  FaChartLine,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface MetricCardProps {
  label: string;
  value: string;
  icon: IconType;
}

const MarketplaceMetrics: React.FC = () => {
  const { clicksData, dateRange, setDateRange, loading } = useDashboard();

  useEffect(() => {
  if (dateRange == null) {
    setDateRange({ startDate: '', endDate: '' });
  }
}, [dateRange, setDateRange]);

  const handleDateChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const filterDataByDateRange = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      return clicksData;
    }

    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);

    return clicksData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });
  };

  // show all data when dates are empty
  const filteredData = !dateRange.startDate || !dateRange.endDate 
    ? clicksData 
    : filterDataByDateRange();

  // Calculate totals
  const totals = filteredData.reduce(
    (acc, item) => ({
      clicks: acc.clicks + item.clicks,
      dpv: acc.dpv + item.dpv,
      atc: acc.atc + item.atc,
      sales: acc.sales + item.sales,
      commission: acc.commission + item.commission,
      conversion: acc.conversion + item.conversion,
    }),
    { clicks: 0, dpv: 0, atc: 0, sales: 0, commission: 0, conversion: 0 }
  );

  // Calculate metrics
  const conversionRate = totals.clicks > 0 
    ? (totals.conversion / totals.clicks) * 100 
    : 0;
  const earningsPerClick = totals.clicks > 0 
    ? totals.commission / totals.clicks 
    : 0;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="lg:flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 lg:mb-0 mb-2">Marketplace Metrics</h2>
        <DateRangePicker
          startDate={dateRange.startDate || ''}
          endDate={dateRange.endDate || ''}
          onDateChange={handleDateChange}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Clicks" value={totals.clicks.toLocaleString()} icon={FaMousePointer} />
        <MetricCard label="DPVs" value={totals.dpv.toLocaleString()} icon={FaEye} />
        <MetricCard label="ATCs" value={totals.atc.toLocaleString()} icon={FaCartPlus} />
        <MetricCard label="Conversions" value={totals.conversion.toLocaleString()} icon={FaCheckCircle} />
        <MetricCard label="Sales" value={formatCurrency(totals.sales)} icon={FaDollarSign} />
        <MetricCard label="Commission" value={formatCurrency(totals.commission)} icon={FaCoins} />
        <MetricCard label="Conversion Rate" value={`${conversionRate.toFixed(2)}%`} icon={FaChartLine} />
        <MetricCard label="EPC" value={formatCurrency(earningsPerClick)} icon={FaMoneyBillWave} />
      </div>

      {dateRange.startDate && dateRange.endDate ? (
        <div className="text-sm text-gray-500">
          Showing data from {new Date(dateRange.startDate).toLocaleDateString()} to{' '}
          {new Date(dateRange.endDate).toLocaleDateString()}
        </div>
      ) : (
        <div className="text-sm text-gray-500">
          Showing all available data ({clicksData.length} months)
        </div>
      )}
    </div>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon }) => (
  <div className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 flex items-center">
    <Icon className="text-lime-400 mr-3 text-lg" />
    <div className="text-left">
      <div className="font-medium">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  </div>
);

export default MarketplaceMetrics;
