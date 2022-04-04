import React from "react";
import styled from "styled-components";

function ProfileCard(props) {
  return (
    <StyledCard>
      {props.profile === null ? (
        <img
          src="/blank-profile.png"
          alt="profile"
          style={{ objectFit: "cover", width: "100%", maxHeight: "100%" }}
        ></img>
      ) : (
        <img
          src={props.profile}
          alt="profile"
          style={{ objectFit: "cover", width: "100%", maxHeight: "100%" }}
        ></img>
      )}
      {props.name === null ? (
        <div></div>
      ) : (
        <StyledName>{props.name}님</StyledName>
      )}
    </StyledCard>
  );
}
const StyledCard = styled.div`
  box-sizing: border-box;
  // border: 1px solid;
  display: grid;
  border-radius: 20px;
  background-color: #90caf9;
`;
const StyledName = styled.div`
  color: "#033075";
  font-weight: bold;
  height: 5vh;
  display: grid;
  justify-content: center;
  align-items: center;
`;
export default ProfileCard;
