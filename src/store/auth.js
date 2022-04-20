import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  loggedUser: {
    pk: null,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  },
  //   access_token: "",
  //   refresh_token: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.loggedUser.pk = action.payload.user.pk;
      state.loggedUser.first_name = action.payload.user.first_name;
      state.loggedUser.last_name = action.payload.user.last_name;
      state.loggedUser.email = action.payload.user.email;
      state.loggedUser.username = action.payload.user.username;

      // localStorage.setItem("access_token",action.payload.access_token)
      // localStorage.setItem("refresh_token",action.payload.refresh_token)

      //   state.access_token = action.payload.access_token;
      //   state.refresh_token = action.payload.refresh_token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loggedUser.pk = null;
      state.loggedUser.first_name = "";
      state.loggedUser.last_name = "";
      state.loggedUser.email = "";
      state.loggedUser.username = "";
      state.access_token = "";
      state.refresh_token = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
