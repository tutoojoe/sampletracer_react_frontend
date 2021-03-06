import * as React from "react";
import { useState } from "react";
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
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../components/api/axios";
import requestAPIs from "../components/api/requestAPIs";

// import { default_url } from "../components/constants";
// import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import Alert from "@mui/material/Alert";
import { LinearProgress } from "@mui/material";

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

const theme = createTheme();

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const [regStatus, setRegStatus] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  // yup validations
  const formSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is required")
      .min(4, "First Name should contain at least 4 letters."),
    last_name: Yup.string().required("Last Name is required"),
    // username: Yup.string().required("Unique username is required"), removed and added email as the login parameter

    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email id"
      ),
    password1: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        " Password requires Minimum eight characters, at least one letter, one number and one special character:"
      ),
    password2: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password1")], "Passwords must and should match"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };

  // react hook forms added here
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(validationOpt);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data);

    try {
      const res = await axios.post(requestAPIs.register, data);
      console.log(res.data);
      console.log(res.data.user);
      console.log(res);
      dispatch(authActions.login(res.data));
      setIsSubmitting(false);
      setRegStatus("success");
      setAlertContent("Registration Successful");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        setAlertContent("");

        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setRegStatus("error");
      setAlertContent("Some error..!!");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        setAlertContent("");
      }, 1500);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 3,
              padding: 2,
              // bgcolor: "antiquewhite",
            }}
          >
            <Typography component="h1" variant="h4">
              SampleTracer
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box sx={{ mt: 3 }}>
              {/* form inputs */}
              <Grid container spacing={2}>
                {/* form first name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    autoCapitalize=""
                    {...register("first_name")}
                    fullWidth
                    id="first_name"
                    label="First Name"
                    autoFocus
                    error={!!errors?.first_name}
                    helperText={
                      errors?.first_name ? errors.first_name.message : null
                    }
                  />
                </Grid>

                {/* form last name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    {...register("last_name")}
                    autoComplete="last-name"
                    error={!!errors?.last_name}
                    helperText={
                      errors?.last_name ? errors.last_name.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
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
                    {...register("password1")}
                    label="Password"
                    type="password"
                    id="password1"
                    autoComplete="new-password"
                    error={!!errors?.password1}
                    helperText={
                      errors?.password1 ? errors.password1.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    {...register("password2")}
                    label="Re-enter Password"
                    type="password"
                    id="password2"
                    autoComplete="new-password"
                    error={!!errors?.password2}
                    helperText={
                      errors?.password2 ? errors.password2.message : null
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
                Register
              </Button>
              {isSubmitting && <LinearProgress />}
              {!isSubmitting && alert ? (
                <Alert severity={regStatus}>{alertContent}</Alert>
              ) : (
                <></>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/signin" variant="body2">
                    Already have an account? Sign in
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
}
