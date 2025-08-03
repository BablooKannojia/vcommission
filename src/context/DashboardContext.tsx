import React, { createContext, useContext, useState, useEffect } from 'react';
import { PartnershipData, MarketplaceMetric, ClicksData } from '../types/dashboard';
import { fetchPartnerships, fetchMarketplaceMetrics, fetchClicksData } from '../services/dashboardApi';

interface DateRange {
  startDate: string;
  endDate: string;
}

interface DashboardContextType {
  partnerships: PartnershipData | null;
  metrics: MarketplaceMetric[];
  clicksData: ClicksData[];
  loading: boolean;
  error: string | null;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  fetchMetrics: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [partnerships, setPartnerships] = useState<PartnershipData | null>(null);
  const [metrics, setMetrics] = useState<MarketplaceMetric[]>([]);
  const [clicksData, setClicksData] = useState<ClicksData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: '',
    endDate: '',
  });

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [partnershipsData, metricsData, clicksData] = await Promise.all([
        fetchPartnerships(),
        fetchMarketplaceMetrics(dateRange.startDate, dateRange.endDate),
        fetchClicksData(),
      ]);
      setPartnerships(partnershipsData);
      setMetrics(metricsData);
      setClicksData(clicksData);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const metricsData = await fetchMarketplaceMetrics(dateRange.startDate, dateRange.endDate);
      setMetrics(metricsData);
    } catch (err) {
      setError('Failed to fetch metrics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      fetchMetrics();
    }
  }, [dateRange]);

  return (
    <DashboardContext.Provider
      value={{
        partnerships,
        metrics,
        clicksData,
        loading,
        error,
        dateRange,
        setDateRange,
        fetchMetrics,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

export { DashboardProvider, useDashboard };
