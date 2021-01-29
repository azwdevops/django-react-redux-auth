// axios items
import * as api from "../../api/index";

// redux API items

import {
  AUTH_SUCCESS,
  CLOSE_CHANGE_PASSWORD,
  CLOSE_FORGOT_PASSWORD,
  CLOSE_LOGIN,
  CLOSE_PASSWORD_RESET_CONFIRM,
  CLOSE_RESEND_ACTIVATION,
  CLOSE_SIGNUP,
  LOGOUT,
  OPEN_LOGIN,
  STOP_LOADING,
} from "../actions/types";
import { setAlert } from "./shared";

// shared items
import globals from "../../shared/globals";

const { error, success } = globals;

// sign up user
export const signup = (newUser) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.signUp(newUser);
    // dispatch success message
    dispatch({ type: AUTH_SUCCESS, payload: data?.user });
    dispatch(setAlert(success, data?.msg));
    setTimeout(() => {
      dispatch({ type: CLOSE_SIGNUP });
    }, 3000);
  } catch (err) {
    // if bad client request
    if (err.response?.status === 400) {
      dispatch(setAlert(error, err.response.data?.msg));
    } else {
      console.log(err);
    }
  } finally {
    // dispatch the stop loading action
    dispatch({ type: STOP_LOADING });
  }
};

// activate user account
export const activate_account = (body) => async (dispatch) => {
  const { uid, token, history } = body;
  try {
    // destructure the payload got from the request
    const { data } = await api.activateAccount(uid, token);
    alert("Account activated successfully");
  } catch (err) {
    if (err.response.data?.token[0] === "Invalid token for given user.") {
      alert("Invalid activation token");
    } else if (
      err.response.data?.uid[0] === "Invalid user id or user doesn't exist."
    ) {
      alert("Invalid activation link");
    } else {
      alert("An error occurred, please try again later.");
    }
  } finally {
    dispatch({ type: STOP_LOADING });
    history.replace("/");
  }
};

// resend user account activation link
export const resend_activation = (email) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.resendActivation(email);
    dispatch(setAlert(success, "Activation link sent to email."));
    setTimeout(() => {
      dispatch({ type: CLOSE_RESEND_ACTIVATION });
    }, 3000);
  } catch (err) {
    // if bad client request
    if (err.response?.status === 400) {
      dispatch(setAlert(error, err.response.data?.msg));
    } else {
      dispatch(setAlert(error, "An error occurred, please try again later"));
    }
  } finally {
    // dispatch the stop loading action
    dispatch({ type: STOP_LOADING });
  }
};

// login user
export const login = (loginData) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.signIn(loginData);
    localStorage.setItem("session_cookie", data?.access);
    // dispatch success message
    dispatch({ type: CLOSE_LOGIN });
    // get user details
    dispatch(get_user());
  } catch (err) {
    if (err.response?.status === 400) {
      dispatch(setAlert(error, err.response.data?.msg));
    } else if (err.response?.status === 401) {
      dispatch(
        setAlert(error, "Invalid login, ensure your account is activated")
      );
    } else {
      console.log(err);
    }
  } finally {
    // dispatch the stop loading action
    dispatch({ type: STOP_LOADING });
  }
};

// reset user password by sending an email with a reset link
export const reset_password = (email) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.resetPassword(email);
    dispatch(setAlert(success, "Password reset link sent to email."));
    setTimeout(() => {
      dispatch({ type: CLOSE_FORGOT_PASSWORD });
    }, 3000);
  } catch (err) {
    if (err.response?.status === 400) {
      dispatch(setAlert(error, err.response.data[0]));
    } else {
      console.log(err);
    }
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};

// set new user password
export const set_password = (newPasswords, history) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.setPassword(newPasswords);
    dispatch(setAlert(success, "Password set successfully."));
    setTimeout(() => {
      dispatch({ type: CLOSE_PASSWORD_RESET_CONFIRM });
      history.replace("/");
      dispatch({ type: OPEN_LOGIN });
    }, 3000);
  } catch (err) {
    if (err.response?.status === 400) {
      if (err.response.data?.new_password) {
        dispatch(setAlert(error, err.response.data?.new_password[0]));
      } else if (err.response.data?.non_field_errors) {
        dispatch(setAlert(error, err.response.data?.non_field_errors[0]));
      } else if (err.response.data?.token) {
        dispatch(setAlert(error, err.response.data?.token[0]));
      } else {
        dispatch(
          setAlert(error, "Unknown error occurred, please try again later.")
        );
      }
    }
    console.log(err.response);
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};

// patch/update user data
export const update_user = (updatedUser, userId) => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.updateUser(updatedUser, userId);
    alert("Profile updated successfully");
  } catch (err) {
    if (err.response?.status === 400) {
      alert(err.response.data?.msg);
    } else {
      alert("An error occurred, please try again later");
    }
    console.log(err.response);
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};

// user change password
export const change_password = (passwords, userId, history) => async (
  dispatch
) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.changePassword(passwords, userId);
    dispatch(setAlert(success, "Password changed successfully."));
    setTimeout(() => {
      dispatch({ type: CLOSE_CHANGE_PASSWORD });
      dispatch(logout(history));
    }, 3000);
  } catch (err) {
    if (err.response?.status === 400) {
      dispatch(setAlert(error, err.response.data?.msg));
    } else {
      dispatch(setAlert(error, "An error occurred, please try again later"));
    }
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};

// get user data
export const get_user = () => async (dispatch) => {
  try {
    // destructure the payload got from the request
    const { data } = await api.getUser();
    // dispatch success message
    dispatch({ type: AUTH_SUCCESS, payload: data?.user });
  } catch (error) {
    dispatch({ type: LOGOUT });
    localStorage.clear();
    console.log(error);
  }
};

// logout user
export const logout = (history) => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
  history.replace("/");
};
