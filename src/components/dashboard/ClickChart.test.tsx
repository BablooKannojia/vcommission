import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ClicksChart from './ClicksChart';
import { useDashboard } from '../../context/dashboardContext';

// Mock chart.js canvas since JSDOM doesn't support <canvas>
jest.mock('react-chartjs-2', () => ({
  Line: ({ data }: any) => <div data-testid="line-chart">{JSON.stringify(data)}</div>,
  Bar: ({ data }: any) => <div data-testid="bar-chart">{JSON.stringify(data)}</div>,
}));

// Mock dashboard context
jest.mock('../../context/dashboardContext', () => ({
  useDashboard: jest.fn(),
}));

const mockData = [
  {
    month: 'Jan',
    clicks: 100,
    dpv: 80,
    atc: 50,
    conversion: 10,
    sales: 300,
    commission: 30,
  },
  {
    month: 'Feb',
    clicks: 200,
    dpv: 160,
    atc: 100,
    conversion: 25,
    sales: 600,
    commission: 60,
  },
];

describe('ClicksChart component', () => {
  beforeEach(() => {
    (useDashboard as jest.Mock).mockReturnValue({
      clicksData: mockData,
      loading: false,
    });
  });


    it('renders Clicks tab and bar chart by default', () => {
        render(<ClicksChart />);

        // Confirm default tab
        expect(screen.getByRole('button', { name: 'Clicks' })).toBeInTheDocument();

        // Check correct heading
        expect(screen.getByRole('heading', { name: 'Clicks' })).toBeInTheDocument();

        // Check chart rendering
        expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
        expect(screen.queryByTestId('line-chart')).not.toBeInTheDocument();
    });

  it('renders loading state when loading is true', () => {
    (useDashboard as jest.Mock).mockReturnValueOnce({ clicksData: [], loading: true });
    render(<ClicksChart />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('switches to DPVs tab and renders line chart', async () => {
    render(<ClicksChart />);
    fireEvent.click(screen.getByText('DPVs'));

    await waitFor(() => {
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { name: 'DPVs' })).toBeInTheDocument();

  });

  it('switches to Sales and displays correct data in line chart', async () => {
    render(<ClicksChart />);
    fireEvent.click(screen.getByText('Sales'));

    await waitFor(() => {
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Sales' })).toBeInTheDocument();
    });
  });

  it('switches to Commission and renders correctly', async () => {
    render(<ClicksChart />);
    fireEvent.click(screen.getByText('Commission'));

    await waitFor(() => {
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { name: 'Commission' })).toBeInTheDocument();
  });
});
