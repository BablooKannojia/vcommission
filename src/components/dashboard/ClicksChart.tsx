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
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Bar Chart Data (for Clicks)
  const getBarChartData = () => {
    return {
      labels: months,
      datasets: [
        {
          label: 'Clicks',
          data: clicksData.map((item) => item.clicks),
          backgroundColor: '#3B82F6',
          borderRadius: 4,
        },
      ],
    };
  };

  // Line Chart Data (for DPVs)
  const getLineChartData = () => {
    return {
      labels: months,
      datasets: [
        {
          label: 'DPVs',
          data: clicksData.map((item) => item.clicks),
          backgroundColor: '#3B82F6',
          borderRadius: 4,
        },
      ],
    };
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
              if (value >= 1000) return `S${value / 1000}k`;
              return `S${value}`;
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

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Clicks</h2>
      </div>

      <div className="relative mb-4 md:mb-6">
        <div className="flex lg:justify-end space-x-4 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === tab.id
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
        {activeTab === 'clicks' ? (
          <Bar data={getBarChartData()} options={barChartOptions} />
        ) : activeTab === 'dpv' ? (
          <Line data={getLineChartData()} options={lineChartOptions} />
        ) : (
          <Bar data={getBarChartData()} options={barChartOptions} />
        )}
      </div>

      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <p>
          NOTE: A link will only start reporting at 10 total clicks. Clicks may take up to 24 hours to appear, conversions may take up to 48 hours to appear.
        </p>
        {/* <a href="#" className="text-blue-600 text-sm hover:underline">
          See All Reporting →
        </a> */}
      </div>
    </div>
  );
};

export default ClicksChart;