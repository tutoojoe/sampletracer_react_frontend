import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "../../components/api/axios";
import requestAPIs from "../../components/api/requestAPIs";

import { Grid, CircularProgress, Box } from "@mui/material";
import { socket } from "../server/socketIO";

const StyleListTable = () => {
  const [data, setData] = useState([]);
  const [newProductAdded, setNewProductAdded] = useState(false);
  const [productUpdate, setProductUpdate] = useState(false);

  // socket.on("product_added", (msg) => {
  //   console.log("retrieving styles after product add" + msg);
  //   getStyles();
  // });

  const getStyles = async () => {
    setProductUpdate(true);
    const res = await axios.get(requestAPIs.products);
    setData(res.data);
    setProductUpdate(false);
    setNewProductAdded(false);
  };
  useEffect(() => {
    socket.on("product_added", (msg) => {
      setNewProductAdded(true);
    });
  });
  useEffect(() => {
    getStyles();
  }, [newProductAdded]);

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
      {productUpdate && <CircularProgress />}
      {!productUpdate && (
        <MUIDataTable
          title={"Style Details"}
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </Grid>
  );
};

export default StyleListTable;
