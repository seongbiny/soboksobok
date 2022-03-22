import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "react-bootstrap/Table";
import axios from "axios";

const StyledBoard = styled.div`
  box-sizing: border-box;
  width: 50vw;
  display: flex;
  flex-direction: column;
`;
const StyledPage = styled.div`
  margin: 0 auto;
  margin-top: 10px;
`;
const StyledTable = styled.div`
  box-sizing: border-box;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
`;

function ResultBoard() {
  const obj = {
    data: [
      { index: 1, title: "사과", date: "2022.03.22" },
      { index: 2, title: "딸기", date: "2022.03.22" },
      { index: 3, title: "토마토", date: "2022.03.22" },
      { index: 4, title: "메론", date: "2022.03.22" },
      { index: 5, title: "바나나", date: "2022.03.22" },
    ],
  };

  return (
    <StyledBoard>
      <StyledTable>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>게시일</th>
            </tr>
          </thead>
          <tbody>
            {obj.data.map(item => {
              return (
                <tr key={item.index}>
                  <td>{item.index}</td>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </StyledTable>
      <StyledPage>
        <Stack spacing={2}>
          <Pagination count={10} color="primary" />
        </Stack>
      </StyledPage>
    </StyledBoard>
  );
}
export default ResultBoard;
