// import installed packages
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
// import styles

// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import globals from "../../shared/globals";
import { ifEmpty } from "../../shared/sharedFunctions";
// import components/pages
import MediumDialog from "../common/MediumDialog";
// import redux API
import { CLOSE_SIGNUP, START_LOADING } from "../../redux/actions/types";
import { signup } from "../../redux/actions/auth";
import { setAlert } from "../../redux/actions/shared";

const Signup = ({ googleSucess, googleFailure }) => {
  const dispatch = useDispatch();
  const signupForm = useSelector((state) => state.auth.signupForm);
  const alert = useSelector((state) => state.shared.alert);
  const loading = useSelector((state) => state.shared?.loading);

  // internal state
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // refs
  const signupFormRef = useRef();

  //############### destructuring code ###################//
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    confirm_password,
  } = newUser;
  const { error, fillFields } = globals;

  //#################end of destructuring ###########//

  const handleSignup = (e) => {
    e.preventDefault();
    if (ifEmpty(newUser)) {
      return dispatch(setAlert(error, fillFields));
    }
    // confirm passwords match
    if (password !== confirm_password) {
      return dispatch(setAlert(error, "Passwords should match"));
    }

    signupFormRef.current?.setAttribute("id", "pageSubmitting");

    // dispatch the loading action
    dispatch({ type: START_LOADING });

    // call the signup action creator
    dispatch(signup(newUser));

    // if loading is done remove the attribute, we introduce a slight delay of 1s to allow attribute to work
    if (!loading) {
      setTimeout(() => {
        signupFormRef.current?.removeAttribute("id", "pageSubmitting");
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  return (
    <MediumDialog isOpen={signupForm}>
      <form className="dialog" ref={signupFormRef}>
        <h3>Create new account</h3>
        <p className={`response__message ${alert.alertType}`}>
          {alert.status && alert.msg}
        </p>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={first_name}
            className="input__left"
            onChange={handleChange}
            required
          />
          <label htmlFor="" className="label__right">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            className="input__right"
            onChange={handleChange}
            required
          />
        </div>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            className="input__left"
            onChange={handleChange}
            required
          />
          <label htmlFor="" className="label__right">
            Email
          </label>
          <input
            type="email"
            name="email"
            username={email}
            className="input__right"
            onChange={handleChange}
            required
          />
        </div>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", marginLeft: "43%" }}
          />
        )}
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            className="input__left"
            onChange={handleChange}
            required
          />
          <label htmlFor="" className="label__right">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            className="input__right"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__Buttons">
          <button
            type="button"
            onClick={() => dispatch({ type: CLOSE_SIGNUP })}
          >
            Close
          </button>
          <button type="submit" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <div className="extra__formButtons">
          <GoogleLogin
            clientId="419209056133-go6htupj48ppega1d66bj5suhvd9f6ic.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className="google__signin">
                Sign Up With Google
              </button>
            )}
            onSuccess={googleSucess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </div>
      </form>
    </MediumDialog>
  );
};

export default Signup;
