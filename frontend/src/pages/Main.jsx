import React, { useEffect, useState } from 'react';
import { Button, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAxios } from '../api';
import SearchBar from '../components/Main/SearchBar.js';
import FilterSlide from '../components/WelfareRecommend/FilterSlide';
import FilterSlideMain from '../components/WelfareRecommend/FilterSlideMainjs';

function Main() {
  const KAKAO_AUTH_URL = `http://localhost:8080/api/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/kakao/callback`;
  // const KAKAO_AUTH_URL = `http://j6c205.p.ssafy.io:8080/api/oauth2/authorization/kakao?redirect_uri=http://j6c205.p.ssafy.io:3000/oauth/kakao/callback`;

  const axios = getAxios();
  let navigate = useNavigate();

  const [name, setName] = useState('User');
  const [selectfamilies, setSelectfamilies] = useState([{}]);
  const [selecttargets, setSelecttargets] = useState([{}]);
  const [popular, setPopular] = useState([{}]);
  const [token, setToken] = useState('');
  const [cards, setCards] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const isLogin = () => {
    if (localStorage.getItem('token')) {
      setToken(true);
    } else {
      setToken(false);
    }
  };

  const getProfile = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get('/api/users/profile');
      console.log('카카오 : ', response.data);
      localStorage.setItem('name', response.data.body.user.username);
      localStorage.setItem('profile', response.data.body.user.profileImageUrl);
      await setName(localStorage.getItem('name'));
      await setSelectfamilies(response.data.body.user.selectfamilies);
      await setSelecttargets(response.data.body.user.selecttargets);
    } catch (err) {
      console.log(err);
    }
  };

  const getPopular = async () => {
    try {
      let res = await axios.get('/api/welfare/popular');
      console.log('인기순: ', res.data.body.welfare, typeof res.data.body.welfare);
      setPopular(res.data.body.welfare);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCard = async () => {
    try {
      const request = await axios.get('/api/welfare/recommend');
      console.log('welfare: ', request.data.body.welfare);
      setCards(request.data.body.welfare);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWord = async () => {
    try {
      const request = await axios.get('/api/welfare/keyword');
      console.log('keywords: ', request.data.body.keywords);
      setKeywords(request.data.body.keywords.slice(0, 10));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopular();
    fetchCard();
    fetchWord();
    isLogin();
    getProfile();
  }, []);

  return (
    <div className="main">
      <StyledContainer>
        <StyledIntro>
          <StyledIntroMain>
            <div className="intro-text-area" style={{ marginTop: '170px' }}>
              <h2>
                <b className="white">소개해요 복지! 소중해요 행복!</b>
              </h2>

              <h5 style={{ marginTop: '10px' }}>
                소복소복은 사용자에게 맞춤 복지 정보를 제공합니다.
                <br />
                ‘소복소복’에 가입하고 나에게 딱 맞는 복지제도 정보를 찾아보세요
              </h5>

              {!token ? (
                <Button href={KAKAO_AUTH_URL} variant="primary" style={{ marginTop: '10px' }}>
                  카카오톡 간편가입
                </Button>
              ) : null}
            </div>
            <img src="/drawKit/SVG/DrawKit (2).svg" alt="main-image" width="450px" />
          </StyledIntroMain>
        </StyledIntro>

        <StyledBottomBackground>
          <StyledSearchBar>
            <SearchBar keywords={keywords}></SearchBar>
          </StyledSearchBar>

          <StyledTab>
            <Tabs defaultActiveKey="home" id="main-welfare-tab" className="mb-3">
              <Tab eventKey="home" title="맞춤형 복지 안내">
                {cards.length === 0 || (selectfamilies === [] && selecttargets === []) ? (
                  <div
                    className="welfareInfo"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      margin: '2% 0',
                    }}
                  >
                    <img
                      src="/drawKit/SVG/DrawKit (5).svg"
                      alt="main-image"
                      width="400px"
                      style={{ transform: 'scaleX(-1)' }}
                    />
                    <div
                      className="welfareInfoContent"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <h3>
                        <strong>나의 상황에 알맞은 정보를 입력하여</strong>
                      </h3>
                      <h3>
                        <strong>더욱 정확한 맞춤 복지 혜택을 추천받으세요.</strong>
                      </h3>

                      <h5 style={{ marginTop: '10px' }}>
                        <strong>회원님의 상황을 자세히 선택할수록</strong>
                      </h5>
                      <h5>
                        <strong>유용한 복지 혜택을 안내받을 수 있습니다.</strong>
                      </h5>
                      <Button
                        variant="primary"
                        style={{ margin: '5% 30% 5% 0' }}
                        onClick={() => {
                          navigate('/filter');
                        }}
                      >
                        정보 입력하기
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="welfareRecommendContent">
                    <h2 style={{ margin: '50px 0 -10px 60px', fontWeight: '600' }}>
                      {name}님에게 추천하는 복지
                    </h2>
                    <FilterSlide name={name} cards={cards} style={{ width: '300px' }} />
                  </div>
                )}
              </Tab>

              <Tab eventKey="popular-list" title="인기순">
                <h5 style={{ padding: '1% 3%' }}>
                  <b>지금 인기있는 복지 혜택을 안내드립니다.</b>
                </h5>
                <ListGroup variant="flush">
                  {popular.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <StyledS
                        style={{
                          width: '300px',
                          fontSize: '13px',
                          margin: '0 0 0 20px',
                        }}
                        onClick={() => {
                          navigate(`/welfare/${item.welfareId}`);
                        }}
                      >
                        {item.welfare_service_name}
                      </StyledS>
                      <div className="vr" style={{ margin: '0 2%' }} />
                      <strong
                        style={{
                          fontSize: '13px',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          width: '700px',
                          margin: '0 0 0 20px',
                        }}
                        onClick={() => {
                          navigate(`/welfare/${item.welfareId}`);
                        }}
                      >
                        {item.welfare_target_detail}
                      </strong>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>
            </Tabs>
          </StyledTab>
        </StyledBottomBackground>
      </StyledContainer>
    </div>
  );
}
const StyledS = styled.strong`
  &:hover {
    text-decoration: none;
    display: inline;
    box-shadow: 0 -6px rgba(75, 112, 253, 0.3) inset;
  }
  cursor: pointer;
`;
const StyledContainer = styled.div`
  display: grid;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
`;

const StyledIntro = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 1% 10%;
  background-color: #90caf9;
  width: 100vw;
  color: black;
`;

const StyledIntroMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 100px 0 0 0;
  justify-content: space-around;
  background-color: #90caf9;
`;

const StyledBottomBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url('/background/layered-waves-haikei.svg');
`;

const StyledSearchBar = styled.div`
  margin: 0 10% 1% 10%;
`;

const StyledTab = styled.div`
  margin: 0 10% 5% 10%;
  background: white;
  border-radius: 5px;
  padding: 1% 1%;
`;

export default Main;
