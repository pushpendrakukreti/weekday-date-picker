import React from 'react';

type HeaderProps = {
  currentMonth: number;
  currentYear: number;
  onMonthChange: (direction: number) => void;
};

const Header: React.FC<HeaderProps> = ({ currentMonth, currentYear, onMonthChange }) => {

  return (
    <div className="header">
      <div className='year-header'>
        <button className='left-icon' onClick={() => onMonthChange(-12)} aria-label="Previous Year">&lt;</button>
        <span data-testid="current-year">{currentYear}</span>
        <button className='right-icon' onClick={() => onMonthChange(12)} aria-label="Next Year">&gt;</button>
      </div>
      <div className='month-header'>
        <button className='left-icon' onClick={() => onMonthChange(-1)} aria-label="Previous Month">&lt;</button>
        <span data-testid="current-month">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}
        </span>
        <button className='right-icon' onClick={() => onMonthChange(1)} aria-label="Next Month">&gt;</button>
      </div>
    </div>
  );
};

export default Header;
