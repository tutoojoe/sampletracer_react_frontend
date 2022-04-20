import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    pk: null,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    user_type: "",
  },
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      console.log(action.payload.user, "user inside getuser success");
      state.isLoading = false;
      state.user.pk = action.payload.user.pk;
      state.user.first_name = action.payload.user.first_name;
      state.user.last_name = action.payload.user.last_name;
      state.user.email = action.payload.user.email;
      //   state.user.username = action.payload.user.username;
      state.user.user_type = action.payload.user.user_type;
      state.error = "";
    },
    getUserFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
