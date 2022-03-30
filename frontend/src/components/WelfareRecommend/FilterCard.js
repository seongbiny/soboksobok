import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function FilterCard(props) {
  const { name, content, id } = props;
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
        background: "#DDF0F8",
      }}
    >
      <CardContent>
        <Grid container sx={{ mb: 2 }}>
          <Grid item>
            <Typography
              variant="h5"
              component="div"
              sx={10}
              style={{ color: "#033075", fontWeight: "500" }}
            >
              {name}
            </Typography>
          </Grid>
        </Grid>
        <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
          {content}
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
export default FilterCard;
