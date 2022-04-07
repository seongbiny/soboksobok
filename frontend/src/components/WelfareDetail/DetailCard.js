import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { yellow, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { getAxios } from "../../api";
import styled from "styled-components";

function DetailCard(props) {
  const [likeBtn, setLikeBtn] = useState(false);
  const welfare = props.recommend;
  const likeNum = props.likeNum;
  const welfareId = welfare[0];
  const axios = getAxios();

  const likeAxios = async () => {
    try {
      const request = await axios.put(`/api/users/like/${welfareId}`);
      // console.log(request.data);
    } catch (err) {
      console.log(err);
    }
  };
  const unlikeAxios = async () => {
    try {
      const request = await axios.delete(`/api/users/like/${welfareId}`);
      // console.log(request.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (likeNum !== undefined) {
      if (likeNum.length !== 0) {
        likeNum.includes(welfareId) ? setLikeBtn(true) : setLikeBtn(false);
      }
    }
  }, []);

  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/welfare/${welfareId}`);
    // console.log("클릭");
    window.location.reload();
  };

  return (
    <Card
      sx={{
        width: 275,
        height: 250,
        pl: 2,
        pr: 2,
        display: "grid",
        gridTemplateRows: "80% 20%",
        fontFamily: "Noto Sans KR",
      }}
    >
      <CardContent style={{ display: "grid" }}>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={10}>
            <Typography
              variant="h6"
              component="div"
              sx={10}
              style={{ fontFamily: "Noto Sans KR" }}
            >
              <StyledT>{welfare[1]}</StyledT>
            </Typography>
          </Grid>
          {likeNum !== undefined ? (
            <Grid item xs={2}>
              {likeBtn ? (
                <StarRoundedIcon
                  sx={{ color: yellow[600], fontSize: 30 }}
                  onClick={() => {
                    setLikeBtn(false);
                    unlikeAxios();
                    alert("찜해제했습니다.");
                  }}
                />
              ) : (
                <StarBorderRoundedIcon
                  sx={{ color: grey[400], fontSize: 30 }}
                  onClick={() => {
                    setLikeBtn(true);
                    likeAxios();
                    alert("찜했습니다.");
                  }}
                />
              )}
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
        <StyledP>{welfare[2]}</StyledP>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={handleClick}
        >
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
}
const StyledT = styled.div`
  overflow: hidden !important;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.5;
  height: 3em;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
const StyledP = styled.p`
  overflow: hidden !important;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.5;
  height: 4.5em;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
export default DetailCard;
