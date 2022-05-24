import React, { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { default_url } from "../constants";
import { Box, Container } from "@mui/material";

const CustomerTable = () => {
  const [customerDdata, setCustomerData] = useState([]);
  useEffect(() => {
    axios.get(`${default_url}/api/customers/`).then((res) => {
      console.log(res);
      console.log(res.data);
      setCustomerData(res.data);
    });
  }, []);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_active",
      label: "Active",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  return (
    <>
      {customerDdata.length === 0 && (
        <Container>
          <Box>
            <CircularProgress />
          </Box>
        </Container>
      )}
      {customerDdata.length > 0 && (
        <BaseTable
          columns={columns}
          data={customerDdata}
          title={"Customers"}
        ></BaseTable>
      )}
    </>
  );
};

export default CustomerTable;
