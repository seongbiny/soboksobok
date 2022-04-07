import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeInput } from "../../reducers/change.js";
import { useNavigate } from "react-router-dom";
import NewsTicker from "react-advanced-news-ticker";
import styled from "styled-components";
import { getAxios } from "../../api";

function SearchBar() {
  const axios = getAxios();
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  const onChange = e => {
    setWord(e.target.value);
  };

  const onEnter = async e => {
    if (e.key === "Enter") {
      await setWord(e.target.value);
      await dispatch(changeInput(word));
      navigate(`/search?keyword=${word}`);
      await setWord("");
    }
  };

  const onClick = () => {
    dispatch(changeInput(word));
    navigate(`/search?keyword=${word}`);
    setWord("");
  };

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const request = await axios.get("/api/welfare/keyword");
        setKeywords(request.data.body.keywords.slice(0, 10));
        console.log(request.data.body.keywords.slice(0, 10));
        // console.log(keywords[0].keywordName);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWord();
  }, []);

  return (
    <div className="searchBar">
      <StyledSearchArea>
        <div style={{ display: "grid" }}>
          <div>인기검색어</div>
          {keywords.length === 10 ? (
            <NewsTicker
              rowHeight={24}
              rowWidth={80}
              maxRows={1}
              speed={600}
              duration={4000}
              autoStart={true}
              pauseOnHover={true}
              style={{
                background: "white",
                fontFamily: "Noto Sans KR",
                listStyleType: "none",
                paddingLeft: "5px",
              }}
            >
              <div>1.{keywords[0].keywordName}</div>
              <div>2.{keywords[1].keywordName}</div>
              <div>3.{keywords[2].keywordName}</div>
              <div>4.{keywords[3].keywordName}</div>
              <div>5.{keywords[4].keywordName}</div>
              <div>6.{keywords[5].keywordName}</div>
              <div>7.{keywords[6].keywordName}</div>
              <div>8.{keywords[7].keywordName}</div>
              <div>9.{keywords[8].keywordName}</div>
              <div>10.{keywords[9].keywordName}</div>
            </NewsTicker>
          ) : (
            <div></div>
          )}
        </div>

        <Form.Control
          className="me-auto"
          placeholder="검색어를 입력하세요"
          onKeyDown={onEnter}
          onChange={onChange}
          value={word}
          style={{ margin: "0 2% 0 2%" }}
        />
        <Button
          variant="primary"
          type="submit"
          onClick={onClick}
          style={{
            width: "70px",
            // margin: '0 2%'
          }}
        >
          검색
        </Button>
      </StyledSearchArea>
    </div>
  );
}

const StyledSearchArea = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default SearchBar;
