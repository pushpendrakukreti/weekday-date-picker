import React, { useState } from 'react';
import "./WeekdayDateRangePicker.scss";
import { formatDate, getWeekendsBetweenDates } from '../../shared/utils/dateUtils';
import Calendar from './Calendar';
import Header from './Header';
import PredefinedRanges from './PredefinedRanges';

type DateRangePickerProps = {
  onChange: (dateRange: [string, string], weekends: string[]) => void;
  predefinedRanges?: { label: string; range: [string, string] }[];
  selectedRange?: [string, string] | null;
};

const WeekdayDateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, predefinedRanges, selectedRange }) => {
  const initialStartDate = selectedRange ? selectedRange[0] : null;
  const initialEndDate = selectedRange ? selectedRange[1] : null;

  const [startDate, setStartDate] = useState<string | null>(initialStartDate);
  const [endDate, setEndDate] = useState<string | null>(initialEndDate);

  const [displayedMonths, setDisplayedMonths] = useState([
    { month: new Date().getMonth(), year: new Date().getFullYear() },
    { month: (new Date().getMonth() + 1) % 12, year: new Date().getMonth() === 11 ? new Date().getFullYear() + 1 : new Date().getFullYear() },
  ]);

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

    setDisplayedMonths([{ month: startMonth, year: startYear }, { month: (startMonth + 1) % 12, year: startMonth === 11 ? startYear + 1 : startYear }]);
  };

  const handleClearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    onChange(["", ""], []);
  };

  const handleMonthChange = (direction: number) => {
    setDisplayedMonths(prevMonths => {
      const firstMonth = { ...prevMonths[0] };
      const secondMonth = { ...prevMonths[1] };

      if (direction === 1) {
        firstMonth.month = (firstMonth.month + 1) % 12;
        if (firstMonth.month === 0) {
          firstMonth.year++;
        }

      } else if (direction === -1) {
        firstMonth.month = firstMonth.month === 0 ? 11 : firstMonth.month - 1;
        if (firstMonth.month === 11) {
          firstMonth.year--;
        }
      } else if (direction === 12) {
          firstMonth.year++;
          secondMonth.year++;
      } else if (direction === -12) {
          firstMonth.year--;
          secondMonth.year--;
      }

      secondMonth.month = (firstMonth.month + 1) % 12;
      secondMonth.year = firstMonth.month === 11 ? firstMonth.year + 1 : firstMonth.year;


      return [firstMonth, secondMonth];
    });
  };

  return (
    <div className="date-picker" role="calendar">
      <Header
        currentMonth={displayedMonths[0].month}
        currentYear={displayedMonths[0].year}
        onMonthChange={handleMonthChange}
      />
      <div className="calendars-container">
        {displayedMonths.map((monthData, index) => (
          <Calendar
            key={index}
            month={monthData.month}
            year={monthData.year}
            isSelected={isSelected}
            handleDateSelect={handleDateSelect}
          />
        ))}
      </div>
      <PredefinedRanges
        predefinedRanges={predefinedRanges}
        handlePredefinedRangeClick={handlePredefinedRangeClick}
        handleClearSelection={handleClearSelection}
      />
    </div>
  );
};

export default WeekdayDateRangePicker;
