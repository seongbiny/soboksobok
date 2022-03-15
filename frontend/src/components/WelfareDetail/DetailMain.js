import React, { useState } from "react";
import styled from "styled-components";
import {
  BsBookmarkCheck,
  BsBookmarkDashFill,
  BsStarFill,
  BsStar,
} from "react-icons/bs";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function DetailMain() {
  const [likeBtn, setLikeBtn] = useState(false);
  const [checkBtn, setCheckBtn] = useState(false);

  return (
    <div>
      <Box
        sx={{
          "& > :not(style)": {
            m: 1,
            width: 1000,
            height: 128,
          },
        }}
      >
        <Paper elevation={3}>
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
          상세내용
        </Paper>
      </Box>
    </div>
  );
}
export default DetailMain;
