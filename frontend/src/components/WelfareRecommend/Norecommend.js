import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const Norecommend = () => {
  const navigate = useNavigate();
  return (
    <StyledBox>
      <h2 style={{ margin: "auto", color: "#033075" }}>
        추천 복지가 없습니다.
      </h2>
      <div style={{ margin: "auto" }}>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/filter");
          }}
        >
          맞춤필터 설정하러가기
        </Button>
      </div>
    </StyledBox>
  );
};
const StyledBox = styled.div`
  box-sizing: border-box;
  width: 60vw;
  height: 20vh;
  background: #e3f2fd;
  margin: auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;
export default Norecommend;
