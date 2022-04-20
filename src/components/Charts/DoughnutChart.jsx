import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
// import { margin } from "@mui/system";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["cust1", "cust2", "cust3", "cust4"],
    datasets: [
      {
        label: "# of styles",
        data: [210, 205, 170, 110],
        backgroundColor: [
          "rgba(200, 200, 160, 0.5)",
          "rgba(100,120,100,0.5)",
          "rgba(20, 100, 200, .5)",
          "rgba(100, 10, 250, 0.5)",
        ],
        borderColor: [
          "rgba(200, 200, 160,1)",

          "rgba(100,120,100,1)",

          "rgba(20, 100, 200, 1)",

          "rgba(100, 10, 250, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ boxShadow: 2, padding: 3 }}>
      <Typography variant="body1">Styles Per customer</Typography>
      <Doughnut data={data} />
    </Box>
  );
};

export default DoughnutChart;
