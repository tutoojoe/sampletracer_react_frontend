import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import NavBar from "../components/NavBar";
import { Button, Paper } from "@mui/material";
// import BasicCard from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import StyleListTable from "../components/Tables/StyleListTable";
import Box from "@mui/material/Box";
import PieChart from "../components/Charts/PieChart";
// import LogoutConfirmAlert from "../components/Alerts/LogoutConfirmAlert";
import BarChart from "../components/Charts/BarChart";
import DoughnutChart from "../components/Charts/DoughnutChart";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import axios from "axios";
import axios from "../components/api/axios";
import requestAPIs from "../components/api/requestAPIs";
import { loginActions } from "../store/loginSlice";

import GridContainer from "../components/UI/GridContainer";
import AddProductGroupForm from "../components/Forms/AddProductGroupForm";
import AddProductForm from "../components/Forms/AddProductForm";
import { socket } from "../components/server/socketIO";
import StyleListTable from "../components/Tables/StyleListTable";
import ElasticSearch from "../components/ElasticSearch";
import MuiAccordion from "../components/UI/MuiAccordion";
// import io from "socket.io-client";

// // // const socket = io("http://localhost:8000");
// // // const io = require("socket.io-client");
// const socket = io("http://localhost:8000");
// // import { default_url } from "../components/constants";
// socket.on("connect", () => {
//   console.log("connected inside frontend client");
//   socket.emit("my_event", { data: "connected inside client" });
// });
// socket.on("my_response", (msg) => {
//   console.log("my-response >", msg.data, msg.count);
// });

const HomePage = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const dispatch = useDispatch();
  const [initialCheck, setInitialCheck] = useState(true);
  const isAuth = useSelector((state) => state.login.isAuth);
  // const logStatus = useSelector((state) => state.login.logoutStatus);
  const [addProductGroup, setAddProductGroup] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [openProdModal, setOpenProdModal] = useState(false);
  const addProductGroupHandler = () => {
    console.log("product group initial- ", addProductGroup);
    setAddProductGroup(true);
    setOpenGroupModal(true);
    console.log("add product group status - ", addProductGroup);
    console.log(openGroupModal);
  };

  const addProductHandler = () => {
    console.log("product add ", addProduct);
    setAddProduct(true);
    setOpenProdModal(true);

    console.log("add product group status - ", addProduct);
    console.log(openProdModal);
  };

  const modalCloseHandler = () => {
    console.log("closehandler");
    setOpenGroupModal(false);
    setOpenProdModal(false);
  };
  useEffect(() => {
    if (!isAuth) {
      console.log("not");

      const accessToken = sessionStorage?.getItem("accessJWT")
        ? sessionStorage.getItem("accessJWT")
        : null;
      const refreshToken = JSON.parse(localStorage?.getItem("userRefresh"))
        ? JSON.parse(localStorage?.getItem("userRefresh"))
        : null;
      if (accessToken && refreshToken) {
        // console.log(accessToken, "this is access token");
        // console.log("refresh token", refreshToken);
        // console.log("refresh token", refreshToken["refreshJWT"]);

        axios
          .post(requestAPIs.tokenverify, { token: `${accessToken}` })
          .then(function (response) {
            console.log("success response", response);
            if (response.status === 200) {
              console.log("valid access key, authorizaition successful");
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
                sessionStorage.setItem("accessJWT", response.data.access);
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
  }, [isAuth, dispatch]);
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

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              // bgcolor: "primary.main",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                alignItems: "center",
                width: "20rem",
                padding: 2,
                // bgcolor: "ivory",
                height: "10rem",
              }}
            >
              <Typography variant="h3" marginTop={3}>
                Sample Tracer
                <Typography
                  variant="body2"
                  marginTop={3}
                  sx={{ paddingLeft: 2, paddingRight: 2 }}
                >
                  Please Sign In to continue
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ paddingLeft: 2, paddingRight: 2 }}
                >
                  <NavLink to="/signin" variant="body2">
                    Click here to Sign in
                  </NavLink>
                </Typography>
              </Typography>
            </Paper>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              border: 1,
              borderRadius: 1,
              borderColor: "primary.main",
              padding: 2,
              marginBlock: 2,
            }}
          >
            <Button onClick={addProductGroupHandler}>Add Product group</Button>
            {addProductGroup && (
              <AddProductGroupForm
                addProductGroup={openGroupModal}
                modalClose={modalCloseHandler}
              />
            )}
            <Button onClick={addProductHandler}>Add Product</Button>
            {addProduct && (
              <AddProductForm
                addProduct={openProdModal}
                modalClose={modalCloseHandler}
              />
            )}
          </Box>
          <GridContainer>
            {/* <ElasticSearch /> */}
            <MuiAccordion />

            <PieChart />
            <DoughnutChart />
            {/* <BarChart /> */}
            <StyleListTable />
          </GridContainer>
          {/* <GridContainer>
            <GridItemCard>
              <PieChart />
            </GridItemCard>

            <GridItemCard>
              <DoughnutChart />
            </GridItemCard>
            <GridItemCard>
              <BarChart />
            </GridItemCard>
            <GridItemCard xs={12} md={12} xl={12}>
              <StyleListTable />
            </GridItemCard>
          </GridContainer> */}
        </Container>
      )}
    </div>
  );
};

export default HomePage;
