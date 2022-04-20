import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
// import { margin } from "@mui/system";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Critical", "In delay", "On Time", "Caution"],
    datasets: [
      {
        label: "# of styles based on status",
        data: [2, 5, 25, 6],
        backgroundColor: [
          "rgba(230, 0, 0, 0.7)",
          "rgba(230,230,0,0.7)",
          "rgba(0, 160, 45, .7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(230, 0, 0, 1)",
          "rgba(230,230,0,1)",
          "rgba(0, 160, 45,1)",
          "rgba(255, 159, 64,1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box sx={{ boxShadow: 2, padding: 3 }}>
      <Typography variant="body1"> Live Styles Overview </Typography>
      <Pie data={data} />
    </Box>
  );
};

export default PieChart;
