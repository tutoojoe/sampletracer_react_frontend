import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { default_url } from "../constants";
import { Grid } from "@mui/material";

const BaseTable = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${default_url}/api/products/`).then((res) => {
      console.log(res);
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  //   const columns = ["Name", "Company", "City", "State"];
  //   const columns = [
  //     {
  //       name: "style_no",
  //       label: "Style No",
  //       options: {
  //         filter: true,
  //         sort: true,
  //       },
  //     },
  //   ];
  const options = {
    filterType: "checkbox",
  };

  return (
    <Grid item xs={12} md={12} xl={12}>
      <MUIDataTable
        title={props.title}
        data={props.data}
        columns={props.columns}
        options={options}
      />
    </Grid>
  );
};

export default BaseTable;
