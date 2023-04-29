import { StarOutline, StarRate } from "@mui/icons-material";

const { Grid, Avatar, Typography } = require("@mui/material");

function ProfileFeedback(props) {
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
          src="/img/jose.png"
        />
      </Grid>
      <Grid container item direction={"column"} xs={8}>
        <Grid container item justifyContent={"space-between"}>
            <Typography noWrap={true} variant="body1" fontWeight={500}>
              Rafael Silva
            </Typography>
            <Typography variant="overline">4,8</Typography>
        </Grid>
        <Grid container item xs>
          <StarRate color="secondary" sx={{fontSize: "1.9em"}} />
          <StarRate color="secondary" sx={{fontSize: "1.9em"}} />
          <StarRate color="secondary" sx={{fontSize: "1.9em"}} />
          <StarRate color="secondary" sx={{fontSize: "1.9em"}} />
          <StarOutline color="gray" sx={{fontSize: "1.9em"}} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileFeedback;
