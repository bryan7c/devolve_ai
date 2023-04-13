import Header from "@/src/components/Header/Header";
import { Grid } from "@mui/material";

export function InternalLayout({ children }) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item sx={{ flexGrow: 1, margin: '1em' }}>
        {children}
      </Grid>
    </Grid>
  );
}
