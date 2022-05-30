import React, { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../../components/api/axios";
import requestAPIs from "../../components/api/requestAPIs";
import { Box, Container } from "@mui/material";

const CustomerTable = () => {
  const [customerDdata, setCustomerData] = useState([]);
  const getCustomerList = async () => {
    try {
      const response = await axios.get(requestAPIs.customers);
      console.log(response);
      console.log(response.data);
      setCustomerData(response.data);
    } catch (error) {
      console.log("error in fetching customers list. Error:> ", error);
    }
  };
  useEffect(() => {
    getCustomerList();
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
