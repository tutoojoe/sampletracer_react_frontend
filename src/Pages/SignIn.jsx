import React from "react";
import Container from "@mui/material/Container";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { default_url } from "../components/constants";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        SampleTracer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignIn = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const formSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  // react hook forms added here

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(validationOpt);
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${default_url}/api/user/login/`, data)
      .then(
        (res) => (
          console.log(res.data),
          console.log(res.data.user, "this is the user details"),
          dispatch(authActions.login(res.data)),
          navigate("/")
        )
      )
      .catch((error) => console.log(error.response.data));
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              SampleTracer
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box sx={{ mt: 3 }}>
              {/* form inputs */}
              <Grid container spacing={2}>
                {/* form first name */}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    {...register("email")}
                    autoComplete="email"
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    {...register("password")}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!!errors?.password}
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type=""
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/register">
                    Dont have an account? Register now
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </form>
    </ThemeProvider>
  );
};

export default SignIn;
