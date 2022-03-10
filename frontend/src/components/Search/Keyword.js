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
      <div>keyword</div>
    </StyledBox>
  );
}
export default Keyword;
