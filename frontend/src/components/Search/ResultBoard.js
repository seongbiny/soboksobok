import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import getAxios from "../../api.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Paging.css";
import Pagination from "react-js-pagination";

function ResultBoard() {
  const axios = getAxios();
  const [result, setResult] = useState([]);
  const { keyword } = useSelector(state => state.change);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handlePageChange = page => {
    setPage(page);
    console.log(page);
  };

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const request = await axios.get(`/api/welfare/search/${keyword}`);
        navigate(`/search?keyword=${keyword}`);
        setResult(request.data.body.welfares);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSearch();
  }, [keyword]);

  const onClick = id => {
    navigate(`/welfare/${id}`);
  };

  const { length: count } = result;
  if (count === 0) {
    return <p>검색 정보가 없습니다.</p>;
  }

  return (
    <StyledBoard>
      <StyledTable>
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th width="10%">번호</th>
              <th width="70%">제목</th>
              <th width="20%">연락처</th>
            </tr>
          </thead>
          <tbody>
            {result.map(welfare => (
              <tr key={welfare.welfareId}>
                <td className="text-center">{welfare.welfareId}</td>
                <StyledTd onClick={e => onClick(welfare.welfareId)}>
                  {welfare.welfare_service_name}
                </StyledTd>
                <td className="text-center">{welfare.welfare_phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledTable>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={handlePageChange}
      />
    </StyledBoard>
  );
}

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
