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
        <div style={{ color: "#033075", margin: "auto" }}>{props.name}님</div>
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
  height: 35vh;
  font-weight: bold;
`;
export default ProfileCard;
