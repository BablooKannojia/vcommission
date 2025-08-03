import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarketplaceMetrics from './MarketplaceMetrics';
import { useDashboard } from '../../context/dashboardContext';

jest.mock('../../context/dashboardContext');
jest.mock('../common/DateRangePicker', () => ({
  __esModule: true,
  default: jest.fn(({ onDateChange }) => (
    <div data-testid="date-range-picker">
      <button
        onClick={() => onDateChange('2025-01-01', '2025-01-31')}
        data-testid="mock-date-change"
      >
        Change Date
      </button>
    </div>
  )),
}));

const mockClicksData = [
  {
    month: 'Jan',
    date: '2025-01-01',
    clicks: 1200,
    dpv: 850,
    atc: 450,
    conversion: 3750,
    sales: 12500,
    commission: 2500,
  },
  {
    month: 'Feb',
    date: '2025-02-01',
    clicks: 1500,
    dpv: 1100,
    atc: 600,
    conversion: 4500,
    sales: 18000,
    commission: 3600,
  },
];

describe('MarketplaceMetrics', () => {
  const mockSetDateRange = jest.fn();

  beforeEach(() => {
    (useDashboard as jest.Mock).mockReturnValue({
      clicksData: mockClicksData,
      marketplaceMetrics: [],
      dateRange: { startDate: '', endDate: '' },
      setDateRange: mockSetDateRange,
      loading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when data is loading', () => {
    (useDashboard as jest.Mock).mockReturnValue({
      clicksData: [],
      marketplaceMetrics: [],
      dateRange: { startDate: '', endDate: '' },
      setDateRange: mockSetDateRange,
      loading: true,
    });
    render(<MarketplaceMetrics />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the component with correct title', () => {
    render(<MarketplaceMetrics />);
    expect(screen.getByText('Marketplace Metrics')).toBeInTheDocument();
  });

  it('renders the DateRangePicker component', () => {
    render(<MarketplaceMetrics />);
    expect(screen.getByTestId('date-range-picker')).toBeInTheDocument();
  });

  it('displays all metric cards with correct data', () => {
    render(<MarketplaceMetrics />);

    expect(screen.getByText('Clicks')).toBeInTheDocument();
    expect(screen.getByText('DPVs')).toBeInTheDocument();
    expect(screen.getByText('ATCs')).toBeInTheDocument();
    expect(screen.getByText('Conversions')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
    expect(screen.getByText('Commission')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    expect(screen.getByText('EPC')).toBeInTheDocument();

    expect(screen.getByText('2,700')).toBeInTheDocument(); // Clicks
    expect(screen.getByText('1,950')).toBeInTheDocument(); // DPVs
    expect(screen.getByText('1,050')).toBeInTheDocument(); // ATCs
    expect(screen.getByText('8,250')).toBeInTheDocument(); // Conversions

    // Use flexible matching for text split across elements
    expect(screen.getByText((_, node) => node?.textContent === '$30,500.00')).toBeInTheDocument();
    expect(screen.getByText((_, node) => node?.textContent === '$6,100.00')).toBeInTheDocument();
    expect(screen.getByText((_, node) => node?.textContent === '305.56%')).toBeInTheDocument();
    expect(screen.getByText((_, node) => node?.textContent === '$11.30')).toBeInTheDocument(); // Adjust if EPC differs
  });

  it('calls setDateRange when date range is changed', () => {
    render(<MarketplaceMetrics />);
    fireEvent.click(screen.getByTestId('mock-date-change'));
    expect(mockSetDateRange).toHaveBeenCalledWith({
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    });
  });

  it('filters data when date range is provided', () => {
    (useDashboard as jest.Mock).mockReturnValue({
      clicksData: mockClicksData,
      marketplaceMetrics: [],
      dateRange: {
        startDate: '2025-01-01',
        endDate: '2025-01-31',
      },
      setDateRange: mockSetDateRange,
      loading: false,
    });

    render(<MarketplaceMetrics />);
    expect(screen.getByText('1,200')).toBeInTheDocument(); // Only Jan data
    expect(screen.queryByText('2,700')).not.toBeInTheDocument(); // Total should not show
  });

  it('shows zero values when filtered data is empty', () => {
    (useDashboard as jest.Mock).mockReturnValue({
      clicksData: [],
      marketplaceMetrics: [],
      dateRange: { startDate: '2025-03-01', endDate: '2025-03-31' },
      setDateRange: mockSetDateRange,
      loading: false,
    });

    render(<MarketplaceMetrics />);
    expect(screen.getByText('0')).toBeInTheDocument(); // Fallback to "0" values
    expect(screen.queryByText(/No data available/i)).not.toBeInTheDocument(); // Optional: ensure fallback message isn't shown
  });

  it('shows date range text when date range is selected and data exists', () => {
    (useDashboard as jest.Mock).mockReturnValue({
      clicksData: mockClicksData,
      marketplaceMetrics: [],
      dateRange: {
        startDate: '2025-01-01',
        endDate: '2025-01-31',
      },
      setDateRange: mockSetDateRange,
      loading: false,
    });

    render(<MarketplaceMetrics />);
    expect(screen.queryByText(/No data available/)).not.toBeInTheDocument();
    expect(screen.getByText(/Showing data from/)).toBeInTheDocument();
  });

  it('does not show date range text when no date range is selected', () => {
    render(<MarketplaceMetrics />);
    expect(screen.queryByText(/Showing data from/)).not.toBeInTheDocument();
  });

  it('renders correct metric titles', () => {
    render(<MarketplaceMetrics />);
    expect(screen.getByText('Clicks')).toBeInTheDocument();
    expect(screen.getByText('DPVs')).toBeInTheDocument();
    expect(screen.getByText('ATCs')).toBeInTheDocument();
    expect(screen.getByText('Conversions')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
    expect(screen.getByText('Commission')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    expect(screen.getByText('EPC')).toBeInTheDocument();
  });
});
