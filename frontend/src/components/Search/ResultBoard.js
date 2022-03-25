import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import getAxios from "../../api.js";
import PaginationBtn from "./PaginationBtn";
import { paginate } from "./paginate";
import { getDatasetAtEvent } from "react-chartjs-2";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

function ResultBoard(props) {
  const axios = getAxios();
  const [word, setWord] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchSearch = async () => {
      const request = await axios.get(`/api/welfare/search/${word}`);
      const datas = request.data.body.welfares;
      // console.log(datas);
      await setResult(datas);
      await console.log(result);
    };
    fetchSearch();
  }, [word]);

  useEffect(() => {
    setWord(props.word);
  }, [props.word]);

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
    // console.log(page);
  };
  const { data, pageSize, currentPage } = welfares;
  const pagedWelfares = paginate(data, currentPage, pageSize); // 페이지 별로 데이터가 속한 배열을 얻어옴

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
              <th width="10%">번호</th>
              <th width="70%">제목</th>
              <th width="20%">게시일</th>
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
