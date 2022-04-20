import React, { useEffect, useState } from "react";
import BaseTable from "./Tables/BaseTable";
import axios from "axios";
import { default_url } from "../components/constants";

const CustomerTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${default_url}/api/customers/`).then((res) => {
      console.log(res);
      console.log(res.data);
      setData(res.data);
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
    <BaseTable columns={columns} data={data} title={"Customers"}></BaseTable>
  );
};

export default CustomerTable;
