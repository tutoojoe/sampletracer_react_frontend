import React, { useEffect, useState } from "react";
import BaseTable from "./BaseTable";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "../../components/api/axios";
import requestAPIs from "../../components/api/requestAPIs";
import { Box } from "@mui/material";

const StoreTables = () => {
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [processesData, setprocessesData] = useState([]);
  const [processLoading, setProcessLoading] = useState(false);
  const [accessoriesLoading, setAccessoriesLoading] = useState(false);

  const getProcessesList = async () => {
    setProcessLoading(true);

    try {
      const resultProcesses = await axios.get(requestAPIs.processes);

      setprocessesData(resultProcesses.data);
      console.log(resultProcesses.data);
      setProcessLoading(false);
    } catch (error) {
      setProcessLoading(false);
    }
  };

  const getAccessoriesList = async () => {
    setAccessoriesLoading(true);

    try {
      const resultAccessories = await axios.get(requestAPIs.accessories);
      setAccessoriesData(resultAccessories.data);
      setAccessoriesLoading(false);
    } catch (error) {
      setAccessoriesLoading(false);
    }
  };

  useEffect(() => {
    getAccessoriesList();
    getProcessesList();
  }, []);

  const accessoriesColumns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "item_name",
      label: "Item Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "qty_per_item",
      label: "Quantity",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "task_status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "style_no",
      label: "Style No",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "supplier",
      label: "Supplier",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "target_date",
      label: "Target Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "assigned_to",
      label: "Assigned to",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const processesColumns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "style_no",
      label: "Style No",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "process_name",
      label: "Process",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "qty_per_item",
      label: "Quantity",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "task_status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "supplier",
      label: "Supplier",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "assigned_to",
      label: "Assigned to",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "target_date",
      label: "Target Date",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  return (
    <>
      {accessoriesData.length === 0 && accessoriesLoading && (
        <CircularProgress />
      )}
      {accessoriesData.length === 0 && !accessoriesLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            border: 1,
            margin: 3,
            borderColor: "primary.main",
            borderRadius: 2,
          }}
        >
          <h3>No Accessories found</h3>
        </Box>
      )}
      {accessoriesData.length > 0 && (
        <BaseTable
          columns={accessoriesColumns}
          data={accessoriesData}
          title={"Accessories List"}
        />
      )}
      {processesData.length === 0 && processLoading && <CircularProgress />}
      {processesData.length === 0 && !processLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            border: 1,
            margin: 3,
            borderColor: "primary.main",
            borderRadius: 2,
          }}
        >
          <h3>No Processes found</h3>
        </Box>
      )}
      {processesData.length > 0 && (
        <BaseTable
          columns={processesColumns}
          data={processesData}
          title={"Processes List"}
        />
      )}
    </>
  );
};

export default StoreTables;
