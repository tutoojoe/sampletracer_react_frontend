import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { default_url } from "../constants";
import { Grid } from "@mui/material";

const StyleListTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${default_url}/api/products/`).then((res) => {
      console.log(res);
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  //   const columns = ["Name", "Company", "City", "State"];
  const columns = [
    {
      name: "style_no",
      label: "Style No",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "style_description",
      label: "Description",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "season",
      label: "Season",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "product_group",
      label: "Product Group",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "delivery_date",
      label: "Delivery Date",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  //   const data = [
  //     ["Joe James", "Test Corp", "Yonkers", "NY"],
  //     ["John Walsh", "Test Corp", "Hartford", "CT"],
  //     ["Bob Herm", "Test Corp", "Tampa", "FL"],
  //     ["James Houston", "Test Corp", "Dallas", "TX"],
  //   ];

  const options = {
    filterType: "checkbox",
  };

  console.log(data);

  return (
    <Grid item xs={12} md={12} xl={12} sx={{ mb: 2 }}>
      <MUIDataTable
        title={"Style Details"}
        data={data}
        columns={columns}
        options={options}
      />
    </Grid>
  );
};

export default StyleListTable;
