# Weekday Date Range Picker

This project is a React and TypeScript-based date range picker component that allows users to select weekdays (Monday through Friday) and prevents them from selecting weekends (Saturday and Sunday). The component includes features such as selecting a date range, highlighting weekdays, changing the year and month, and handling predefined date ranges.

## Features

- **Weekday Selection**: Users can select a date range defined by a start date and an end date, ensuring both dates are weekdays (Monday to Friday).
- **Weekend Prevention**: Weekends (Saturday and Sunday) are not selectable and are visually distinguished from weekdays.
- **Year and Month Navigation**: Users can change the displayed year and month using navigation buttons.
- **Predefined Ranges**: The component supports predefined date ranges such as "Last 7 Days" and "Last 30 Days".
- **Change Handler**: The component includes a change handler that returns the selected date range and any weekend dates within that range.

## Installation

To use this component in your project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pushpendrakukreti/weekday-date-picker.git
   cd weekday-date-range-picker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the project**:
   ```bash
   npm start
   ```

## Usage

### App.tsx

The `App.tsx` file is the main entry point of the application. It renders the `WeekdayDateRangePicker` component and handles the date range change events.

```typescript
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
```

### WeekdayDateRangePicker.tsx

The `WeekdayDateRangePicker.tsx` file contains the main logic for the date range picker component. It handles date selection, navigation, and predefined ranges.

```typescript
import React, { useState } from 'react';
import "./WeekdayDateRangePicker.scss";

type DateRangePickerProps = {
  onChange: (dateRange: [string, string], weekends: string[]) => void;
  predefinedRanges?: { label: string; range: [string, string] }[];
};

const WeekdayDateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, predefinedRanges }) => {
  // State and logic for the date range picker
  // ...

  return (
    <div className="date-picker" role="calendar">
      {/* Header for year and month navigation */}
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
      {/* Calendar rendering */}
      <div>{renderCalendar()}</div>
      {/* Predefined ranges and clear selection button */}
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
```

## Styling

The component uses SCSS for styling. The `WeekdayDateRangePicker.scss` file contains the styles for the date picker, including the layout, colors, and hover effects.

```scss
.date-picker {
  // Styles for the date picker container
  // ...
}

.weekday-header {
  // Styles for the weekday headers
  // ...
}

.day {
  // Styles for the day buttons
  // ...
}

.weekend {
  // Styles for weekend days
  // ...
}

.selected {
  // Styles for selected days
  // ...
}

.predefined-ranges {
  // Styles for predefined ranges
  // ...
}

.clear-selection {
  // Styles for the clear selection button
  // ...
}
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Acknowledgments

- Inspired by the [RSuite Date Range Picker](https://rsuitejs.com/components/date-range-picker/#predefined-date-ranges).
