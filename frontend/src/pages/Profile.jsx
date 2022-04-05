import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import FilterChips from '../components/FilterChips';
import { getAxios, getAxiosDjango } from '../api.js';
import ModifyProfile from '../components/Profile/Modify';
import DeleteAccount from '../components/Profile/DeleteAccount';

const ageMap = new Map();
ageMap.set('1', '어린이 (0~9)'); //무직
ageMap.set('2', '청소년 (10~19)'); //창업
ageMap.set('3', '청년 (20~29)'); //농어업인
ageMap.set('4', '중/장년 (30~59)'); //중소기업
ageMap.set('5', '노년 (60~)'); //일반

function Profile() {
  const [userSeq, setUserSeq] = useState('');
  const [username, setUsername] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [ageRender, setAgeRender] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [liked, setLiked] = useState([]);
  const [used, setUsed] = useState([]);
  const [modify, setModify] = useState('false');

  const getProfile = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get('/api/users/profile');

      console.log('카카오 : ', response.data);
      setUsername(localStorage.getItem('name'));
      setProfileImage(localStorage.getItem('profile'));

      // localStorage.setItem('name', response.data.body.user.username);
      // localStorage.setItem('profile', response.data.body.user.profileImageUrl);
      setUserSeq(response.data.body.user.userSeq);
      console.log('userSeq: ', userSeq);

      if (response.data.body.user.profileImageUrl === null) {
        setProfileImage('/blank-profile.png');
      } else {
        setProfileImage(response.data.body.user.profileImageUrl);
      }

      if (response.data.body.user.ageRange === null) {
        setAgeRange('placeholder');
      } else {
        setAgeRange(response.data.body.user.ageRange);
        setAgeRender(ageMap.get(ageRange));
      }

      if (response.data.body.user.male === null) {
        setGender('placeholder');
      } else if (response.data.body.user.male === 1) {
        setGender('male');
      } else if (response.data.body.user.male === 0) {
        setGender('female');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setProfile = async () => {
    try {
      const axios = getAxios();
      await axios.post('/api/users/update/profile', {
        age: ageRange,
        gender: gender,
      });
      console.log('ageRange: ', ageRange, 'gender: ', gender);
      setAgeRender(ageMap.get(ageRange));

      const djangoAxios = getAxiosDjango();
      let res = await djangoAxios.get(`/insertusergroup/dbscan/${userSeq}`);
      console.log('django res: ', res);
    } catch (err) {
      console.log(err);
    }
  };

  const getLike = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get('/api/users/like');
      // console.log('찜 : ', response.data.body.likeList);/
      setLiked(response.data.body.likeList);
    } catch (err) {
      console.log(err);
    }
  };
  const renderLiked = () => {
    const result = [];
    for (let i = 0; i < liked.length; i++) {
      result.push(<div key={i}>{' - ' + liked[i].welfare_service_name}</div>);
    }
    return result;
  };

  const getUsed = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get('/api/users/used');
      // console.log('사용중 : ', response.data.body.usedWelfareList);
      setUsed(response.data.body.usedWelfareList);
    } catch (err) {
      console.log(err);
    }
  };
  const renderUsed = () => {
    const result = [];
    for (let i = 0; i < used.length; i++) {
      result.push(<div key={i}>{' - ' + used[i].welfare_service_name}</div>);
    }
    return result;
  };

  useEffect(() => {
    getProfile();
  }, [ageRender]); //대괄호 안에 실행조건을 추가. 조건이 없으므로 한번 실행하고 끝남.

  useEffect(() => {
    getLike();
    getUsed();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <소개>
              {modify === 'false' ? (
                <div>
                  <h1> {username}님 안녕하세요!</h1>
                  <img src={profileImage} width="110px"></img>
                  <h5>이름: {username}</h5>
                  <h5>
                    연령대:
                    {ageRange === 'placeholder'
                      ? '수정 버튼을 눌러 정보를 입력해주세요'
                      : ageRender}
                  </h5>

                  <h5>
                    성별:{' '}
                    {gender === 'placeholder' ? '수정 버튼을 눌러 정보를 입력해주세요' : gender}
                  </h5>
                  <h5>{userSeq}</h5>
                </div>
              ) : (
                <div>
                  <h1> {username}님 안녕하세요!</h1>
                  <img src={profileImage} width="110px"></img>
                  <ModifyProfile
                    username={username}
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                    gender={gender}
                    setGender={setGender}
                  ></ModifyProfile>
                </div>
              )}

              <Button
                variant="primary"
                onClick={() => {
                  setModify('ture');
                }}
              >
                수정
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setModify('false');
                  setProfile();
                }}
              >
                저장
              </Button>
            </소개>
            <필터>
              <h5>카테고리 설정 (추천 복지 선택에 도움을 줍니다)</h5>
              <FilterChips></FilterChips>
            </필터>
            <DeleteAccount></DeleteAccount>
          </Col>
          <Col xs={6} md={4}>
            <리스트>
              <h5>
                찜한 복지 <br />
              </h5>
              <h6>{renderLiked()}</h6>
              <br />
              <h5>
                사용 중인 복지 <br />
              </h5>
              <h6>{renderUsed()}</h6>
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
