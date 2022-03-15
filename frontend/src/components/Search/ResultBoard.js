import React from "react";
import styled from "styled-components";
// import Pagination from "react-bootstrap/Pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const StyledBoard = styled.div`
  box-sizing: border-box;
  border: 1px solid gray;
  height: 50vh;
  width: 50vw;
`;

function ResultBoard() {
  return (
    <StyledBoard>
      <Stack spacing={2}>
        <Pagination count={10} color="primary" />
      </Stack>
    </StyledBoard>
  );
}
export default ResultBoard;
