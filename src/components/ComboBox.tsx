// ComboBox.js
import React, { useEffect, useState } from 'react';
import { get_genres } from '../api/requests';
import { Genre } from '../types/types';

interface ComboBoxProps {
  onIndexChange: (index: number) => void;
}

function ComboBox({ onIndexChange }: ComboBoxProps) {
  const [selectedValue, setSelectedValue] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    get_genres().then((res) => {
      setGenres(res?.data);
    });
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    const selectedIndex = event.target.selectedIndex;
    onIndexChange(selectedIndex);
  };

  return (
    <div>
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        className="rounded-sm hover:bg-[#2a2a2a] py-1 pl-2 pr-3 bg-[#242424] text-white placeholder-[#727475] w-full border-none hover:ring-1 hover:ring-[#343434] focus:ring-2 focus:ring-white"
      >
        {genres.map((genre, index) => (
          <option value={genre.ID_Genre} key={index}>
            {genre.Genre_Name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ComboBox;
