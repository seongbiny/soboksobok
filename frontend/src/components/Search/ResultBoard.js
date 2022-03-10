import React from "react";
import styled from "styled-components";
import Pagination from "react-bootstrap/Pagination";

const StyledBoard = styled.div`
  box-sizing: border-box;
  border: 1px solid gray;
  height: 50vh;
  width: 50vw;
`;

function ResultBoard() {
  return (
    <StyledBoard>
      <Pagination size="sm">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item active>{5}</Pagination.Item>
        <Pagination.Item>{6}</Pagination.Item>
        <Pagination.Item>{7}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </StyledBoard>
  );
}
export default ResultBoard;
