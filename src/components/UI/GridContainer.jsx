import React from "react";
import { Grid } from "@mui/material";

const GridContainer = (props) => {
  return (
    <Grid container spacing={props.spacing ? props.spacing : 2}>
      {props.children}
    </Grid>
  );
};

export default GridContainer;
