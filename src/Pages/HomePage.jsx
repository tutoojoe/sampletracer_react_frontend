import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import NavBar from "../components/NavBar";
import { Button, Grid } from "@mui/material";
import BasicCard from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import StyleListTable from "../components/Tables/StyleListTable";
import Box from "@mui/material/Box";
import PieChart from "../components/Charts/PieChart";
// import LogoutConfirmAlert from "../components/Alerts/LogoutConfirmAlert";
import BarChart from "../components/Charts/BarChart";
import DoughnutChart from "../components/Charts/DoughnutChart";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import axios from "axios";
import axios from "../components/axios";
import requestAPIs from "../components/requestAPIs";
import { loginActions } from "../store/loginSlice";

import GridItemCard from "../components/UI/GridItemCard";
import GridContainer from "../components/UI/GridContainer";
import AddProductGroupForm from "../components/Forms/AddProductGroupForm";

// import { default_url } from "../components/constants";

const HomePage = () => {
  const dispatch = useDispatch();
  const [initialCheck, setInitialCheck] = useState(true);
  const isAuth = useSelector((state) => state.login.isAuth);
  // const logStatus = useSelector((state) => state.login.logoutStatus);
  const [addProductGroup, setAddProductGroup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const addProductGroupHandler = () => {
    console.log("product initial- ", addProductGroup);
    setAddProductGroup(true);
    setOpenModal(true);

    console.log("add product group status - ", addProductGroup);
    console.log(openModal);
  };

  const modalCloseHandler = () => {
    console.log("closehandler");
    setOpenModal(false);
  };
  useEffect(() => {
    if (!isAuth) {
      console.log("not");

      const accessToken = sessionStorage?.getItem("accessJWT");
      const refreshToken = JSON.parse(localStorage?.getItem("userRefresh"));
      if (accessToken && refreshToken) {
        console.log(accessToken);
        console.log("refresh token", refreshToken);
        console.log("refresh token", refreshToken["refreshJWT"]);

        axios
          // .post(`${default_url}/api/user/token/verify/`, {
          .post(requestAPIs.tokenverify, {
            token: `${accessToken}`,
          })
          .then(function (response) {
            console.log("success response", response);
            if (response.status === 200) {
              console.log("valid key, authorizaition successful");
              dispatch(loginActions.loginSuccess());
            }
          })
          .catch(function (error) {
            console.log("error =>", error);
            axios
              // .post(`${default_url}/api/token/refresh/`, {
              .post(requestAPIs.tokenrefresh, {
                refresh: `${refreshToken.refreshJWT}`,
              })
              .then((response) => {
                console.log(response);
                sessionStorage.setItem("accessJWT", response.data.access_token);
                dispatch(loginActions.loginSuccess());
              })
              .catch((error) => {
                console.log("refresh token also expired");
                setInitialCheck(false);
              });
          });
      } else {
        console.log("user logged out no tokens");
        setInitialCheck(false);
      }
    }
  }, [isAuth]);
  // const userdetails = useSelector((state) => state.auth.loggedUser);

  return (
    <div>
      {!isAuth && initialCheck && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <Typography variant="body1">
            Please wait while we try to login..
          </Typography>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {/* {isAuth && logStatus && <LogoutConfirmAlert />} */}

      {!isAuth && (
        <Container>
          <Box
            sx={{
              marginTop: 8,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
              // bgcolor: "primary.main",
            }}
          >
            <Typography variant="h3" marginTop={3}>
              Welcome to Sample Tracer
              <Typography>Please Sign In to continue</Typography>
            </Typography>

            <NavLink to="/signin" variant="body2">
              Click here to Sign in
            </NavLink>
          </Box>
        </Container>
      )}

      {isAuth && (
        <Container>
          <Box>
            <Typography variant="h3" marginTop={3}>
              Welcome to Sample Tracer.
              <Typography>Samples are never late again</Typography>
            </Typography>
          </Box>
          <Button onClick={addProductGroupHandler}>Add Product group</Button>
          {addProductGroup && (
            <AddProductGroupForm
              addProductGroup={openModal}
              modalClose={modalCloseHandler}
            />
          )}
          <GridContainer>
            <GridItemCard>
              <PieChart />
            </GridItemCard>
            <GridItemCard>
              <BarChart />
            </GridItemCard>
            <GridItemCard>
              <DoughnutChart />
            </GridItemCard>
            <GridItemCard xs={12} md={12} xl={12}>
              <StyleListTable />
            </GridItemCard>
          </GridContainer>
        </Container>
      )}
    </div>
  );
};

export default HomePage;
