import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAxios } from '../../api';

const DeleteAccount = () => {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDelete = async () => {
    try {
      const axios = getAxios();
      let res = await axios.delete('/api/users/delete');
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
          handleShow();
        }}
        // 로그아웃 시키고 메인 페이지로 보내주는 작업 처리하기
      >
        회원탈퇴
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>회원탈퇴 하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              getDelete();
              localStorage.removeItem('jwtToken');
              navigate('/', { replace: true });
            }}
          >
            탈퇴
          </Button>
          <Button variant="primary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAccount;
