import React from 'react';
import WeekdayDateRangePicker from './components/DatePicker/WeekdayDateRangePicker';

const App: React.FC = () => {
  const handleDateRangeChange = (dateRange: [string, string], weekends: string[]) => {
    console.log('Selected Date Range:', dateRange);
    console.log('Weekends within the range:', weekends);
  };

  const getDynamicDateRanges = () => {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];

    const last7DaysStart = new Date(today);
    last7DaysStart.setDate(today.getDate() - 6); // 7 days including today, so subtract 6
    const last7DaysStartFormatted = last7DaysStart.toISOString().split('T')[0];

    const last30DaysStart = new Date(today);
    last30DaysStart.setDate(today.getDate() - 29); // 30 days including today, so subtract 29
    const last30DaysStartFormatted = last30DaysStart.toISOString().split('T')[0];

    return [
      { label: 'Last 7 Days', range: [last7DaysStartFormatted, todayFormatted] },
      { label: 'Last 30 Days', range: [last30DaysStartFormatted, todayFormatted] },
    ];
  };

  const predefinedRanges = getDynamicDateRanges();

  return (
    <div className='app'>
      <div className='main-div'>
        <h1>Weekday Calendar</h1>
        <WeekdayDateRangePicker onChange={handleDateRangeChange} predefinedRanges={predefinedRanges} />
      </div>
    </div>
  );
};

export default App;
