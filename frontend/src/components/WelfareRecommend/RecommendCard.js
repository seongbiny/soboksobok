import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function RecommendCard(props) {
  const { title, id } = props;
  let navigate = useNavigate();

  const onClick = () => {
    navigate(`/welfare/${id}`);
  };

  return (
    <Card
      sx={{
        width: 275,
        height: 275,
        pl: 2,
        pr: 2,
        display: "grid",
        gridTemplateRows: "80% 20%",
        background: "#E3F2FD",
      }}
    >
      <CardContent>
        <Grid container sx={{ mb: 2 }}>
          <Grid>
            <Typography
              variant="h6"
              component="div"
              sx={10}
              style={{ color: "#033075", fontFamily: "Noto Sans KR" }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
          만 8세 미만 아동의 양육 부담을 덜고 아동의 기본적인 권리와 복지 증진을
          돕습니다.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" fullWidth onClick={onClick}>
          상세보기
        </Button>
      </CardActions>
    </Card>
  );
}
export default RecommendCard;
