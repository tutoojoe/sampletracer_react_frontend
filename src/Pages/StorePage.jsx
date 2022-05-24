import React from "react";
import { Container } from "@mui/material";
import { Box, Typography } from "@mui/material";
import StoreTables from "../components/Tables/StoreTables";
import GridContainer from "../components/UI/GridContainer";
import GridItemCard from "../components/UI/GridItemCard";
import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";

const StorePage = () => {
  const isAuth = useSelector((state) => state.login.isAuth);
  return (
    <>
      {isAuth && (
        <>
          <PageHeader pagetitle="Store Page" />

          <StoreTables />
        </>
      )}
    </>
  );
};

export default StorePage;
