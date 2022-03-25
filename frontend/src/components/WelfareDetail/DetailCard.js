import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { yellow, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import getAxios from "../../api";

function DetailCard(props) {
  const [likeBtn, setLikeBtn] = useState(false);
  const welfare = props.recommend;
  const likeNum = props.likeNum;
  const welfareId = welfare.welfareId;
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

  useEffect(() => {
    if (likeNum.length !== 0) {
      likeNum.includes(welfareId) ? setLikeBtn(true) : setLikeBtn(false);
    }
    console.log(welfareId);
    console.log(likeNum);
    console.log(likeNum.includes(welfareId));
    console.log(likeNum.length !== 0);
    console.log(likeBtn);
  }, []);
  console.log(likeBtn);
  return (
    <Card
      sx={{ width: 275, p: 2, display: "grid", gridTemplateRows: "80% 20%" }}
    >
      <CardContent>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={10}>
            <Typography variant="h5" component="div" sx={10}>
              {welfare.welfare_service_name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {likeBtn ? (
              <StarRoundedIcon
                sx={{ color: yellow[600], fontSize: 30 }}
                onClick={() => {
                  setLikeBtn(false);
                  unlikeAxios();
                }}
              />
            ) : (
              <StarBorderRoundedIcon
                sx={{ color: grey[400], fontSize: 30 }}
                onClick={() => {
                  setLikeBtn(true);
                  likeAxios();
                }}
              />
            )}
          </Grid>
        </Grid>
        <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
          {welfare.welfare_service_content}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 12 }}>
          {/* <li>문의처 129</li>
          <li>지원주기 월</li>
          <li>제공유형 현금지급</li>
          <li>담당부처 보건복지부 아동복지정책과</li> */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" fullWidth>
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
}
export default DetailCard;
