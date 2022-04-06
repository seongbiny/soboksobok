import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeInput } from '../../reducers/change.js';
import { useNavigate } from 'react-router-dom';
import NewsTicker from 'react-advanced-news-ticker';
import styled from 'styled-components';

function SearchBar({ keywords }) {
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
    <div className="searchBar">
      <StyledSearchArea>
        {/* {keywords !== null ? (
          <NewsTicker
            className="scoll"
            maxRows={1}
            speed={600}
            duration={4000}
            pauseOnHover={false}
          >
            {keywords.map((keyword, i) => (
              <div className={i} key={i}>
                <span>{i + 1} </span>
                {keyword.keywordName}
              </div>
            ))}
          </NewsTicker>
        ) : (
          <div></div>
        )} */}

        <Form.Control
          className="me-auto"
          placeholder="검색어를 입력하세요"
          onKeyDown={onEnter}
          onChange={onChange}
          value={word}
          style={{ margin: '0 2% 0 2%' }}
        />
        <Button
          variant="primary"
          type="submit"
          onClick={onClick}
          style={{
            width: '70px',
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
