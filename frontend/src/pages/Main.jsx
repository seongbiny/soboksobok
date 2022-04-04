import React, { useEffect, useState, Fragment } from 'react';
import { Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { getAxios } from '../api';

// const KAKAO_AUTH_URL = `http://j6c205.p.ssafy.io:8080/api/oauth2/authorization/kakao?redirect_uri=http://j6c205.p.ssafy.io:3000/oauth/kakao/callback`;
const KAKAO_AUTH_URL = `http://localhost:8080/api/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/kakao/callback`;

function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}

function Main() {
  let navigate = useNavigate();

  const [popular, setPopular] = useState([{}]);
  const [recent, setRecent] = useState([{}]);

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
  }, []);

  return (
    <div className="main">
      <Container>
        <Row>
          <Col>
            <div className="search">
              <SearchBar></SearchBar>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <소개>
              <h2>소복소복</h2>
              <h4>소개해요 복지! 소중해요 행복! </h4>
              <p>소복소복은 사용자에게 맞춤 복지 정보를 제공합니다.</p>
              <p>
                흩어져 있는 복지제도 정보를 모아 누구나 쉽게 검색할 수 있고 가구상황, 관심주제 등을
                입력하여 더욱 정확한 맞춤 복지를 추천받을 수 있습니다.
              </p>
              <p>
                맞춤복지제공서비스 ‘소복소복’에 가입하고
                <br />
                나에게 딱 맞는 복지제도 정보를 찾아보세요
              </p>

              {!isLogin() ? (
                <Button href={KAKAO_AUTH_URL} variant="primary">
                  카카오톡 간편가입
                </Button>
              ) : null}
            </소개>
          </Col>
        </Row>

        <Row>
          <Col>
            <탭>
              <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="맞춤형 복지 안내">
                  <탭내용>
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
                  </탭내용>
                </Tab>
                <Tab eventKey="popular-list" title="인기순">
                  <탭내용>
                    <h5>지금 인기있는 복지 혜택을 안내드립니다.</h5>
                    {popular.map((item, index) => (
                      <Fragment key={index}>
                        <h6>{' - ' + item.welfare_service_name}</h6>
                        <Button
                          variant="primary"
                          onClick={() => {
                            navigate(`/welfare/${item.welfareId}`);
                          }}
                        >
                          자세히 보기
                        </Button>
                      </Fragment>
                    ))}
                  </탭내용>
                </Tab>
                <Tab eventKey="recent-list" title="최신순">
                  <탭내용>
                    <h5>최신 등록된 복지 혜택을 안내드립니다.</h5>
                    {recent.map((item, index) => (
                      <Fragment key={index}>
                        <h6>{' - ' + item.welfare_service_name}</h6>
                        <Button
                          variant="primary"
                          onClick={() => {
                            navigate(`/welfare/${item.welfareId}`);
                          }}
                        >
                          자세히 보기
                        </Button>
                      </Fragment>
                    ))}
                  </탭내용>
                </Tab>
              </Tabs>
            </탭>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const 소개 = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #e3f2fd;
`;

const 탭 = styled.div`
  margin: 20px;
`;

const 탭내용 = styled.div`
  padding: 20px;
`;

export default Main;
