import React from "react";
import styled from "styled-components";

function ProfileCard(props) {
  return (
    <StyledCard>
      <img
        src={props.profile}
        style={{ objectFit: "cover", width: "100%", maxHeight: "100%" }}
      ></img>
      <div>{props.name}님</div>
    </StyledCard>
  );
}
const StyledCard = styled.div`
  box-sizing: border-box;
  border: 1px solid;
  display: grid;
`;
export default ProfileCard;
