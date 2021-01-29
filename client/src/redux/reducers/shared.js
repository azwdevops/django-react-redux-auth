import {
  SET_ALERT,
  REMOVE_ALERT,
  START_LOADING,
  STOP_LOADING,
} from "../actions/types";

export const sharedInitialState = {
  alert: {
    status: false,
    alertType: "", // either success or error
    msg: "",
  },
  loading: false,
};

const sharedReducer = (state = sharedInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default sharedReducer;
