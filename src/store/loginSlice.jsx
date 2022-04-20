import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  error: "",
  logoutStatus: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    logOutPending: (state) => {
      state.isLoading = false;
      state.logoutStatus = true;
    },
    logOutCancel: (state) => {
      state.isLoading = false;
      state.logoutStatus = false;
    },
    logOut: (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = "";
      state.logoutStatus = false;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
