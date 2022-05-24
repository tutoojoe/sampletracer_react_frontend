import React from "react";
import { Box, Typography, Container } from "@mui/material";

const PageHeader = (props) => {
  return (
    <Box
      sx={{
        alignContent: "center",
        boxShadow: 2,
        // marginTop: 3,
        marginBlock: 3,
        padding: 3,
      }}
    >
      <Container>
        <Typography variant="h4">{props.pagetitle}</Typography>
      </Container>
    </Box>
  );
};

export default PageHeader;
