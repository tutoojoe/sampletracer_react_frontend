import React, { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "../../components/api/axios";
import requestAPIs from "../../components/api/requestAPIs";

const SupplierTable = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSupplierList = async () => {
    setIsLoading(true);

    try {
      const resultSupplierList = await axios.get(requestAPIs.suppliers);
      setSupplierData(resultSupplierList.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSupplierList();
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
      name: "supplier_name",
      label: "Supplier",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "contact_person",
      label: "Contact Person",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "supplier_email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "supplier_phone",
      label: "Phone No",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "supplier_address",
      label: "Address",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "state",
      label: "State",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "country",
      label: "Country",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  return (
    <>
      {supplierData.length === 0 && isLoading && <CircularProgress />}
      {supplierData.length > 0 && (
        <BaseTable
          columns={columns}
          data={supplierData}
          title={"Suppliers List"}
        />
      )}
    </>
  );
};

export default SupplierTable;
