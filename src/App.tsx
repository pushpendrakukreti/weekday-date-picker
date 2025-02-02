import React, { useState } from 'react';
import WeekdayDateRangePicker from './components/DatePicker/WeekdayDateRangePicker';

const App: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<[string, string] | null>(null);

  const handleDateRangeChange = (dateRange: [string, string], weekends: string[]) => {
    console.log('Selected Date Range:', dateRange);
    console.log('Weekends within the range:', weekends);
    setSelectedRange(dateRange);
  };

  const getDynamicDateRanges = () => {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];

    const last7DaysStart = new Date(today);
    last7DaysStart.setDate(today.getDate() - 6);
    const last7DaysStartFormatted = last7DaysStart.toISOString().split('T')[0];

    const last30DaysStart = new Date(today);
    last30DaysStart.setDate(today.getDate() - 29);
    const last30DaysStartFormatted = last30DaysStart.toISOString().split('T')[0];

    return [
      { label: 'Last 7 Days', range: [last7DaysStartFormatted, todayFormatted] },
      { label: 'Last 30 Days', range: [last30DaysStartFormatted, todayFormatted] },
    ];
  };

  const handleClearSelection = () => {
    debugger;
    setSelectedRange(null);
  };

  const predefinedRanges = getDynamicDateRanges();

  return (
    <div className="app">
      <div className='main-div'>
        <h1>Weekday Calendar</h1>
        <WeekdayDateRangePicker
          onChange={handleDateRangeChange}
          predefinedRanges={predefinedRanges}
          clearSelection={handleClearSelection}
          selectedRange={selectedRange}
        />
        {selectedRange?.[0] && (
          <div className='selected-range'>
            <span>Selected Range: </span> {selectedRange[0]} to {selectedRange[1]}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
