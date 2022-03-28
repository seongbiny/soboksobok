import React, { useState } from "react";
import Button from "@mui/material/Button";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { changeInput } from "../../reducers/change.js";

function SearchBar() {
  const dispatch = useDispatch();

  // const { keyword } = useSelector(state => state.change);

  const [word, setWord] = useState("");

  const onChange = e => {
    setWord(e.target.value);
    // keyword(e.target.value);
    // dispatch(changeInput(word));
  };

  const onEnter = async e => {
    if (e.key === "Enter") {
      await setWord(e.target.value);
      // await keyword(e.target.value);
      // console.log(word);
      // word props로 올려주기
      await dispatch(changeInput(word));
      await setWord("");
    }
  };
  const onClick = () => {
    // word props로 올려주기
    // console.log(word);
    dispatch(changeInput(word));
    setWord("");
  };

  return (
    <StyledContainer>
      <StyledBox>
        <input
          type="text"
          size="50"
          placeholder="검색어를 입력하세요"
          onKeyDown={onEnter}
          onChange={onChange}
          value={word}
        />
        <Button variant="contained" type="submit" onClick={onClick}>
          <BsSearch />
        </Button>
      </StyledBox>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 70vw;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  height: 10vh;
  border-radius: 20px;
  background: #eff2fa;
`;

const StyledBox = styled.div`
  display: flex;
  height: 5vh;
  width: 35vw;
  justify-content: space-between;
`;

export default SearchBar;
