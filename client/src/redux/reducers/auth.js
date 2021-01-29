// types import
import {
  CLOSE_SIGNUP,
  OPEN_LOGIN,
  OPEN_SIGNUP,
  CLOSE_LOGIN,
  AUTH_SUCCESS,
  LOGOUT,
  OPEN_FORGOT_PASSWORD,
  CLOSE_FORGOT_PASSWORD,
  OPEN_RESEND_ACTIVATION,
  CLOSE_RESEND_ACTIVATION,
  OPEN_PASSWORD_RESET_CONFIRM,
  CLOSE_PASSWORD_RESET_CONFIRM,
  OPEN_CHANGE_PASSWORD,
  CLOSE_CHANGE_PASSWORD,
} from "../actions/types";

const initialState = {
  signupForm: false,
  loginForm: false,
  loggedIn: false,
  forgotPasswordForm: false,
  resendActivationForm: false,
  resetPasswordConfirmForm: false,
  changePasswordForm: false,
  user: {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  },
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case OPEN_SIGNUP:
      return {
        ...state,
        signupForm: true,
      };
    case CLOSE_SIGNUP:
      return {
        ...state,
        signupForm: false,
      };
    case OPEN_LOGIN:
      return {
        ...state,
        loginForm: true,
      };
    case CLOSE_LOGIN:
      return {
        ...state,
        loginForm: false,
      };
    case AUTH_SUCCESS:
      return { ...state, user: payload, loggedIn: true };
    case OPEN_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordForm: true,
      };
    case CLOSE_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordForm: false,
      };
    case OPEN_RESEND_ACTIVATION:
      return {
        ...state,
        resendActivationForm: true,
      };
    case CLOSE_RESEND_ACTIVATION:
      return {
        ...state,
        resendActivationForm: false,
      };
    case OPEN_PASSWORD_RESET_CONFIRM:
      return {
        ...state,
        resetPasswordConfirmForm: true,
      };
    case CLOSE_PASSWORD_RESET_CONFIRM:
      return {
        ...state,
        resetPasswordConfirmForm: false,
      };
    case OPEN_CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordForm: true,
      };
    case CLOSE_CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordForm: false,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
