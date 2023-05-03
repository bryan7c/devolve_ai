import Header from "@/src/components/Header/Header";
import { Grid } from "@mui/material";

export function InternalLayout({ children }) {
  return (
    <Grid container spacing={0} minHeight={"100vh"} direction={"column"}>
      <Grid item xs={"auto"}>
        <Header />
      </Grid>
      <Grid item sx={{ margin: '1em' }}>
        {children}
      </Grid>
    </Grid>
  );
}
