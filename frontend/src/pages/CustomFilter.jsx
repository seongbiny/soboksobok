import React from 'react';

import FilterChips from '../components/FilterChips';

import styled from 'styled-components';

const 소개 = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #e3f2fd;
`;

function CustomFilter() {
  return (
    <div>
      <소개>
        <FilterChips></FilterChips>
      </소개>
    </div>
  );
}

export default CustomFilter;
