import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Pagination from "./Pagination";
import { paginate } from "./paginate";

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
  const getData = () => {
    const welfares = [
      { index: 1, title: "사과", date: "2022.03.22" },
      { index: 2, title: "딸기", date: "2022.03.22" },
      { index: 3, title: "토마토", date: "2022.03.22" },
      { index: 4, title: "메론", date: "2022.03.22" },
      { index: 5, title: "바나나", date: "2022.03.22" },
      { index: 6, title: "바나나", date: "2022.03.22" },
      { index: 7, title: "바나나", date: "2022.03.22" },
      { index: 8, title: "바나나", date: "2022.03.22" },
      { index: 9, title: "바나나", date: "2022.03.22" },
      { index: 10, title: "바나나", date: "2022.03.22" },
      { index: 11, title: "바나나", date: "2022.03.22" },
    ];
    return welfares;
  };
  const [welfares, setWelfares] = useState({
    data: getData(),
    pageSize: 5,
    currentPage: 1,
  });
  const handlePageChange = page => {
    setWelfares({ ...welfares, currentPage: page });
  };
  const { data, pageSize, currentPage } = welfares;
  const pagedWelfares = paginate(data, currentPage, pageSize);

  const { length: count } = welfares.data;
  if (count === 0) {
    return <p>검색 정보가 없습니다.</p>;
  }
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
            {pagedWelfares.map(welfare => (
              <tr key={welfare.index}>
                <td>{welfare.index}</td>
                <td>{welfare.title}</td>
                <td>{welfare.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledTable>
      <StyledPage>
        {/* <Stack spacing={2}>
          <Pagination count={10} color="primary" />
        </Stack> */}
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </StyledPage>
    </StyledBoard>
  );
}
export default ResultBoard;
