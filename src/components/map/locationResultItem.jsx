const { Title } = require("@mui/icons-material");
import ResultMapStyle from "./ResultMap.module.css";
import { Grid, Typography } from "@mui/material";

const MapResultItem = ({ groupName, title, subtitle, onClick = () => {} }) => {
  const uniqueId = Math.random().toString(36).substr(2, 9);

  return (
    <Grid
      container
      item
      justifyContent={"space-between"}
      flexWrap={"nowrap"}
      direction={"row"}
      onClick={onClick}
      className={ResultMapStyle.resultItem}
    >
      <Grid item xs={"auto"}>
        <input type="radio" id={`result-map-id-${uniqueId}`} name={groupName} />
      </Grid>
      <Grid item xs minWidth={0}>
        <label htmlFor={`result-map-id-${uniqueId}`}>
          <Typography noWrap={true}>{title}</Typography>
        </label>
      </Grid>
      <Grid item xs={"auto"} color={"gray.main"}>
        <label htmlFor={`result-map-id-${uniqueId}`}>
          <span>{subtitle}</span>
        </label>
      </Grid>
    </Grid>
  );
};

const MapResultContainer = ({ children }) => {
  return (
    <Grid container item direction={"column"} xs={12}>
      {children}
    </Grid>
  );
};

export { MapResultItem, MapResultContainer };
