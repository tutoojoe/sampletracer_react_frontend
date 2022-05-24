import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { default_url } from "../constants";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";

const BaseTable = (props) => {
  const options = {
    // filterType: "checkbox",
  };

  return (
    <Container>
      <Grid item xs={12} md={12} xl={12} sx={{ mt: 2, mb: 2 }}>
        <MUIDataTable
          title={props.title}
          data={props.data}
          columns={props.columns}
          options={options}
          sx={{ mt: 2, mb: 2 }}
        />
      </Grid>
    </Container>
  );
};

export default BaseTable;
