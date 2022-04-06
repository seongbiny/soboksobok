import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LoginModal() {
  let navigate = useNavigate();
  return (
    <StyledContainer>
      <Modal.Dialog>
        <Modal.Body>
          <p>로그인이 필요한 페이지입니다.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 200px;
`;

export default LoginModal;
