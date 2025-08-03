import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { useDashboard } from '../../context/dashboardContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type MetricTab = 'clicks' | 'dpv' | 'atc' | 'conversions' | 'sales' | 'commission';

const ClicksChart: React.FC = () => {
  const { clicksData, loading } = useDashboard();
  const [activeTab, setActiveTab] = useState<MetricTab>('clicks');

  if (loading) {
    return <div>Loading...</div>;
  }

  // Common data configuration
  const months = clicksData.map((item) => item.month);
  
  // Get data for the current active tab
  const getChartData = () => {
    const datasetConfig = {
      backgroundColor: '#88a831',
      borderColor: '#8db12aff',
      borderRadius: 4,
      tension: 0.1,
      fill: false,
    };

    switch (activeTab) {
      case 'clicks':
        return {
          labels: months,
          datasets: [
            {
              ...datasetConfig,
              label: 'Clicks',
              data: clicksData.map((item) => item.clicks),
            },
          ],
        };
      case 'dpv':
        return {
          labels: months,
          datasets: [
            {
              ...datasetConfig,
              label: 'DPVs',
              data: clicksData.map((item) => item.dpv),
            },
          ],
        };
      case 'atc':
        return {
          labels: months,
          datasets: [
            {
              ...datasetConfig,
              label: 'ATCs',
              data: clicksData.map((item) => item.atc),
            },
          ],
        };
      case 'conversions':
        return {
          labels: months,
          datasets: [
            {
              ...datasetConfig,
              label: 'Conversions',
              data: clicksData.map((item) => item.conversion),
            },
          ],
        };
      case 'sales':
        return {
          labels: months,
          datasets: [
            {
              ...datasetConfig,
              label: 'Sales',
              data: clicksData.map((item) => item.sales),
            },
          ],
        };
      case 'commission':
        return {
          labels: months,
          datasets: [
            {
              ...datasetConfig,
              label: 'Commission',
              data: clicksData.map((item) => item.commission),
            },
          ],
        };
      default:
        return {
          labels: months,
          datasets: [],
        };
    }
  };

  // Bar Chart Options
  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (typeof value === 'number') {
              if (value >= 1000) return `$${value / 1000}k`;
              return `$${value}`;
            }
            return value;
          },
        },
        grid: {
          drawTicks: false,
          color: '#E5E7EB',
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (['sales', 'commission', 'conversion'].includes(activeTab)) {
                label += new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0
                }).format(context.parsed.y);
              } else {
                label += context.parsed.y;
              }
            }
            return label;
          }
        }
      },
    },
  };

  // Line Chart Options
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (typeof value === 'number') {
              if (value >= 1000) return `$${value / 1000}k`;
              return `$${value}`;
            }
            return value;
          },
        },
        grid: {
          drawTicks: false,
          color: '#E5E7EB',
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (['sales', 'commission', 'conversion'].includes(activeTab)) {
                label += new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0
                }).format(context.parsed.y);
              } else {
                label += context.parsed.y;
              }
            }
            return label;
          }
        }
      },
    },
  };

  const tabs: { id: MetricTab; label: string }[] = [
    { id: 'clicks', label: 'Clicks' },
    { id: 'dpv', label: 'DPVs' },
    { id: 'atc', label: 'ATCs' },
    { id: 'conversions', label: 'Conversions' },
    { id: 'sales', label: 'Sales' },
    { id: 'commission', label: 'Commission' },
  ];

  // Determine which chart type to use for each tab
  const shouldUseLineChart = ['dpv', 'atc', 'conversions', 'sales', 'commission'].includes(activeTab);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {tabs.find(tab => tab.id === activeTab)?.label || 'Clicks'}
        </h2>
      </div>

      <div className="relative mb-4 md:mb-6">
        <div className="flex lg:justify-end space-x-4 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Fade effect on the right for mobile */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
      </div>

      <div className="h-64 md:h-80">
        {shouldUseLineChart ? (
          <Line data={getChartData()} options={lineChartOptions} />
        ) : (
          <Bar data={getChartData()} options={barChartOptions} />
        )}
      </div>

      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <p>
          NOTE: A link will only start reporting at 10 total clicks. Clicks may take up to 24 hours to appear, conversions may take up to 48 hours to appear.
        </p>
      </div>
    </div>
  );
};

export default ClicksChart;