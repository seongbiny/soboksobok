import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { yellow, blue, grey } from "@mui/material/colors";
import { Grid, Typography } from "@mui/material";
import axios from "axios";

function DetailMain(props) {
  const [likeBtn, setLikeBtn] = useState(false);
  const [checkBtn, setCheckBtn] = useState(false);
  const welfareId = props.welfareId;

  const likeAxios = () => {
    axios
      .post(`http://localhost:8080/api/userId/like/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const unlikeAxios = () => {
    axios
      .delete(`http://localhost:8080/api/userId/like/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const usedAxios = () => {
    axios
      .post(`http://localhost:8080/api/userId/used/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const unusedAxios = () => {
    axios
      .delete(`http://localhost:8080/api/userId/used/${welfareId}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/userId/like`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
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
              취업 후상환 학자금대출
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
        <Typography sx={{ mt: 1 }}>
          대학생이 학업에 전념할 수 있도록 학자금 전액대출을 지원하고 일정
          소득이 발생한 후 소득수준에 따라 상환할 수 있도록 합니다.
        </Typography>
      </Paper>
    </Box>
  );
}
export default DetailMain;
