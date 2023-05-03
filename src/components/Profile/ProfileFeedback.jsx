import { StarOutline, StarRate, StarRateTwoTone } from "@mui/icons-material";

const { Grid, Avatar, Typography, Rating } = require("@mui/material");

function ProfileFeedback({title, rating, img}) {
  return (
    <Grid container item xs={12} spacing={2}>
      <Grid item xs={"auto"} p={"5px"}>
        <Avatar
          sx={{
            width: "75px",
            height: "75px",
            border: "solid #fff 3px",
            boxShadow: "0 0 0 5px #31C4EA",
          }}
          alt="Bryan Marvila"
          src={img}
        />
      </Grid>
      <Grid item xs={"auto"}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography noWrap={true} variant="body1" fontWeight={500}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="overline">{rating}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
            <Rating name="half-rating" defaultValue={rating} precision={0.5} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileFeedback;
