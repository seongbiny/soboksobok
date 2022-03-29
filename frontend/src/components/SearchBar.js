import React, { useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";

import styled from "styled-components";

import { useDispatch } from "react-redux";
import { changeInput } from "../reducers/change.js";
import { useNavigate } from "react-router-dom";

const 박스 = styled.div`
  padding: 20px;
`;

function SearchBar() {
  const dispatch = useDispatch();
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

  return (
    <div>
      <박스>
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            className="me-auto"
            placeholder="궁금한 복지를 검색해보세요..."
            onKeyDown={onEnter}
            onChange={onChange}
            value={word}
          />
          <Button variant="primary" type="submit" onClick={onClick} size="sm">
            검색
          </Button>
        </Stack>
      </박스>
    </div>
  );
}

export default SearchBar;
