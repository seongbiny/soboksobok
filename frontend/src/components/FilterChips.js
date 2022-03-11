import React, { useState } from 'react';
import MultipleSelectChips from '../MultipleSelectChips.js';

function FilterChips(params) {
  const [g_value, setGenderValue] = useState([]);
  const [value, setValue] = useState([]);
  const [error, setError] = useState('');
  const gender = [
    { label: '남성', g_value: 1 },
    { label: '여성', g_value: 2 },
  ];
  const age_range = [
    { label: '어린이 (0-9)', value: 1 },
    { label: '청소년 (10-19)', value: 2 },
    { label: '청년 (20-29)', value: 3 },
    { label: '중/장년 (30-39, 40-49, 50-59)', value: 4 },
    { label: '노년 (60-)', value: 5 },
  ];

  return (
    <div>
      <MultipleSelectChips
        label="성별"
        value={g_value}
        setValue={setGenderValue}
        options={gender}
        error={error}
        setError={setError}
      />
      <MultipleSelectChips
        label="연령대"
        value={value}
        setValue={setValue}
        options={age_range}
        error={error}
        setError={setError}
      />
    </div>
  );
}

export default FilterChips;
