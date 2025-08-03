import React from 'react';
import { useDashboard } from '../../context/dashboardContext';

const PartnershipSummary: React.FC = () => {
  const { partnerships, loading } = useDashboard();

  if (loading || !partnerships) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Partnerships Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="active flex justify-between items-center">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
              <h3 className="text-sm font-medium text-gray-600 pl-2">Active Brands</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{partnerships.activeBrands}</p>
          </div>
          <div className="inactive flex justify-between items-center">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
              <h3 className="text-sm font-medium text-gray-600 pl-2">Invited Brands</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{partnerships.invitedBrands}</p>
          </div>

        </div>
        <div className="col-span-2 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          <h3 className="font-medium text-gray-800 mb-2">Next Steps</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li className="text-sm text-gray-600">You have 1 outstanding partnership invite</li>
            <li className="text-sm text-gray-600">You have 1 pending partnership approval</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PartnershipSummary;