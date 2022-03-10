import React, { useState } from "react";
import styled from "styled-components";
import {
  BsBookmarkCheck,
  BsBookmarkDashFill,
  BsStarFill,
  BsStar,
} from "react-icons/bs";

const StyledMain = styled.div`
  box-sizing: border-box;
  height: 30vh;
  width: 70vw;
  border: 1px solid gray;
  border-radius: 20px;
  margin: 10px;
  padding: 10px;
`;

function DetailMain() {
  const [likeBtn, setLikeBtn] = useState(false);
  const [checkBtn, setCheckBtn] = useState(false);

  return (
    <div>
      <StyledMain>
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
        {checkBtn ? (
          <BsBookmarkDashFill
            size="30"
            onClick={() => {
              setCheckBtn(false);
            }}
          />
        ) : (
          <BsBookmarkCheck
            size="30"
            onClick={() => {
              setCheckBtn(true);
            }}
          />
        )}
      </StyledMain>
    </div>
  );
}
export default DetailMain;
