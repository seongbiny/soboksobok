import React from "react";
import styled from "styled-components";

function ProfileCard(props) {
  return (
    <StyledCard>
      {props.profile === null ? (
        <img
          src="blank-profile.png/"
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
      <div>{props.name}님</div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  box-sizing: border-box;
  background: pink;
`;
export default ProfileCard;
