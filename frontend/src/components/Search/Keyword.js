import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  box-sizing: border-box;
  border: 1px solid gray;
  height: 30vh;
  width: 15vw;
`;

function Keyword() {
  return (
    <StyledBox>
      <div>추천 검색어</div>
      <hr />
      <ol>
        <ul>청년</ul>
        <ul>지원</ul>
      </ol>
    </StyledBox>
  );
}
export default Keyword;
