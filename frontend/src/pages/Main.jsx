import React, { useEffect, useState, Fragment } from 'react';
import { Button, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { getAxios } from '../api';

// const KAKAO_AUTH_URL = `http://j6c205.p.ssafy.io:8080/api/oauth2/authorization/kakao?redirect_uri=http://j6c205.p.ssafy.io:3000/oauth/kakao/callback`;
const KAKAO_AUTH_URL = `http://localhost:8080/api/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/kakao/callback`;

function Main() {
  let navigate = useNavigate();

  const [popular, setPopular] = useState([{}]);
  const [recent, setRecent] = useState([{}]);
  const [token, setToken] = useState('');

  const isLogin = () => {
    if (localStorage.getItem('token')) {
      // return true;
      setToken(true);
    } else {
      // return false;
      setToken(false);
    }
  };

  const getPopular = async () => {
    try {
      const axios = getAxios();
      let res = await axios.get('/api/welfare/popular');
      console.log('인기순: ', res.data.body.welfare, typeof res.data.body.welfare);
      setPopular(res.data.body.welfare);
    } catch (error) {
      console.log(error);
    }
  };
  const getRecent = async () => {
    try {
      const axios = getAxios();
      let res = await axios.get('/api/welfare/recent');
      console.log('최신순: ', res.data.body.welfare, typeof res.data.body.welfare);
      setRecent(res.data.body.welfare);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopular();
    getRecent();
    isLogin();
  }, [isLogin]);

  return (
    <div className="main">
      <StyledContainer>
        <StyledIntro>
          <div style={{ marginTop: '170px' }}>
            <h4>
              <b className="white">소개해요 복지! 소중해요 행복!</b>
            </h4>

            <p>
              소복소복은 사용자에게 맞춤 복지 정보를 제공합니다.
              <br />
              가구상황, 관심주제를 입력하여 더욱 정확한 맞춤 복지를 추천받으세요.
              <br />
              ‘소복소복’에 가입하고 나에게 딱 맞는 복지제도 정보를 찾아보세요
            </p>

            {!token ? (
              <Button href={KAKAO_AUTH_URL} variant="primary">
                카카오톡 간편가입
              </Button>
            ) : null}
          </div>
          <img src="/drawKit/DrawKit (1).png" id="main-image" width="450px" />
        </StyledIntro>

        {/* <div class="custom-shape-divider-bottom-1649090626">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div> */}

        <StyledSearchBar>
          <SearchBar></SearchBar>
        </StyledSearchBar>

        <StyledTab>
          <Tabs
            defaultActiveKey={token ? 'home' : 'popular-list'}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            {token ? (
              <Tab eventKey="home" title="맞춤형 복지 안내">
                <StyledTabContent>
                  <h2>맞춤형 복지 안내</h2>
                  <p>
                    내 정보 페이지에서 정보를 입력하면 더욱 자세한 맞춤 복지 혜택을 안내받을 수
                    있습니다.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate('/filter');
                    }}
                  >
                    정보 입력하기
                  </Button>
                </StyledTabContent>
              </Tab>
            ) : null}

            <Tab eventKey="popular-list" title="인기순">
              <StyledTabContent>
                <h5>지금 인기있는 복지 혜택을 안내드립니다.</h5>
                <ListGroup
                  variant="flush"
                  style={{
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    justifyContent: 'spaceBetween',
                    verticalAlign: 'center',
                  }}
                >
                  {popular.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        display: 'flex',
                      }}
                    >
                      <h6>{' - ' + item.welfare_service_name}</h6>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          navigate(`/welfare/${item.welfareId}`);
                        }}
                      >
                        자세히 보기
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </StyledTabContent>
            </Tab>
            <Tab eventKey="recent-list" title="최신순">
              <StyledTabContent>
                <h5>최신 등록된 복지 혜택을 안내드립니다.</h5>
                <ListGroup
                  variant="flush"
                  style={{
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    justifyContent: 'spaceBetween',
                    verticalAlign: 'center',
                  }}
                >
                  {recent.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        display: 'flex',
                      }}
                    >
                      <h6>{item.welfare_service_name}</h6>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          navigate(`/welfare/${item.welfareId}`);
                        }}
                      >
                        자세히 보기
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </StyledTabContent>
            </Tab>
          </Tabs>
        </StyledTab>
      </StyledContainer>
    </div>
  );
}

const StyledContainer = styled.div`
  display: grid;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
`;

const StyledIntro = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5% 10%;
  background-color: #90caf9;
  width: 100vw;
  justify-content: space-around;
  color: black;
`;

const StyledSearchBar = styled.div`
  margin: 50px 220px 0px 220px;
`;
const StyledTab = styled.div`
  margin: 50px 220px 200px 220px;
`;

const StyledTabContent = styled.div`
  padding: 20px;
`;

export default Main;
