import { Search } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import dynamic from "next/dynamic";
const AutoCompleteLocation = dynamic(
  () => import("@/src/components/Map/AutoCompleteLocation"),
  { ssr: false }
);

function InputSearchLocation({
  onPlaceChanged,
  isLoaded,
  onResult,
  placeHolder = "Pesquisar devolução",
  origin,
}) {
  return (
    <Grid container item xs={"auto"}>
      <Grid item xs={"auto"}>
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
      </Grid>
      <Grid item xs sx={{ p: "10px" }}>
        <AutoCompleteLocation
          placeholder={placeHolder}
          onPlaceChanged={onPlaceChanged}
          isLoaded={isLoaded}
          onResult={onResult}
          origin={origin}
        />
      </Grid>
    </Grid>
  );
}

export default InputSearchLocation;
