import React from 'react';
import { isWeekend } from '../../shared/utils/dateUtils';

type CalendarProps = {
    currentMonth: number;
    currentYear: number;
    isSelected: (date: Date) => boolean;
    handleDateSelect: (date: Date) => void;
};

const Calendar: React.FC<CalendarProps> = ({ currentMonth, currentYear, isSelected, handleDateSelect }) => {
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

        days.push(
            <button
                key={i}
                onClick={() => handleDateSelect(date)}
                className={`day ${isWeekend(date) ? 'weekend' : ''} ${isSelected(date) && !isWeekend(date) ? 'selected' : ''}`}
            >
                {i}
            </button>
        );

        if (date.getDay() === 6 || i === daysInMonth) {
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

export default Calendar;
