import React from 'react';
import { format } from 'date-fns';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onDateChange }) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(startDate, e.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      <div>
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={handleStartDateChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={handleEndDateChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;