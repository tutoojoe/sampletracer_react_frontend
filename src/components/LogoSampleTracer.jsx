import { Typography } from "@mui/material";
import React from "react";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import default_url from './constants'
const LogoSampleTracer = () => {
  return (
    <Typography variant="h3" mt={2} >
      {/* <AvTimerIcon color="success" fontSize="large" />  */}
      SampleTracer
      {default_url}
      
    </Typography>
  );
};

export default LogoSampleTracer;
