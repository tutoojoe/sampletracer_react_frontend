import { createSlice } from "@reduxjs/toolkit";
import { loginActions } from "./loginSlice";

const initialState = {
  logoutStatus: false,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logoutPending: {},
    logoutSuccess: {},
    logoutCancel: {},
  },
});
