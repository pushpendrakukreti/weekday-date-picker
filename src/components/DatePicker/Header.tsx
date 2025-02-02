import React from 'react';

type HeaderProps = {
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
};

const Header: React.FC<HeaderProps> = ({ currentMonth, currentYear, setCurrentMonth, setCurrentYear }) => {

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div className="header">
      <button className='left-icon' onClick={() => setCurrentYear(currentYear - 1)} aria-label="Previous Year">&lt;</button>
      <span data-testid="current-year">{currentYear}</span>
      <button className='right-icon' onClick={() => setCurrentYear(currentYear + 1)} aria-label="Next Year">&gt;</button>
      <button className='left-icon' onClick={handlePrevMonth} aria-label="Previous Month">&lt;</button>
      <span data-testid="current-month">
        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}
      </span>
      <button className='right-icon' onClick={handleNextMonth} aria-label="Next Month">&gt;</button>
    </div>
  );
};

export default Header;
