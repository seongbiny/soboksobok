import React, { useEffect } from "react";

function ProfileCard(props) {
  return (
    <div>
      <img
        src={props.profile}
        style={{ objectFit: "cover", width: "100%", maxHeight: "100%" }}
      ></img>
      <div>이름</div>
      <div>나이</div>
    </div>
  );
}
export default ProfileCard;
