import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { convertLength } from '@mui/material/styles/cssUtils';

const Norecommend = (props) => {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      {/* <StyledMainArea> */}
      <StyledProfile>
        {props.profile === null ? (
          <img
            src="/blank-profile.png"
            alt="profile"
            style={{
              width: '30vh',
              // maxHeight: '100%',
              height: '70%',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
          ></img>
        ) : (
          <img
            src={props.profile}
            alt="profile"
            style={{
              objectFit: 'cover',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
          ></img>
        )}
        {props.name === null ? (
          <div style={{ marginTop: '1vh', marginBottom: '1vh' }}>안녕하세요!</div>
        ) : (
          <div style={{ marginTop: '1vh', marginBottom: '1vh' }}>
            <div>안녕하세요!</div>
            <div>{props.name}님</div>
          </div>
        )}
      </StyledProfile>
      <StyledBox>
        <h2 style={{ color: '#033075' }}>추천 복지가 없습니다.</h2>
        <div>
          <Button
            variant="primary"
            onClick={() => {
              navigate('/filter');
            }}
          >
            맞춤필터 설정하러가기
          </Button>
        </div>
      </StyledBox>
      {/* </StyledMainArea> */}
    </StyledContainer>
  );
};
const StyledProfile = styled.div`
  box-sizing: border-box;
  text-align: center;
  display: grid;
  border-radius: 20px;
  border: 1px solid red;
  background-color: red;
  // background-color: #e3f2fd;
  width: 200px;
  height: 200px;
  margin: 0 2%;
  color: #033075;
`;
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20vh 10vw;
  width: 80vw;
  height: 60vh;
  border: 1px solid black;
`;
// const StyledContainer = styled.div`
//   display: grid;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20vh;
//   grid-row-gap: 15vh;
// `;
const StyledMainArea = styled.div`
  width: 80vw;
  height: 60vh;
  border: 1px solid black;
`;
const StyledBox = styled.div`
  box-sizing: border-box;
  width: 60vw;
  height: 100%;
  // height: 20vh;
  background: #e3f2fd;
  margin: 0 2%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default Norecommend;
