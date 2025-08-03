import React from 'react';
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

  const handleDateChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const monthToDate = (month: string): Date => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = months.indexOf(month);
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, monthIndex, 1);
  };

  const hasDateRange = !!dateRange.startDate && !!dateRange.endDate;

  const filteredData = hasDateRange
    ? clicksData.filter(item => {
        const itemDate = monthToDate(item.month);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);
        return itemDate >= startDate && itemDate <= endDate;
      })
    : clicksData;

  const totals = filteredData.reduce((acc, data) => ({
    clicks: acc.clicks + data.clicks,
    dpv: acc.dpv + data.dpv,
    atc: acc.atc + data.atc,
    sales: acc.sales + data.sales,
    commission: acc.commission + data.commission,
    conversion: acc.conversion + data.conversion,
  }), {
    clicks: 0,
    dpv: 0,
    atc: 0,
    sales: 0,
    commission: 0,
    conversion: 0,
  });

  const conversionRate = totals.clicks > 0
    ? (totals.conversion / totals.clicks) * 100
    : 0;

  const earningsPerClick = totals.clicks > 0
    ? totals.commission / totals.clicks
    : 0;

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

      {filteredData.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-500">
          No data available{hasDateRange ? " for the selected date range" : ""}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MetricCard label="Clicks" value={totals.clicks.toLocaleString()} icon={FaMousePointer} />
            <MetricCard label="Detail Page Views" value={totals.dpv.toLocaleString()} icon={FaEye}/>
            <MetricCard label="Add to Carts" value={totals.atc.toLocaleString()} icon={FaCartPlus}/>
            <MetricCard label="Conversions" value={totals.conversion.toLocaleString()} icon={FaCheckCircle}/>
            <MetricCard label="Sales" value={totals.sales.toLocaleString()} icon={FaDollarSign}/>
            <MetricCard label="Commission" value={totals.commission.toLocaleString()} icon={FaCoins} />
            <MetricCard label="Conversion Rate" value={conversionRate.toFixed(2)} icon={FaChartLine}/>
            <MetricCard label="Earnings Per Click" value={earningsPerClick.toFixed(2)} icon={FaMoneyBillWave}/>
          </div>

          {hasDateRange && (
            <div className="text-sm text-gray-500 mb-4">
              Showing data from {new Date(dateRange.startDate).toLocaleDateString()} to {new Date(dateRange.endDate).toLocaleDateString()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon }) => (
  <div className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 flex items-center">
    <Icon className="text-gray-400 mr-3 text-lg" />
    <div className="text-left">
      <div className="font-medium">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  </div>
);

export default MarketplaceMetrics;