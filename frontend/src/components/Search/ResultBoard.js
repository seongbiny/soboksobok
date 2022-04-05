import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import { getAxios } from "../../api.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaginationBtn from "./PaginationBtn";
import { paginate } from "./paginate";
import _ from "lodash";

function ResultBoard() {
  const axios = getAxios();
  const { keyword } = useSelector(state => state.change);
  const navigate = useNavigate();

  const getData = () => {
    const welfares = [
      { index: 1, title: "사과", date: "2022.03.22" },
      { index: 2, title: "딸기", date: "2022.03.22" },
      { index: 3, title: "토마토", date: "2022.03.22" },
      { index: 4, title: "메론", date: "2022.03.22" },
      { index: 5, title: "바나나", date: "2022.03.22" },
      { index: 6, title: "바나나", date: "2022.03.22" },
      { index: 7, title: "바나나", date: "2022.03.22" },
      { index: 8, title: "사과", date: "2022.03.22" },
      { index: 9, title: "딸기", date: "2022.03.22" },
      { index: 10, title: "토마토", date: "2022.03.22" },
      { index: 11, title: "메론", date: "2022.03.22" },
      { index: 12, title: "바나나", date: "2022.03.22" },
      { index: 13, title: "바나나", date: "2022.03.22" },
      { index: 14, title: "바나나", date: "2022.03.22" },
      { index: 15, title: "바나나", date: "2022.03.22" },
      { index: 16, title: "바나나", date: "2022.03.22" },
      { index: 17, title: "바나나", date: "2022.03.22" },
      { index: 18, title: "바나나", date: "2022.03.22" },
      { index: 19, title: "사과", date: "2022.03.22" },
      { index: 20, title: "딸기", date: "2022.03.22" },
      { index: 21, title: "토마토", date: "2022.03.22" },
      { index: 22, title: "메론", date: "2022.03.22" },
      { index: 23, title: "바나나", date: "2022.03.22" },
      { index: 24, title: "바나나", date: "2022.03.22" },
      { index: 25, title: "바나나", date: "2022.03.22" },
      { index: 26, title: "바나나", date: "2022.03.22" },
      { index: 27, title: "바나나", date: "2022.03.22" },
      { index: 28, title: "바나나", date: "2022.03.22" },
      { index: 29, title: "바나나", date: "2022.03.22" },
      { index: 30, title: "사과", date: "2022.03.22" },
      { index: 31, title: "딸기", date: "2022.03.22" },
      { index: 32, title: "메론", date: "2022.03.22" },
      { index: 33, title: "바나나", date: "2022.03.22" },
      { index: 34, title: "바나나", date: "2022.03.22" },
      { index: 35, title: "바나나", date: "2022.03.22" },
      { index: 36, title: "바나나", date: "2022.03.22" },
      { index: 37, title: "바나나", date: "2022.03.22" },
      { index: 38, title: "바나나", date: "2022.03.22" },
      { index: 39, title: "바나나", date: "2022.03.22" },
      { index: 40, title: "사과", date: "2022.03.22" },
      { index: 41, title: "딸기", date: "2022.03.22" },
      { index: 42, title: "토마토", date: "2022.03.22" },
      { index: 43, title: "메론", date: "2022.03.22" },
      { index: 44, title: "바나나", date: "2022.03.22" },
      { index: 45, title: "바나나", date: "2022.03.22" },
      { index: 46, title: "바나나", date: "2022.03.22" },
      { index: 47, title: "사과", date: "2022.03.22" },
      { index: 48, title: "딸기", date: "2022.03.22" },
      { index: 49, title: "토마토", date: "2022.03.22" },
      { index: 50, title: "메론", date: "2022.03.22" },
      { index: 51, title: "바나나", date: "2022.03.22" },
      { index: 52, title: "바나나", date: "2022.03.22" },
      { index: 53, title: "바나나", date: "2022.03.22" },
      { index: 54, title: "바나나", date: "2022.03.22" },
      { index: 55, title: "바나나", date: "2022.03.22" },
    ];
    return welfares;
  };

  const [welfares, setWelfares] = useState({
    data: getData(),
    pageSize: 10, // 한 페이지에 보여줄 데이터 개수
    currentPage: 1, // 현재 활성화된 페이지 위치
  });

  const handlePageChange = page => {
    setWelfares({ ...welfares, currentPage: page });
    console.log(page);
  };

  const { data, pageSize, currentPage } = welfares;
  const pagedWelfares = paginate(data, currentPage, pageSize); // 페이지 별로 데이터가 속한 배열을 얻어옴

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const request = await axios.get(`/api/welfare/search/${keyword}`);
        navigate(`/search?keyword=${keyword}`);
        // setResult(request.data);
        setWelfares({ ...welfares, data: request.data });
        console.log(request.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSearch();
  }, [keyword]);

  const onClick = id => {
    navigate(`/welfare/${id}`);
  };

  // const { length: count } = result;
  const { length: count } = data;
  if (count === 0) {
    return <StyledNo>검색 정보가 없습니다.</StyledNo>;
  }

  return (
    <StyledBoard>
      <StyledTable>
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th width="10%">번호</th>
              <th width="70%">제목</th>
              <th width="20%">조회수</th>
            </tr>
          </thead>
          <tbody>
            {pagedWelfares.map(welfare => (
              <tr key={welfare[0]}>
                <td>{welfare[0]}</td>
                <td>{welfare[1]}</td>
                <td>{welfare[2]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledTable>
      <StyledPage>
        <PaginationBtn
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </StyledPage>
    </StyledBoard>
  );
}
const StyledNo = styled.div`
  box-sizing: border-box;
  width: 50vw;
  height: 50vh;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  margin: auto;
  // display: flex;
  line-height: 50vh;
  text-align: center;
  font-weight: bold;
`;

const StyledPage = styled.div`
  margin: 0 auto;
  margin-top: 10px;
`;

const StyledBoard = styled.div`
  box-sizing: border-box;
  width: 50vw;
  display: flex;
  flex-direction: column;
`;
const StyledTable = styled.div`
  box-sizing: border-box;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
`;

const StyledTd = styled.td`
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

export default ResultBoard;
