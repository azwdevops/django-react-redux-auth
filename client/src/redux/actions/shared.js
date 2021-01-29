import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (alertType, msg) => async (dispatch) => {
  const id = uuid();
  // set alert
  // alertType is either success or error
  // msg is the message
  dispatch({ type: SET_ALERT, payload: { status: true, alertType, msg } });

  // remove alert after 4 seconds
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: { status: false, alertType: "", msg: "", id },
    });
  }, 3000);
};
