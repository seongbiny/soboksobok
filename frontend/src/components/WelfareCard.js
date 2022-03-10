import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import styled from "styled-components";

const StyledBox = styled.div`
  display: grid;
  grid-template-rows: 80% 20%;
  box-sizing: border-box;
  border: 1px solid gray;
  width: 20vw;
  height: 40vh;
  border-radius: 20px;
  padding: 10px;
`;

function WelfareCard() {
  const [likeBtn, setLikeBtn] = useState(false);
  return (
    <StyledBox>
      {likeBtn ? (
        <BsStarFill
          size="30"
          color="yellow"
          onClick={() => {
            setLikeBtn(false);
          }}
        />
      ) : (
        <BsStar
          size="30"
          color="yellow"
          onClick={() => {
            setLikeBtn(true);
          }}
        />
      )}
      <Button variant="primary">상세보기</Button>{" "}
    </StyledBox>
  );
}
export default WelfareCard;
