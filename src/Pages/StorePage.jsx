import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import StoreTables from "../components/Tables/StoreTables";
import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import AddProcessForm from "../components/Forms/AddProcessForm";
import AddAccessoriesForm from "../components/Forms/AddAccessoriesForm";

const StorePage = () => {
  const isAuth = useSelector((state) => state.login.isAuth);
  const [addProcess, setAddProcess] = useState(false);
  const [addAccessories, setAddAccessories] = useState(false);
  const [addProcessModal, setAddProcessModal] = useState(false);
  const [addAccessoriesModal, setAddAccessoriesModal] = useState(false);
  const modalCloseHandler = () => {
    console.log("closehandler");
    setAddProcessModal(false);
    setAddAccessoriesModal(false);
  };
  const handleAddProcess = () => {
    console.log("adding process");
    setAddProcess(true);
    setAddProcessModal(true);
  };
  const handleAddAccessories = () => {
    console.log("adding accessories");
    setAddAccessories(true);
    setAddAccessoriesModal(true);
  };
  return (
    <>
      {isAuth && (
        <>
          <PageHeader pagetitle="Store Page" />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="outlined" onClick={handleAddProcess}>
              Add Processes
            </Button>
            {addProcess && (
              <AddProcessForm
                onAddProcess={addProcessModal}
                modalClose={modalCloseHandler}
              />
            )}
            {addAccessories && (
              <AddAccessoriesForm
                onAddAccessory={addAccessoriesModal}
                modalClose={modalCloseHandler}
              />
            )}
            <Button variant="outlined" onClick={handleAddAccessories}>
              Add Accessories
            </Button>
          </Box>
          <StoreTables />
        </>
      )}
    </>
  );
};

export default StorePage;
