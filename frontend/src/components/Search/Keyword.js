import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getAxios from "../../api.js";

const StyledBox = styled.div`
  box-sizing: border-box;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  height: 30vh;
  width: 15vw;
`;

function Keyword() {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const axios = getAxios();
    axios
      .get("/api/welfare/keyword")
      .then(res => {
        // console.log(res.data.body.keywords.slice(0, 5));
        setKeywords(res.data.body.keywords.slice(0, 5));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <StyledBox>
      <div>추천 검색어</div>
      <hr />
      <ol>
        {keywords.map(keyword => (
          <li key={keyword.keywordId}>{keyword.keywordName}</li>
        ))}
      </ol>
    </StyledBox>
  );
}
export default Keyword;
