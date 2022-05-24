import React, { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "../axios";
import requestAPIs from "../requestAPIs";

const MerchandiserTable = () => {
  const [merchandiserData, setMerchandiserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessoriesLoading, setAccessoriesLoading] = useState(false);

  const getMerchList = async () => {
    setIsLoading(true);

    try {
      const resultMerchList = await axios.get(requestAPIs.merchandisers);
      setMerchandiserData(resultMerchList.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMerchList();
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
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_active",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  return (
    <>
      {merchandiserData.length === 0 && isLoading && <CircularProgress />}
      {merchandiserData.length > 0 && (
        <BaseTable
          columns={columns}
          data={merchandiserData}
          title={"Merchandisers List"}
        />
      )}
    </>
  );
};

export default MerchandiserTable;
