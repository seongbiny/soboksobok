import React from 'react';
import { Container, Row, Col, Button, Tabs, Tab, TabContainer } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';

import styled from 'styled-components';

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

function Main() {
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
              <Button variant="primary">카카오톡 간편가입</Button>
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
                    <Button variant="primary">정보 입력하기</Button>
                  </탭내용>
                  {/* <TabContainer>
                    <h2>맞춤형 복지 안내</h2>
                    <p>
                      내 정보 페이지에서 정보를 입력하면 더욱 자세한 맞춤 복지 혜택을 안내받을 수
                      있습니다.
                    </p>
                    <p>소복소복은 사용자에게 맞춤 복지 정보를 제공합니다.</p>
                  </TabContainer> */}

                  {/* <Sonnet /> //필요한 요소 넣기 */}
                </Tab>
                <Tab eventKey="profile" title="Profile">
                  {/* <Sonnet /> */}
                </Tab>
              </Tabs>
            </탭>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
