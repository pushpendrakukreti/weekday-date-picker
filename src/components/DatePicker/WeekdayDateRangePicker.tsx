import React, { useState } from 'react';
import "./WeekdayDateRangePicker.scss";
import { formatDate, getWeekendsBetweenDates } from '../../shared/utils/dateUtils';
import Calendar from './Calendar';
import Header from './Header';
import PredefinedRanges from './PredefinedRanges';

type DateRangePickerProps = {
  onChange: (dateRange: [string, string], weekends: string[]) => void;
  predefinedRanges?: { label: string; range: [string, string] }[];
};

const WeekdayDateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, predefinedRanges }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const isSelected = (date: Date): boolean => {
    const formattedDate = formatDate(date);
    return startDate !== null && endDate !== null
      ? formattedDate >= startDate && formattedDate <= endDate
      : formattedDate === startDate;
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    if (startDate === null || endDate !== null) {
      setStartDate(formattedDate);
      setEndDate(null);
    } else {
      if (new Date(formattedDate) >= new Date(startDate)) {
        setEndDate(formattedDate);
        handleDateChange(startDate, formattedDate);
      } else {
        setStartDate(formattedDate);
        setEndDate(null);
      }
    }
  };

  const handleDateChange = (start: string, end: string) => {
    const weekends = getWeekendsBetweenDates(start, end);
    onChange([start, end], weekends);
  };

  const handlePredefinedRangeClick = (range: { label: string; range: [string, string] }) => {
    const { range: [start, end] } = range;
    setStartDate(start);
    setEndDate(end);
    handleDateChange(start, end);

    const date = new Date(start);
    const startMonth = date.getMonth();
    const startYear = date.getFullYear();

    setCurrentMonth(startMonth);
    setCurrentYear(startYear);
  };

  const handleClearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    onChange(["", ""], []);
  };

  return (
    <div className="date-picker" role="calendar">
      <Header
        currentMonth={currentMonth}
        currentYear={currentYear}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
      />
      <Calendar
        currentMonth={currentMonth}
        currentYear={currentYear}
        isSelected={isSelected}
        handleDateSelect={handleDateSelect}
      />
      <PredefinedRanges
        predefinedRanges={predefinedRanges}
        handlePredefinedRangeClick={handlePredefinedRangeClick}
        handleClearSelection={handleClearSelection}
      />
    </div>
  );
};

export default WeekdayDateRangePicker;
