import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "../api/axios";
import { Button, LinearProgress, MenuItem, Stack } from "@mui/material";
import BasicModal from "../Modals/BasicModal";
import requestAPIs from "../api/requestAPIs";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { socket } from "../server/socketIO";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const AddProcessForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const [fade, setFade] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [targetDate, setTargetDate] = useState();
  const [finishDate, setFinishDate] = useState();
  const [stylesList, setStylesList] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");

  socket.on("add_process", (msg) => {
    console.log("Product groupadded. Msg>", msg);
  });
  const styleSelectHandler = (e) => {
    setSelectedStyle(e.target.value);
  };
  const getStylesList = async () => {
    try {
      const result = await axios.get(requestAPIs.products);
      console.log(result.data);
      setStylesList(result.data);
    } catch (error) {
      console.log("Product list could not be fetched.");
    }
  };
  useEffect(() => {
    getStylesList();
  }, []);
  const formSubmitHandler = (data) => {
    console.log("form submitted - data= ", data);
    setIsSubmitting(true);
    axios
      .post(requestAPIs.processes, data)
      .then((response) => {
        console.log("response", response);
        setIsSubmitting(false);
        setAlert(true);
        setFade(true);
        setAlertContent(`Product Group ${response.statusText}`);

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
    style_no: Yup.number().required("Select style from the list"),
    process_name: Yup.string().required("A Process Name is required"),
    process_units: Yup.string().required("A unit is required"),
    qty_per_item: Yup.string().required("Quantity for each garment."),
    season: Yup.number().required("Select Season"),
    product_group: Yup.number().required("Select Product Group"),
    customer: Yup.number().required("Select Customer"),
    merchandiser: Yup.number().required("Select Merchandiser"),
    target_date: Yup.string().required("Select Target Date"),
    finish_date: Yup.string().required("Select finished date (Actual)."),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(validationOpt);
  return (
    <BasicModal
      title="Add Process"
      modalOpen={props.onAddProcess}
      handleClose={props.modalClose}
    >
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="process_name"
            label="Add Process"
            {...register("process_name")}
            // autoComplete="email"
            error={!!errors?.process_name}
            helperText={
              errors?.process_name ? errors.process_name.message : null
            }
          />
          <Stack direction="row" spacing={2}>
            <TextField
              sx={{ minWidth: "12rem" }}
              id="style_no"
              {...register("style_no")}
              select
              label="Style No"
              value={selectedStyle}
              onChange={styleSelectHandler}
              error={!!errors?.style_no}
              helperText={errors?.style_no ? errors.style_no.message : null}
            >
              {stylesList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.style_no}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="qty_per_item"
              label="Quantity per pc"
              {...register("qty_per_item")}
              // autoComplete="email"
              error={!!errors?.qty_per_item}
              helperText={
                errors?.qty_per_item ? errors.qty_per_item.message : null
              }
            />
            <TextField
              id="process_units"
              label="Units"
              {...register("process_units")}
              // autoComplete="email"
              error={!!errors?.process_units}
              helperText={
                errors?.process_units ? errors.process_units.message : null
              }
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Target Date"
                {...register("target_date")}
                mask="____-__-__"
                inputFormat="yyyy-MM-dd"
                format="yyyy-MM-dd"
                value={targetDate}
                onChange={(newValue) => {
                  setTargetDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                error={!!errors?.target_date}
                helperText={
                  errors?.target_date ? errors.target_date.message : null
                }
              />
            </LocalizationProvider>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...register("finish_date")}
                label="Finish Date"
                value={finishDate}
                inputFormat="yyyy-MM-dd"
                format="yyyy-MM-dd"
                mask="____-__-__"
                onChange={(newValue) => {
                  setFinishDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                error={!!errors?.finish_date}
                helperText={
                  errors?.finish_date ? errors.finish_date.message : null
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
              <Alert severity="success" sx={{ mt: 1, mb: 1 }}>
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

export default AddProcessForm;

// {
//     "process_name": "string",
//     "purchase_units": "string",
//     "qty_per_item": "string",
//     "task_status": true,
//     "target_date": "2022-05-29",
//     "finish_date": "2022-05-29",
//     "style_no": 0,
//     "supplier": 0,
//     "assigned_to": [
//       0
//     ],
//     "assigned_by": [
//       0
//     ]
//   }
