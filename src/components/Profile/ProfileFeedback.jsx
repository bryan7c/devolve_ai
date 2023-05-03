import { StarOutline, StarRate, StarRateTwoTone } from "@mui/icons-material";

const { Grid, Avatar, Typography, Rating } = require("@mui/material");

function ProfileFeedback({title, rating, img}) {
  return (
    <Grid container item xs={12} className="profile-feedback" p={3} spacing={2}>
      <Grid item xs={4}>
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
      <Grid container item direction={"column"} xs={8}>
        <Grid container item justifyContent={"space-between"}>
            <Typography noWrap={true} variant="body1" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="overline">{rating}</Typography>
        </Grid>
        <Grid container item xs>
            <Rating name="half-rating" defaultValue={rating} precision={0.5} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileFeedback;
