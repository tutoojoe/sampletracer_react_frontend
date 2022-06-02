import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  LinearProgress,
  Fade,
} from "@mui/material";
import { red } from "@mui/material/colors";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BasicModal from "../Modals/BasicModal";
import axios from "../api/axios";
import requestAPIs from "../api/requestAPIs";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const AddAccessoriesForm = (props) => {
  const [stylesList, setStylesList] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [Cdate, setDate] = useState();
  const userdetail = useSelector((state) => state.user.user);
  const userId = { assigned_by: [userdetail.pk] };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(false);
  const [fade, setFade] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const unitsList = [
    { id: 1, value: "Kilos" },
    { id: 2, value: "Nos" },
    { id: 3, value: "Pcs" },
    { id: 4, value: "Dozens" },
    { id: 5, value: "Grams" },
  ];

  const getStylesList = async () => {
    try {
      const result = await axios.get(requestAPIs.products);
      // console.log(result.data);
      setStylesList(result.data);
    } catch (error) {
      console.log("Product list could not be fetched.");
    }
  };

  useEffect(() => {
    getStylesList();
  }, []);
  const formSubmitHandler = (data) => {
    const updatedData = Object.assign(data, userId);
    console.log(updatedData);
    setIsSubmitting(true);
    const submitData = async () => {
      try {
        const resultData = await axios.post(
          requestAPIs.accessories,
          updatedData
        );
        console.log(resultData);
        setIsSubmitting(false);
        setAlert(true);
        setAlertContent(`Accessory ${resultData.statusText}`);

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
    submitData();
  };

  const formSchema = Yup.object().shape({
    item_name: Yup.string().required("A Process Name is required"),
    style_no: Yup.number().required("Select style from the list."),
    qty_per_item: Yup.string().required("Please add quantity per piece."),
    purchase_units: Yup.string().required("Please select the purchase unit."),
    target_date: Yup.string().required("Please select a date"),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(validationOpt);

  const styleSelectHandler = (e) => {
    setSelectedStyle(e.target.value);
  };
  const unitSelectHandler = (e) => {
    setSelectedUnit(e.target.value);
  };
  return (
    <BasicModal
      title="Add Accessory"
      modalOpen={props.onAddAccessory}
      handleClose={props.modalClose}
    >
      <Box sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="item_name"
              label="Item Name"
              {...register("item_name")}
              autoComplete="item_name"
              error={!!errors?.item_name}
              helperText={errors?.item_name ? errors.item_name.message : null}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
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
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                id="qty_per_item"
                label="Quantity per pc"
                sx={{ minWidth: "6rem" }}
                {...register("qty_per_item")}
                error={!!errors?.qty_per_item}
                helperText={
                  errors?.qty_per_item ? errors.qty_per_item.message : null
                }
              />

              <TextField
                id="purchase_units"
                label="Units"
                sx={{ minWidth: "6rem" }}
                {...register("purchase_units")}
                // autoComplete="email"
                select
                value={selectedUnit}
                onChange={unitSelectHandler}
                error={!!errors?.purchase_units}
                helperText={
                  errors?.purchase_units ? errors.purchase_units.message : null
                }
              >
                {unitsList.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                type="date"
                id="target_date"
                fullWidth
                label="Target Date"
                {...register("target_date")}
                // mask="____-__-__"
                // inputFormat="yyyy-MM-dd"
                // format="yyyy-MM-dd"
                // value={Cdate}
                InputLabelProps={{ shrink: true }}
                // onChange={(date) => {
                //   const d = new Date(date).toLocaleDateString("fr-FR");
                //   // console.log(d);
                //   setDate();
                // }}
                error={!!errors?.target_date}
                helperText={
                  errors?.target_date ? errors.target_date.message : null
                }
              />
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
      </Box>
    </BasicModal>
  );
};

export default AddAccessoriesForm;
