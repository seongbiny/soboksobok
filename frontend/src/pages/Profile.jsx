import React, { useEffect, useState } from 'react';
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
  // const [user_id, setUserId] = useState();
  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState();
  const [ageRange, setAgeRange] = useState();
  const [gender, setGender] = useState();
  const [profileImage, setProfileImage] = useState();

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: '/v2/user/me',
      });
      console.log('카카오 : ', data);
      // 사용자 정보 변수에 저장
      // setUserId(data.id);
      setNickname(data.properties.nickname);
      setEmail(data.kakao_account.email);
      setAgeRange(data.kakao_account.age_range);
      setGender(data.kakao_account.gender);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <소개>
              <h1> {nickname}님 안녕하세요!</h1>
              <img src={profileImage}></img>
              <h5>
                이름: {nickname} <br />
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

export default Profile;
