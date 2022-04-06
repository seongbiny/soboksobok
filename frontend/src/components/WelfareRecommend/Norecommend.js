import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const Norecommend = props => {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <StyledProfile>
        {props.profile === null ? (
          <img
            src="/blank-profile.png"
            alt="profile"
            style={{
              width: "30vh",
              maxHeight: "100%",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          ></img>
        ) : (
          <img
            src={props.profile}
            alt="profile"
            style={{
              width: "30vh",
              maxHeight: "100%",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          ></img>
        )}
        {props.name === null ? (
          <div style={{ marginTop: "1vh", marginBottom: "1vh" }}>
            안녕하세요!
          </div>
        ) : (
          <div style={{ marginTop: "1vh", marginBottom: "1vh" }}>
            <div>안녕하세요!</div>
            <div>{props.name}님</div>
          </div>
        )}
      </StyledProfile>
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
    </StyledContainer>
  );
};
const StyledProfile = styled.div`
  box-sizing: border-box;
  text-align: center;
  display: grid;
  border-radius: 20px;
  background-color: #e3f2fd;
  width: 30vh;
  margin: auto;
  color: #033075;
`;
const StyledContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
  grid-row-gap: 15vh;
`;
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
