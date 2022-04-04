import React from 'react';
import FilterChips from '../components/FilterChips';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #e3f2fd;
`;

function CustomFilter() {
  return (
    <StyledContainer>
      <FilterChips></FilterChips>
    </StyledContainer>
  );
}

export default CustomFilter;
