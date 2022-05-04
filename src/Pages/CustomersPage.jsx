import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavBar from "../components/NavBar";
import { Grid } from "@mui/material";
// import BasicCard from "../components/Card";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
import StyleListTable from "../components/Tables/StyleListTable";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { loginActions } from "../store/loginSlice";
import CustomerTable from "../components/CustomerTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomersPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.login.isAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* {!isAuth && navigate("/")} */}
      {isAuth && (
        <Container style={{ paddingTop: 5 }}>
          <Box
            sx={{
              alignContent: "center",
              boxShadow: 2,
              // marginTop: 3,
              marginBlock: 3,
              padding: 3,
            }}
          >
            <Typography variant="h4">Customers</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={12} xl={12}>
              {/* <StyleListTable /> */}
              <CustomerTable />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default CustomersPage;
