import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "../api/axios";
import { Button, LinearProgress, Fade, Stack } from "@mui/material";
import BasicModal from "../Modals/BasicModal";
import requestAPIs from "../api/requestAPIs";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { red } from "@mui/material/colors";
import { socket } from "../server/socketIO";

const AddProductForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const [fade, setFade] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [seasonList, setSeasonList] = useState([]);
  const [season, setSeason] = useState("");
  const [productGroupList, setProductGroupList] = useState([]);
  const [productGroup, setProductGroup] = useState("");
  const [merchandiserList, setMerchandiserList] = useState([]);
  const [merchandiser, setMerchandiser] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [customer, setCustomer] = useState("");
  const [delDate, setDelDate] = useState();
  const [detailRecdDate, setDetailRecdDate] = useState();

  const productGroupSelectHandler = (e) => {
    setProductGroup(e.target.value);
  };
  const seasonSelectHandler = (e) => {
    setSeason(e.target.value);
  };
  const merchandiserSelectHandler = (e) => {
    setMerchandiser(e.target.value);
  };
  const customerSelectHandler = (e) => {
    setCustomer(e.target.value);
  };

  useEffect(() => {
    // get productgroups
    socket.emit("addproduct", { msg: "adding product" });
    axios
      .get(requestAPIs.productgroups)
      .then((res) => {
        console.log("this is response productgroups.", res);
        console.log("response data", res.data);
        setProductGroupList(res.data);
        console.log("data saved");
      })
      .catch((err) => {
        console.log("some error in retrieving product groups");
      });

    axios
      .get(requestAPIs.seasons)
      .then((res) => setSeasonList(res.data))
      .catch((err) => {
        console.log("some error in getting Season details");
      });

    axios
      .get(requestAPIs.merchandisers)
      .then((res) => setMerchandiserList(res.data))
      .catch((err) => {
        console.log("some error in getting Merchandiser details");
      });
    axios
      .get(requestAPIs.customers)
      .then((res) => setCustomerList(res.data))
      .catch((err) => {
        console.log("some error in getting Merchandiser details");
      });
    console.log(productGroupList);
    console.log(customerList);
    console.log(merchandiserList);
    console.log(seasonList);
  }, []);

  const formSubmitHandler = (data) => {
    console.log("this is data", data);
    setIsSubmitting(true);
    const submitdata = async () => {
      try {
        const resultdata = await axios.post(requestAPIs.addProduct, data);
        console.log(resultdata);
        setIsSubmitting(false);
        setAlertContent(`Product successfully ${resultdata.statusText}`);

        setAlert(true);
        setFade(true);
        setTimeout(() => {
          setFade(false);
        }, 2500);
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      } catch (error) {
        console.log("some error occured - ", error);
        setIsSubmitting(false);
        setAlert(true);
        setAlertContent(`Product not added`);
        setTimeout(() => {
          setFade(false);
        }, 2500);
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      }
    };
    submitdata();
  };

  const formSchema = Yup.object().shape({
    style_no: Yup.string().required("A Product Name is required"),
    style_description: Yup.string().required("A Style Description is required"),
    size: Yup.string().required("Size is required"),
    season: Yup.number().required("Select Season"),
    product_group: Yup.number().required("Select Product Group"),
    customer: Yup.number().required("Select Customer"),
    merchandiser: Yup.number().required("Select Merchandiser"),
    delivery_date: Yup.string().required("Select Delivery Date"),
    details_received_date: Yup.string().required("Select Details received on"),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(validationOpt);

  return (
    <BasicModal
      modalOpen={props.addProduct}
      handleClose={props.modalClose}
      title="Add Product"
    >
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Stack spacing={2} direction="column">
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              id="style_no"
              label="Style No"
              {...register("style_no")}
              error={!!errors?.style_no}
              helperText={errors?.style_no ? errors.style_no.message : null}
            />
            <TextField
              fullWidth
              id="style_description"
              label="Style Description"
              {...register("style_description")}
              error={!!errors?.style_description}
              helperText={
                errors?.style_description
                  ? errors.style_description.message
                  : null
              }
            />
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField
              sx={{ width: "10rem" }}
              id="size"
              label="Size"
              {...register("size")}
              error={!!errors?.size}
              helperText={errors?.size ? errors.size.message : null}
            />

            <TextField
              sx={{ m: 1, minWidth: "10rem" }}
              id="product_group"
              {...register("product_group")}
              select
              label="Product Group"
              value={productGroup}
              onChange={productGroupSelectHandler}
              error={!!errors?.product_group}
              helperText={
                errors?.product_group ? errors.product_group.message : null
              }
            >
              {productGroupList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.product_group}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              sx={{ minWidth: "10rem" }}
              id="season"
              {...register("season")}
              select
              label="Season"
              value={season}
              onChange={seasonSelectHandler}
              error={!!errors?.season}
              helperText={errors?.season ? errors.season.message : null}
            >
              {seasonList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.season}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField
              sx={{ minWidth: "16rem" }}
              id="customer"
              {...register("customer")}
              select
              label="Customer"
              value={customer}
              onChange={customerSelectHandler}
              error={!!errors?.customer}
              helperText={errors?.customer ? errors.customer.message : null}
            >
              {customerList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.first_name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              sx={{ minWidth: "16rem" }}
              id="merchandiser"
              {...register("merchandiser")}
              select
              label="Merchandiser"
              value={merchandiser}
              onChange={merchandiserSelectHandler}
              error={!!errors?.merchandiser}
              helperText={
                errors?.merchandiser ? errors.merchandiser.message : null
              }
            >
              {merchandiserList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.first_name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField
              type="date"
              id="details_received_date"
              label="Details Received on"
              {...register("details_received_date")}
              InputLabelProps={{ shrink: true }}
              error={!!errors?.details_received_date}
              helperText={
                errors?.details_received_date
                  ? errors.details_received_date.message
                  : null
              }
            />
            <TextField
              type="date"
              id="delivery_date"
              label="Delivery Date"
              {...register("delivery_date")}
              InputLabelProps={{ shrink: true }}
              error={!!errors?.delivery_date}
              helperText={
                errors?.delivery_date ? errors.delivery_date.message : null
              }
            />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Details Received on"
                {...register("details_received_date")}
                mask="____-__-__"
                inputFormat="yyyy-MM-dd"
                format="yyyy-MM-dd"
                value={detailRecdDate}
                onChange={(newValue) => {
                  console.log(newValue);
                  setDetailRecdDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                error={!!errors?.details_received_date}
                helperText={
                  errors?.details_received_date
                    ? errors.details_received_date.message
                    : null
                }
              />
            </LocalizationProvider> */}
            {/* <LocalizationProvider
              dateAdapter={AdapterDateFns}
              sx={{ width: "10rem" }}
            >
              <DatePicker
                {...register("delivery_date")}
                label="Delivery Date"
                value={delDate}
                inputFormat="yyyy-MM-dd"
                format="yyyy-MM-dd"
                mask="____-__-__"
                onChange={(newValue) => {
                  setDelDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                error={!!errors?.delivery_date}
                helperText={
                  errors?.delivery_date ? errors.delivery_date.message : null
                }
              />
            </LocalizationProvider> */}
          </Stack>

          <Button type="" fullWidth sx={{ mt: 2 }} variant="outlined">
            Add
          </Button>
          {isSubmitting && <LinearProgress sx={{ mt: 1 }} />}
          {!isSubmitting && alert ? (
            <Fade in={fade}>
              <Alert severity="success" sx={{ mt: 1, mb: 1, color: red }}>
                {alertContent}
              </Alert>
            </Fade>
          ) : (
            <></>
          )}
        </Stack>
      </form>
    </BasicModal>
  );
};

export default AddProductForm;
