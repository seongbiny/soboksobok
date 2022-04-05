import React from 'react';
import FilterChips from '../components/FilterChips';
import styled from 'styled-components';
import LoginModal from '../components/LoginModal';

function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}

function CustomFilter() {
  return (
    <StyledContainer>
      {isLogin() ? (
        <StyledFilterBox>
          <FilterChips></FilterChips>
        </StyledFilterBox>
      ) : (
        <LoginModal></LoginModal>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: grid;
  font-family: 'Noto Sans KR', sans-serif;
`;

const StyledFilterBox = styled.div`
  display: flex;
  padding: 10% 10%;
  width: 100vw;
  height: 100vh;
  background-image: url('/background/layered-waves-haikei.svg');
`;

export default CustomFilter;
