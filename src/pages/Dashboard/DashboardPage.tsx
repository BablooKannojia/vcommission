import React from 'react';
import PartnershipSummary from '../../components/dashboard/PartnershipSummary';
import MarketplaceMetrics from '../../components/dashboard/MarketplaceMetrics';
import ClicksChart from '../../components/dashboard/ClicksChart';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <PartnershipSummary />
      <MarketplaceMetrics />
      <ClicksChart />
    </div>
  );
};

export default DashboardPage;