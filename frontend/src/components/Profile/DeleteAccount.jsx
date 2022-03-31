import { Button } from 'react-bootstrap';
import { getAxios, getAxiosDjango } from '../../api';

const DeleteAccount = () => {
  const getDelete = async () => {
    try {
      const axios = getAxios();
      let res = await axios.get('/api/users/delete');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          getDelete();
        }}
        // 로그아웃 시키고 메인 페이지로 보내주는 작업 처리하기
      >
        회원탈퇴
      </Button>
    </div>
  );
};

export default DeleteAccount;
