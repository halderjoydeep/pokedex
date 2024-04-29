'use client';
import { useState } from 'react';

interface SortIconProps {
  onSortChange: (value: string) => void;
}

const Sort = ({ onSortChange }: SortIconProps) => {
  const [selectedOption, setSelectedOption] = useState('default');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    onSortChange(e.target.value);
  };

  return (
    <select
      id="sortingDropdown"
      value={selectedOption}
      onChange={handleSortChange}
      className="px-3 py-2 rounded-md"
    >
      <option value="default">Default</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  );
};

export default Sort;
