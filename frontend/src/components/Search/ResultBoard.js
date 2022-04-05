import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import { getAxios } from "../../api.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaginationBtn from "./PaginationBtn";
import { paginate } from "./paginate";

function ResultBoard() {
  const axios = getAxios();
  const { keyword } = useSelector(state => state.change);
  const navigate = useNavigate();

  const [welfares, setWelfares] = useState({
    data: "",
    pageSize: 10, // 한 페이지에 보여줄 데이터 개수
    currentPage: 1, // 현재 활성화된 페이지 위치
  });

  const handlePageChange = page => {
    setWelfares({ ...welfares, currentPage: page });
    // console.log(page);
  };

  const { data, pageSize, currentPage } = welfares;
  const pagedWelfares = paginate(data, currentPage, pageSize); // 페이지 별로 데이터가 속한 배열을 얻어옴

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const request = await axios.get(`/api/welfare/search/${keyword}`);
        navigate(`/search?keyword=${keyword}`);
        setWelfares({ ...welfares, data: request.data });
        // console.log(request.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSearch();
  }, [keyword]);

  const onClick = id => {
    navigate(`/welfare/${id}`);
  };

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
                <StyledTd onClick={e => onClick(welfare[0])}>
                  {welfare[1]}
                </StyledTd>
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
  margin-bottom: 5vh;
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
