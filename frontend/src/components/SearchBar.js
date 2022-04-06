import React, { useEffect, useState } from 'react';
import { Form, Button, Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeInput } from '../reducers/change.js';
import { useNavigate } from 'react-router-dom';
import NewsTicker, { Directions } from 'react-advanced-news-ticker';

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

  // const newsTicker = (timer) => {
  //   const $ul = document.querySelector('ul');

  //   window.setInterval(() => {
  //     $ul.style.transitionDuration = '400ms';
  //     $ul.style.marginTop = '-34px';

  //     window.setTimeout(() => {
  //       $ul.style.transitionDuration = '';
  //       $ul.style.marginTop = '';
  //       // send the first element to the back 400ms later.
  //       $ul.appendChild($ul.querySelector('li:first-child'));
  //     }, 400);
  //   }, timer);
  // };

  // newsTicker(1500);
  // useEffect(() => {
  // }, []);

  return (
    <div className="searchBar">
      <div>
        {keywords.map((keyword, i) => (
          <div onClick={(e) => onClick(keyword.keywordName)}>
            <span>{i + 1} </span>
            {keyword.keywordName}
          </div>
        ))}
      </div>
      <Stack direction="horizontal" gap={3}>
        {/* <ul
          className="rolling"
          style={{ width: '300px', height: '34px', overflow: 'hidden', border: '1px solid #bbb' }}
        >
          {keywords.map((keyword, i) => (
            <li
              className="rolling__list"
              style={{ height: '34px', padding: '0 1rem', lineHeight: '34px' }}
              onClick={(e) => onClick(keyword.keywordName)}
            >
              <span>{i + 1}. </span>
              {keyword.keywordName}
            </li>
          ))}
        </ul> */}
        <NewsTicker
          className="scoll"
          maxRows={1}
          speed={600}
          duration={4000}
          pauseOnHover={false}
          style={{
            width: '150px',
            height: '100px',
            border: '1px solid #bbb',
          }}
        >
          {keywords.map((keyword, i) => (
            <div key={i} onClick={(e) => onClick(keyword.keywordName)}>
              <span>{i + 1} </span>
              {keyword.keywordName}
            </div>
          ))}
        </NewsTicker>
        <Form.Control
          className="me-auto"
          placeholder="검색어를 입력하세요"
          onKeyDown={onEnter}
          onChange={onChange}
          value={word}
          // style={{ width: '500px' }}
        />
        <Button variant="primary" type="submit" onClick={onClick} style={{ width: '70px' }}>
          검색
        </Button>
      </Stack>
    </div>
  );
}

export default SearchBar;
