import { Button, Stack } from 'react-bootstrap';
import ModifyProfile from './Modify';

const genderMap = new Map();
genderMap.set('female', '여자');
genderMap.set('male', '남자');

const UserProfile = ({
  modify,
  setModify,
  setProfile,
  profileImage,
  username,
  ageRange,
  ageRender,
  setAgeRange,
  gender,
  setGender,
}) => {
  return (
    <div>
      {modify === 'false' ? (
        <div
          className="userProfileBox"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '3%',
          }}
        >
          <img
            src={profileImage}
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '70%',
              overflow: 'hidden',
            }}
          ></img>
          <div
            className="userProfileInfo"
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
            }}
          >
            <h5>
              <b> {username}님 안녕하세요!</b>
            </h5>
            <h6>
              <b>
                연령대:{' '}
                {ageRange === 'placeholder' ? '수정 버튼을 눌러 정보를 입력해주세요' : ageRender}
              </b>
            </h6>

            <h6>
              <b>
                성별:
                {gender === 'placeholder'
                  ? '수정 버튼을 눌러 정보를 입력해주세요'
                  : genderMap.get(gender)}
              </b>
            </h6>

            <Stack direction="horizontal" gap={2}>
              <Button
                variant="primary"
                size="sm"
                style={{ width: '80px' }}
                onClick={() => {
                  setModify('ture');
                }}
              >
                수정
              </Button>
              <Button
                variant="primary"
                size="sm"
                style={{ width: '80px' }}
                onClick={() => {
                  setModify('false');
                  setProfile();
                }}
              >
                저장
              </Button>
            </Stack>
          </div>
        </div>
      ) : (
        <div
          className="userProfileBox"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '3%',
          }}
        >
          <img
            src={profileImage}
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '70%',
              overflow: 'hidden',
            }}
          ></img>
          <div
            className="userProfileInfo"
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '20px',
            }}
          >
            <h5>
              <b> {username}님 안녕하세요!</b>
            </h5>
            <ModifyProfile
              username={username}
              ageRange={ageRange}
              setAgeRange={setAgeRange}
              gender={gender}
              setGender={setGender}
            ></ModifyProfile>
            <Stack direction="horizontal" gap={2}>
              <Button
                variant="primary"
                size="sm"
                style={{ width: '80px' }}
                onClick={() => {
                  setModify('ture');
                }}
              >
                수정
              </Button>
              <Button
                variant="primary"
                size="sm"
                style={{ width: '80px' }}
                onClick={() => {
                  setModify('false');
                  setProfile();
                }}
              >
                저장
              </Button>
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
