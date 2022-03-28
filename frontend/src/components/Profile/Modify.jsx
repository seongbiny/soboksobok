import AgeSelectBox from './AgeRange';
import GenderSelectBox from './Gender';

const ModifyProfile = ({ username, ageRange, setAgeRange, gender, setGender }) => {
  return (
    <div>
      <h5>이름: {username}</h5>
      <h5></h5>
      <h5>
        연령대: <AgeSelectBox ageRange={ageRange} setAgeRange={setAgeRange}></AgeSelectBox>
      </h5>
      <h5>
        성별: <GenderSelectBox gender={gender} setGender={setGender}></GenderSelectBox>
      </h5>
    </div>
  );
};

export default ModifyProfile;
