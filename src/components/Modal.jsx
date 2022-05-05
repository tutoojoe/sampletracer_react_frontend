import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const style = {
  display: "flex",

  flexDirection: "row",
  justifyContents: "space-between",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: ,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.modalOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={props.style ? props.style : style}>
            <div
              sx={{
                justifyContents: "flex-end",
              }}
            ></div>
            {props.children}
            <Button
              variant="outline"
              sx={{ ml: 2 }}
              onClick={props.handleClose}
            >
              Close
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
