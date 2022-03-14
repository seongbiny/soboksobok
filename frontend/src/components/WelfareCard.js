import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

function WelfareCard() {
  const [likeBtn, setLikeBtn] = useState(false);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {likeBtn ? (
          <StarRoundedIcon
            onClick={() => {
              setLikeBtn(false);
            }}
          />
        ) : (
          <StarBorderRoundedIcon
            onClick={() => {
              setLikeBtn(true);
            }}
          />
        )}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          belent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export default WelfareCard;
