import React from "react";
import Button from "react-bootstrap/Button";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const StyledContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 70vw;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  height: 10vh;
  border-radius: 20px;
  background: #eff2fa;
`;

const StyledBox = styled.div`
  display: flex;
  height: 5vh;
  width: 35vw;
  justify-content: space-between;
`;

function SearchBar() {
  return (
    <StyledContainer>
      <StyledBox>
        <input type="text" size="50" placeholder="검색어를 입력하세요" />
        <Button variant="primary">
          <BsSearch />
        </Button>
      </StyledBox>
    </StyledContainer>
  );
}
export default SearchBar;
