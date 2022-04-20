import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    user: userReducer,
  },
});

export default store;
