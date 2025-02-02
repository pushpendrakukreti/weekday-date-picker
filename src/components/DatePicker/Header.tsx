import React from 'react';

type HeaderProps = {
    currentMonth: number;
    currentYear: number;
    setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
    setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
};

const Header: React.FC<HeaderProps> = ({ currentMonth, currentYear, setCurrentMonth, setCurrentYear }) => {
    return (
        <div className="header">
            <button className='left-icon' onClick={() => setCurrentYear(currentYear - 1)} aria-label="Previous Year">&lt;</button>
            <span data-testid="current-year">{currentYear}</span>
            <button className='right-icon' onClick={() => setCurrentYear(currentYear + 1)} aria-label="Next Year">&gt;</button>
            <button className='left-icon' onClick={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)} aria-label="Previous Month">&lt;</button>
            <span data-testid="current-month">
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}
            </span>
            <button className='right-icon' onClick={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)} aria-label="Next Month">&gt;</button>
        </div>
    );
};

export default Header;
