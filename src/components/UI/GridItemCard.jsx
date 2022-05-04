import React from "react";
import { Grid } from "@mui/material";

const GridItemCard = (props) => {
  return (
    <Grid
      item
      xs={props.xs ? props.xs : 12}
      md={props.md ? props.md : 6}
      xl={props.xl ? props.xl : 4}
    >
      {props.children}
    </Grid>
  );
};

export default GridItemCard;
