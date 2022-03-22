import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import MultipleSelectChips from '../MultipleSelectChips.js';

function FilterChips() {
  const [value, setValue] = useState([]);
  const [error, setError] = useState('');
  const gender = [
    { label: '남성', value: 1 },
    { label: '여성', value: 2 },
  ];
  const age_range = [
    { label: '어린이 (0-9)', value: 3 },
    { label: '청소년 (10-19)', value: 4 },
    { label: '청년 (20-29)', value: 5 },
    { label: '중/장년 (30-39, 40-49, 50-59)', value: 6 },
    { label: '노년 (60-)', value: 7 },
  ];
  const region = [
    { label: '전국', value: 8 },
    { label: '광주', value: 9 },
    { label: '광주 광산구', value: 10 },
    { label: '광주 남구', value: 11 },
    { label: '광주 동구', value: 12 },
    { label: '광주 북구', value: 13 },
    { label: '광주 서구', value: 14 },
  ];
  const job = [
    { label: '학생', value: 15 },
    { label: '무직 (실업자(취업희망자))', value: 16 },
    { label: '창업(영세자영업(창업)자)', value: 17 },
    { label: '농어업인', value: 18 },
    { label: '중소기업(저소득근로자)', value: 19 },
    { label: '일반', value: 20 },
  ];
  const child = [
    { label: '있음(출산예정/ 입양예정)', value: 21 },
    { label: '없음', value: 22 },
  ];
  const family = [
    { label: '무주택자', value: 23 },
    { label: '임산부', value: 24 },
    { label: '미취학', value: 25 },
    { label: '다문화/탈북민', value: 26 },
    { label: '다자녀', value: 27 },
    { label: '보훈대상자', value: 28 },
    { label: '장애인', value: 29 },
    { label: '저소득', value: 30 },
    { label: '한부모/조손', value: 31 },
    { label: '신용불량자', value: 32 },
    { label: '독거노인', value: 33 },
    { label: '저취약계층소득', value: 34 },
  ];

  return (
    <div>
      <MultipleSelectChips
        label="성별"
        value={value}
        setValue={setValue}
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

      {/* <Form.Select aria-label="Default select example">
        <option>지역 선택</option>
        <option value="1">전국</option>
        <option value="2">광주</option>
      </Form.Select>

      <Form.Select aria-label="Default select example">
        <option>구 선택</option>
        <option value="1">광산구</option>
        <option value="2">남구</option>
        <option value="3">동구</option>
        <option value="4">북구</option>
        <option value="5">서구</option>
      </Form.Select> */}

      <MultipleSelectChips
        label="지역"
        value={value}
        setValue={setValue}
        options={region}
        error={error}
        setError={setError}
      />
      <MultipleSelectChips
        label="대상특성"
        value={value}
        setValue={setValue}
        options={job}
        error={error}
        setError={setError}
      />
      <MultipleSelectChips
        label="자녀유무"
        value={value}
        setValue={setValue}
        options={child}
        error={error}
        setError={setError}
      />
      <MultipleSelectChips
        label="가구특성"
        value={value}
        setValue={setValue}
        options={family}
        error={error}
        setError={setError}
      />
    </div>
  );
}

export default FilterChips;
