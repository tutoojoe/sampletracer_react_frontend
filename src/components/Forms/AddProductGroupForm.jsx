import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "../api/axios";
import { Button, LinearProgress } from "@mui/material";
import BasicModal from "../Modals/BasicModal";
import requestAPIs from "../api/requestAPIs";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { socket } from "../server/socketIO";

const AddProductGroupForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const [fade, setFade] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  socket.on("product_group_added", (msg) => {
    console.log("Product groupadded. Msg>", msg);
  });

  const formSubmitHandler = (data) => {
    console.log("form submitted - data= ", data);
    setIsSubmitting(true);
    axios
      .post(requestAPIs.productgroups, data)
      .then((response) => {
        console.log("response", response);
        setIsSubmitting(false);
        setAlert(true);
        setFade(true);
        setAlertContent(`Product Group ${response.statusText}`);
        socket.emit("product_group_add", { data: "group added" });
        setTimeout(() => {
          setFade(false);
        }, 1500);
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("error", error);
        setIsSubmitting(false);
        setAlert(true);
        setAlertContent(error);
        setTimeout(() => {
          setFade(false);
        }, 1500);
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      });
  };

  const formSchema = Yup.object().shape({
    product_group: Yup.string().required("A Productgroup Name is required"),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(validationOpt);

  return (
    <BasicModal
      title="Add Product Group"
      modalOpen={props.addProductGroup}
      handleClose={props.modalClose}
    >
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <TextField
          fullWidth
          id="product_group"
          label="Add Product Group"
          {...register("product_group")}
          // autoComplete="email"
          error={!!errors?.product_group}
          helperText={
            errors?.product_group ? errors.product_group.message : null
          }
        />
        <Button type="" fullWidth sx={{ mt: 2 }} variant="outlined">
          Add
        </Button>
        {isSubmitting && <LinearProgress sx={{ mt: 1 }} />}
        {!isSubmitting && alert ? (
          <Fade in={fade}>
            <Alert severity="success" sx={{ mt: 1, mb: 1 }}>
              {alertContent}
            </Alert>
          </Fade>
        ) : (
          <></>
        )}
      </form>
    </BasicModal>
  );
};

export default AddProductGroupForm;

{
  /* <FormControl>
          <InputLabel htmlFor="product_group_name">
            Product Group Name
          </InputLabel>
          <Input id="product_group_name" aria-describedby="helper-text" />
          <FormHelperText id="helper-text">
            Please enter Product group name.
          </FormHelperText>
          <Button type="submit" component="span" variant="outlined">
            Add
          </Button>
        </FormControl> */
}
