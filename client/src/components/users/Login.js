// import installed packages
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// import styles

// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import globals from "../../shared/globals";
import { ifEmpty } from "../../shared/sharedFunctions";
// import components/pages
import MinDialog from "../common/MinDialog";
import ForgotPassword from "./ForgotPassword";
import ReactivateAccount from "./ReactivateAccount";

// import redux API
import {
  CLOSE_LOGIN,
  OPEN_FORGOT_PASSWORD,
  OPEN_RESEND_ACTIVATION,
  OPEN_SIGNUP,
  START_LOADING,
} from "../../redux/actions/types";
import { setAlert } from "../../redux/actions/shared";
import { login } from "../../redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const loginForm = useSelector((state) => state.auth?.loginForm);
  const loading = useSelector((state) => state.shared?.loading);
  const alert = useSelector((state) => state.shared?.alert);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // refs
  const loginFormRef = useRef();

  // destructuring
  const { error } = globals;
  const { email, password } = loginData;

  const handleLogin = (e) => {
    e.preventDefault();
    if (ifEmpty(loginData)) {
      return dispatch(setAlert(error, "Email and password required"));
    }
    loginFormRef.current?.setAttribute("id", "pageSubmitting");
    // dispatch loading action to allow spinner and setting attribute,we introduce a slight delay of 1s to allow attribute to work
    dispatch({ type: START_LOADING });
    // call the signup action creator
    dispatch(login(loginData));
    if (!loading) {
      setTimeout(() => {
        loginFormRef.current?.removeAttribute("id", "pageSubmitting");
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // close login form
  const closeLogin = () => {
    dispatch({ type: CLOSE_LOGIN });
  };

  // open password reset form
  const openPasswordResetForm = () => {
    dispatch({ type: OPEN_FORGOT_PASSWORD });
    closeLogin();
  };

  //open sign up form
  const openSignupForm = () => {
    dispatch({ type: OPEN_SIGNUP });
    closeLogin();
  };
  // open resend activation
  const openResendActivation = () => {
    dispatch({ type: OPEN_RESEND_ACTIVATION });
    closeLogin();
  };

  return (
    <>
      <MinDialog isOpen={loginForm}>
        <form className="dialog" ref={loginFormRef}>
          <h3>Login here</h3>
          <p className={`response__message ${alert.alertType}`}>
            {alert.status && alert.msg}
          </p>
          <div className="dialog__rowSingleItem">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
            />
          </div>
          {loading && (
            <CircularProgress
              style={{ position: "absolute", marginLeft: "40%" }}
            />
          )}
          <div className="dialog__rowSingleItem">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>
          <div className="form__Buttons">
            <button
              type="button"
              onClick={() => dispatch({ type: CLOSE_LOGIN })}
            >
              Close
            </button>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="extra__formButtons">
            <label
              htmlFor=""
              className="button"
              onClick={openPasswordResetForm}
            >
              Forgot Password
            </label>
            <label
              htmlFor=""
              className="button"
              style={{ justifySelf: "end" }}
              onClick={openSignupForm}
            >
              Create Account
            </label>
          </div>
          <div className="extra__formButtons">
            <label htmlFor="" className="button" onClick={openResendActivation}>
              Resend Activation
            </label>
          </div>
        </form>
      </MinDialog>
      {/* components */}
      <ForgotPassword />
      <ReactivateAccount />
    </>
  );
};

export default Login;
