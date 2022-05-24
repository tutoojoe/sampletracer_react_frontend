import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker";
import { Box, Typography } from "@mui/material";
import GridItemCard from "../UI/GridItemCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly - new vs delivered",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    // "May",
    // "June",
    // "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "New styles",
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
        data: [60, 75, 85, 70],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Delivered",
        data: [80, 70, 93, 66],

        // data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <GridItemCard>
      <Box sx={{ boxShadow: 2, padding: 3, alignContent: "stretch" }}>
        <Typography variant="body1"> New vs Delivered </Typography>
        <Bar options={options} data={data} />
      </Box>
    </GridItemCard>
  );
};

export default BarChart;
