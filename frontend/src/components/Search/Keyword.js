import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getAxios from "../../api.js";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { changeInput } from "../../reducers/change.js";

function Keyword() {
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();
  const axios = getAxios();

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const request = await axios.get("/api/welfare/keyword");
        setKeywords(request.data.body.keywords.slice(0, 10));
      } catch (err) {
        console.log(err);
      }
    };
    fetchWord();
  }, []);

  const onClick = word => {
    dispatch(changeInput(word));
    navigate(`/search?keyword=${word}`);
  };

  return (
    <StyledBox>
      <div
        style={{
          background: "#E7F0FD",
          width: "100%",
          height: "100%",
          lineHeight: "8vh",
          borderRadius: "15px 15px 0px 0px",
        }}
      >
        인기 검색어
      </div>
      <div></div>
      {keywords.map((keyword, i) => (
        <StyledLi>
          <div style={{ flexBasis: "30%" }}>{i + 1}</div>
          <div
            key={keyword.keywordId}
            style={{ flexBasis: "70%", textAlign: "left" }}
            onClick={e => onClick(keyword.keywordName)}
          >
            {keyword.keywordName}
          </div>
        </StyledLi>
      ))}
      <div></div>
      <div></div>
    </StyledBox>
  );
}
const StyledBox = styled.div`
  box-sizing: border-box;
  border: 1px solid #e9ecef;
  height: 50vh;
  width: 15vw;
  text-align: center;
  display: grid;
  align-items: center;
  border-radius: 15px;
  grid-template-rows: 8vh;
`;
const StyledLi = styled.div`
  box-sizing: border-box;
  display: flex;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;
export default Keyword;
