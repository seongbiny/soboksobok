import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { yellow, blue, grey } from "@mui/material/colors";
import { Grid, Typography } from "@mui/material";
import getAxios from "../../api";

function DetailMain(props) {
  const [likeBtn, setLikeBtn] = useState(false);
  const [checkBtn, setCheckBtn] = useState(false);
  const welfareId = Number(props.welfareId);
  const Name = props.Name;
  const Content = props.Content;
  const likeNum = props.likeNum;
  // const update = props.update;
  const axios = getAxios();

  const likeAxios = () => {
    axios
      .put(`/api/users/like/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const unlikeAxios = () => {
    axios
      .delete(`/api/users/like/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const usedAxios = () => {
    axios
      .put(`/api/users/used/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const unusedAxios = () => {
    axios
      .delete(`/api/users/used/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(likeNum);
    if (likeNum.length !== 0) {
      likeNum.includes(welfareId) ? setLikeBtn(true) : setLikeBtn(false);
    }
    // console.log(likeNum.includes(welfareId));
  }, []);

  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 1,
          width: 1000,
          height: 150,
        },
        mb: 3,
        mt: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h4" align="left">
              {Name}
            </Typography>
          </Grid>
          <Grid item xs={2} align="right">
            <div>
              {likeBtn ? (
                <StarRoundedIcon
                  sx={{ color: yellow[600], fontSize: 40 }}
                  onClick={() => {
                    setLikeBtn(false);
                    unlikeAxios();
                    props.changeUpdate(props.update);
                  }}
                />
              ) : (
                <StarBorderRoundedIcon
                  sx={{ color: grey[400], fontSize: 40 }}
                  onClick={() => {
                    setLikeBtn(true);
                    likeAxios();
                  }}
                />
              )}
              {checkBtn ? (
                <BookmarkRemoveRoundedIcon
                  sx={{ color: blue[600], fontSize: 35 }}
                  onClick={() => {
                    setCheckBtn(false);
                    unusedAxios();
                  }}
                />
              ) : (
                <BookmarkAddedOutlinedIcon
                  sx={{ color: grey[400], fontSize: 35 }}
                  onClick={() => {
                    setCheckBtn(true);
                    usedAxios();
                  }}
                />
              )}
            </div>
          </Grid>
        </Grid>
        <Typography>{Content}</Typography>
      </Paper>
    </Box>
  );
}
export default DetailMain;
