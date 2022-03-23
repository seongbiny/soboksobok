import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FilterChips from '../components/FilterChips';

import styled from 'styled-components';

import { useStore } from '../store.jsx';

function Profile() {
  const username = useStore((state) => state.username);
  // const username = useStore.username;
  const email = useStore((state) => state.email);
  const ageRange = useStore((state) => state.ageRange);
  const gender = useStore((state) => state.gender);
  const profileImage = useStore((state) => state.profileImage);

  console.log(username);
  console.log(email);

  // const getLike = async () => {
  //   try {
  //     let response = await Axios.get('/api/users/like');
  //     console.log('찜 : ', response.data);

  //     // 사용자 정보 변수에 저장
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // getLike();
  }, []); //대괄호 안에 실행조건을 추가. 조건이 없으므로 한번 실행하고 끝남.

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <소개>
              <h1> {username}님 안녕하세요!</h1>
              <img src={profileImage}></img>
              <h5>
                이름: {username} <br />
              </h5>
              <h5>
                이메일: {email} <br />
              </h5>
              <h5>
                연령대: {ageRange} <br />
              </h5>
              <h5>
                나이 <br />
              </h5>
              <h5>
                성별: {gender} <br />
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
  positoin: sticky;
  width: 175px;
  display: inline-block;
  right: 10%;
  top: 94%;
  background-color: #e3f2fd;
`;

export default Profile;
