import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NavBar from "../components/NavBar";
import { Grid } from "@mui/material";
import BasicCard from "../components/Card";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import StyleListTable from "../components/Tables/StyleListTable";

const HomePage = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  //   const userdetails = useSelector((state) => state.auth.loggedUser);

  return (
    <div>
      {!isAuth && (
        <Container>
          <Typography variant="h3" marginTop={3}>
            Welcome to Sample Tracer
            <StyleListTable />
            <Typography>Please Sign In to continue</Typography>
          </Typography>

          <NavLink to="/signin" variant="body2">
            Click here to Sign in
          </NavLink>
        </Container>
      )}
      {isAuth && <NavBar />}

      {isAuth && (
        <Container>
          <Typography variant="h3" marginTop={3}>
            Welcome to Sample Tracer.
            <Typography>Samples are never late again</Typography>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6} xl={4}>
              <BasicCard></BasicCard>
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <BasicCard></BasicCard>
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <BasicCard></BasicCard>
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <BasicCard></BasicCard>
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <BasicCard></BasicCard>
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <BasicCard></BasicCard>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default HomePage;
