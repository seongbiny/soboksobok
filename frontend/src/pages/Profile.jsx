import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FilterChips from '../components/FilterChips';

import styled from 'styled-components';

const 소개 = styled.div`
  margin: 20px;
  padding: 20px;
`;

const 필터 = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #e3f2fd;
`;

const 리스트 = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #e3f2fd;
`;

function Profile() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <소개>
              <h1> OOO님 안녕하세요!</h1>
              <h5>
                이름 <br />
              </h5>
              <h5>
                이메일 <br />
              </h5>
              <h5>
                연령대 <br />
              </h5>
              <h5>
                나이 <br />
              </h5>
            </소개>
            <필터>
              <h5>카테고리 설정 (추천 복지 선택에 도움을 줍니다)</h5>
              <FilterChips></FilterChips>
            </필터>
          </Col>
          <Col xs={6} md={4}>
            <리스트>
              <h5>
                찜한 복지 <br />
              </h5>
              <h6>- xxx</h6>
              <br />
              <h5>
                사용 중인 복지 <br />
              </h5>
              <h6>- xxx</h6>
            </리스트>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
