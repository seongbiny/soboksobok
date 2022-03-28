import { Form } from 'react-bootstrap';
import AgeSelectBox from './AgeRange';
import GenderSelectBox from './Gender';

const ModifyProfile = ({ username, setEmail, setAgeRange, setGender }) => {
  return (
    <div>
      <h5>
        이름: {username} <br />
      </h5>
      <h5>
        이메일:{' '}
        <Form.Control
          type="text"
          placeholder="email@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />{' '}
        <br />
      </h5>
      <h5>
        연령대: <AgeSelectBox setAgeRange={setAgeRange}></AgeSelectBox> <br />
      </h5>
      <h5>
        성별: <GenderSelectBox setGender={setGender}></GenderSelectBox> <br />
      </h5>
    </div>
  );
};

export default ModifyProfile;
