import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import Axios from "../../api.js";

const StyledBox = styled.div`
  box-sizing: border-box;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  height: 30vh;
  width: 15vw;
`;

function Keyword() {
  useEffect(() => {
    Axios.get("/api/welfare/keyword")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <StyledBox>
      <div>추천 검색어</div>
      <hr />
      <ol>
        <ul>청년</ul>
        <ul>지원</ul>
      </ol>
    </StyledBox>
  );
}
export default Keyword;
