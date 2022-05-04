import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/loginSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutConfirmAlert() {
  const logStatus = useSelector((state) => state.login.logoutStatus);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  console.log(logStatus, "inside logoutconfirmalert");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(loginActions.logOutCancel());
    setOpen(false);
  };
  const handleLogout = () => {
    dispatch(loginActions.logOut());
    localStorage.removeItem("userRefresh");
    sessionStorage.removeItem("accessJWT");
    setOpen(false);
    console.log("logged out successfully, diverting to homepage");
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Dialog
        open={logStatus}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to logout??"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will not be able to view the page once you are logged out..
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Go back</Button>
          <Button onClick={handleLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
