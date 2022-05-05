import React from "react";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";
import BasicModal from "../Modal";

const AddProductGroupForm = (props) => {
  return (
    <BasicModal
      modalOpen={props.addProductGroup}
      handleClose={props.modalClose}
    >
      <FormControl>
        <InputLabel htmlFor="product_group_name">Product Group Name</InputLabel>
        <Input id="product_group_name" aria-describedby="helper-text" />
        <FormHelperText id="helper-text">
          Please enter Product group name.
        </FormHelperText>
      </FormControl>

      <Button component="span" variant="outlined" sx={{ ml: 2 }}>
        Add
      </Button>
    </BasicModal>
  );
};

export default AddProductGroupForm;
