import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeInput } from '../../reducers/change.js';
import { useNavigate } from 'react-router-dom';
import NewsTicker from 'react-advanced-news-ticker';
import styled from 'styled-components';
import { getAxios } from '../../api';

function SearchBar() {
  const axios = getAxios();
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState([]);
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

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const request = await axios.get('/api/welfare/keyword');
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
        <StyledNewsTicker>
          <div
            style={{
              width: '200px',
              background: 'white',
              fontFamily: 'Noto Sans KR',
              fontSize: '13px',
              paddingLeft: '5%',
              borderRadius: '3px 3px 0 0',
            }}
          >
            인기검색어
          </div>
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
                width: '200px',
                padding: '0 5%',
                background: 'white',
                borderRadius: '0 0 3px 3px ',
                fontFamily: 'Noto Sans KR',
                listStyleType: 'none',
                listStyle: 'none',
              }}
            >
              <div>
                <strong>
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    1
                  </span>

                  {keywords[0].keywordName}
                </strong>
              </div>
              <div>
                <strong>
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    2
                  </span>

                  {keywords[1].keywordName}
                </strong>
              </div>
              <div>
                <strong>
                  {' '}
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    3
                  </span>{' '}
                  {keywords[2].keywordName}
                </strong>
              </div>
              <div>
                <strong>
                  {' '}
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    4
                  </span>{' '}
                  {keywords[3].keywordName}
                </strong>
              </div>
              <div>
                <strong>
                  {' '}
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    5
                  </span>{' '}
                  {keywords[4].keywordName}
                </strong>
              </div>
              <div>
                <strong>
                  {' '}
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    6
                  </span>
                  {keywords[5].keywordName}
                </strong>
              </div>
              <div>
                <strong>
                  {' '}
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    7
                  </span>
                  {keywords[6].keywordName}
                </strong>
              </div>
              <div>
                <strong>
                  {' '}
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    8
                  </span>{' '}
                  {keywords[7].keywordName}
                </strong>
              </div>
              <div>
                <strong>
                  {' '}
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    9
                  </span>{' '}
                  {keywords[8].keywordName}
                </strong>
              </div>
              <div>
                <strong>
                  {' '}
                  <span
                    style={{
                      color: 'white',
                      backgroundColor: '#0d6dfd',
                      display: 'inline-block',
                      fontSize: '.75rem',
                      height: '16px',
                      lineHeight: '16px',
                      textAlign: 'center',
                      width: '15px',
                      paddingBottom: '1px',
                      marginRight: '1px',
                      borderRadius: '2px',
                    }}
                  >
                    10
                  </span>{' '}
                  {keywords[9].keywordName}
                </strong>
              </div>
            </NewsTicker>
          ) : (
            <div></div>
          )}
        </StyledNewsTicker>

        <Form.Control
          className="me-auto"
          placeholder="검색어를 입력하세요"
          onKeyDown={onEnter}
          onChange={onChange}
          value={word}
          style={{
            width: '1500px',
            height: '45px',
            margin: '0 0.5rem 0.4rem 0.5rem',
          }}
        />
        <Button
          variant="primary"
          type="submit"
          onClick={onClick}
          style={{
            width: '80px',
            height: '45px',
            margin: '0 0 0.4rem 0.5rem',
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
  align-items: center;
`;

const StyledNewsTicker = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export default SearchBar;
