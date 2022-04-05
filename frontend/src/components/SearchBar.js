import React, { useState } from 'react';
import { Form, Button, Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeInput } from '../reducers/change.js';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const dispatch = useDispatch();
  const [word, setWord] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setWord(e.target.value);
  };

  const onEnter = async (e) => {
    if (e.key === 'Enter') {
      await setWord(e.target.value);
      await dispatch(changeInput(word));
      navigate(`/search?keyword=${word}`);
      await setWord('');
    }
  };

  const onClick = () => {
    dispatch(changeInput(word));
    navigate(`/search?keyword=${word}`);
    setWord('');
  };

  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          className="me-auto"
          placeholder="검색어를 입력하세요"
          onKeyDown={onEnter}
          onChange={onChange}
          value={word}
        />
        <Button variant="primary" type="submit" onClick={onClick} style={{ width: '100px' }}>
          검색
        </Button>
      </Stack>
    </div>
  );
}

export default SearchBar;
