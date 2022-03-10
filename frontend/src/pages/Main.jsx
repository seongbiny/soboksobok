import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';

import styled from 'styled-components';

const 소개 = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #e3f2fd;
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
      </Container>
    </div>
  );
}

export default Main;
