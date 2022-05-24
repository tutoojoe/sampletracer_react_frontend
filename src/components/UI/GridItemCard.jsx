import React from "react";
import { Grid, Paper } from "@mui/material";

const GridItemCard = (props) => {
  return (
    <Grid
      item
      xs={props.xs ? props.xs : 12}
      md={props.md ? props.md : 6}
      xl={props.xl ? props.xl : 4}
    >
      <Paper elevation={2}>{props.children}</Paper>
    </Grid>
  );
};

export default GridItemCard;
