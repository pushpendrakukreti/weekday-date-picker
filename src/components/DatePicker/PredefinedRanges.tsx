import React from 'react';

type PredefinedRangesProps = {
  predefinedRanges?: { label: string; range: [string, string] }[];
  handlePredefinedRangeClick: (range: { label: string; range: [string, string] }) => void;
  handleClearSelection: () => void;
};

const PredefinedRanges: React.FC<PredefinedRangesProps> = ({ predefinedRanges, handlePredefinedRangeClick, handleClearSelection }) => {
  return (
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
  );
};

export default PredefinedRanges;
