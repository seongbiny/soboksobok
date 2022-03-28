import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import getAxios from "../../api.js";
import PaginationBtn from "./PaginationBtn";
import { paginate } from "./paginate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ResultBoard() {
  const axios = getAxios();
  const [result, setResult] = useState([]);
  const { keyword } = useSelector(state => state.change);
  const [id, setId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearch = async () => {
      const request = await axios.get(`/api/welfare/search/${keyword}`);
      setResult(request.data.body.welfares);
    };
    fetchSearch();
  }, [keyword]);

  const onClick = (id, e) => {
    navigate(`/welfare/${id}`);
    // console.log(id, e);
  };

  return (
    <StyledBoard>
      <StyledTable>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th width="10%">번호</th>
              <th width="70%">제목</th>
              <th width="20%">연락처</th>
            </tr>
          </thead>
          <tbody>
            {result.map(welfare => (
              <tr
                key={welfare.welfareId}
                onClick={e => onClick(welfare.welfareId, e)}
              >
                <td>{welfare.welfareId}</td>
                <td>{welfare.welfare_service_name}</td>
                <td>{welfare.welfare_phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledTable>
      <StyledPage>
        {/* <PaginationBtn
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        /> */}
      </StyledPage>
    </StyledBoard>
  );
}

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
export default ResultBoard;
