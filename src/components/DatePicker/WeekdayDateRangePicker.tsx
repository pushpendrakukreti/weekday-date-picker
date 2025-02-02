import React, { useState } from 'react';
import "./WeekdayDateRangePicker.scss";

type DateRangePickerProps = {
  onChange: (dateRange: [string, string], weekends: string[]) => void;
  predefinedRanges?: { label: string; range: [string, string] }[];
};

const WeekdayDateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, predefinedRanges }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

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
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const weekends: string[] = [];

    startDateObj.setDate(startDateObj.getDate() + 1);
    endDateObj.setDate(endDateObj.getDate() + 1);

    const adjustedStart = formatDate(startDateObj);
    const adjustedEnd = formatDate(endDateObj);

    for (let date = new Date(startDateObj); date <= endDateObj; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends.push(formatDate(date));
      }
    }

    onChange([adjustedStart, adjustedEnd], weekends);
  };

  const handlePredefinedRangeClick = (range: { label: string; range: [string, string] }) => {
    const startDate = range.range[0];
    const endDate = range.range[1];

    setStartDate(startDate);
    setEndDate(endDate);
    handleDateChange(startDate, endDate);

    const startMonth = new Date(startDate).getMonth();
    const startYear = new Date(startDate).getFullYear();

    if (startMonth !== currentMonth || startYear !== currentYear) {
      setCurrentMonth(startMonth);
      setCurrentYear(startYear);
    }
  };

  const handleClearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    onChange(["", ""], []);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const weeks: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const weekdayHeaders = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
      <div key={`header-${index}`} className="weekday-header">
        {day}
      </div>
    ));

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<button key={`empty-${i}`} className="empty-day"></button>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      days.push(
        <button
          key={i}
          onClick={() => handleDateSelect(date)}
          className={`day ${isWeekend ? 'weekend' : ''} ${isSelected(date) && !isWeekend ? 'selected' : ''}`}
        >
          {i}
        </button>
      );

      if (dayOfWeek === 6 || i === daysInMonth) {
        weeks.push(<div key={`week-${weeks.length}`} className="week">{days}</div>);
        days = [];
      }
    }

    return (
      <div className="calendar">
        <div className="weekdays">{weekdayHeaders}</div>
        {weeks}
      </div>
    );
  };

  return (
    <div className="date-picker" role="calendar">
      <div className="header">
        <button className='left-icon' onClick={() => setCurrentYear(currentYear - 1)} aria-label="Previous Year">&lt;</button>
        <span data-testid="current-year">{currentYear}</span>
        <button className='right-icon' onClick={() => setCurrentYear(currentYear + 1)} aria-label="Next Year">&gt;</button>
      </div>
      <div className="header">
        <button className='left-icon' onClick={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)} aria-label="Previous Month">&lt;</button>
        <span data-testid="current-month">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}
        </span>
        <button className='right-icon' onClick={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)} aria-label="Next Month">&gt;</button>
      </div>
      <div>{renderCalendar()}</div>
      <div className="predefined-ranges">
        {predefinedRanges && predefinedRanges.map((range, index) => (
          <button className='btn-predefined' key={index} onClick={() => handlePredefinedRangeClick(range)}>
            {range.label}
          </button>
        ))}
        <button onClick={handleClearSelection} className="clear-selection">
          Clear Selection
        </button>
      </div>
    </div>
  );
};

export default WeekdayDateRangePicker;
