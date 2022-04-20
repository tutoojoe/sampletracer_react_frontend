import { userActions } from "./userSlice";

export const getUserProfile = () => (dispatch) => {
  try {
    dispatch(userActions.getUserPending());
  } catch (error) {
    dispatch(userActions.getUserFail(error.message));
  }
};
