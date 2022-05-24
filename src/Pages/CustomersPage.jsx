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
import CustomerTable from "../components/Tables/CustomerTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

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
      {isAuth && (
        <>
          <PageHeader pagetitle="Customers Page" />
          <CustomerTable />
        </>
      )}
    </>
  );
};

export default CustomersPage;
