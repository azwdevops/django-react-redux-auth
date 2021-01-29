// import installed packages
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// import styles
import "../styles/pages/ActivateAccount.css";
// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import globals from "../shared/globals";
import { ifEmpty } from "../shared/sharedFunctions";

// import components/pages
import MinDialog from "../components/common/MinDialog";

// import redux API
import {
  CLOSE_PASSWORD_RESET_CONFIRM,
  OPEN_PASSWORD_RESET_CONFIRM,
  START_LOADING,
} from "../redux/actions/types";
import { setAlert } from "../redux/actions/shared";
import { set_password } from "../redux/actions/auth";

const ResetPasswordConfirm = () => {
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  const resetPasswordConfirmForm = useSelector(
    (state) => state.auth?.resetPasswordConfirmForm
  );
  const loading = useSelector((state) => state.shared?.loading);
  const alert = useSelector((state) => state.shared?.alert);
  const [newPasswords, setNewPasswords] = useState({
    new_password: "",
    re_new_password: "",
    uid,
    token,
  });

  const resetPasswordConfirmFormRef = useRef();
  const history = useHistory();

  // destructure values for better code formatting
  // ########### start of destructuring #################  //
  const { new_password, re_new_password } = newPasswords;
  const { error, success } = globals;

  // ########### end of destructuring #################  //

  // handle change
  const handleChange = (e) =>
    setNewPasswords({ ...newPasswords, [e.target.name]: e.target.value });

  // function to submit new password
  const handleSetNewPassword = (e) => {
    e.preventDefault();
    if (ifEmpty(newPasswords)) {
      return dispatch(setAlert(error, "Both fields are required"));
    }
    resetPasswordConfirmFormRef.current?.setAttribute("id", "pageSubmitting");
    // dispatch loading action to allow spinner and setting attribute,we introduce a slight delay of 1s to allow attribute to work
    dispatch({ type: START_LOADING });
    // call the signup action creator
    dispatch(set_password(newPasswords, history));
    setTimeout(() => {
      if (!loading) {
        resetPasswordConfirmFormRef.current?.removeAttribute(
          "id",
          "pageSubmitting"
        );
      }
    }, 1000);
  };

  return (
    <>
      <div className="activate__account">
        <h1>Click the button to set new password</h1>
        <button
          type="button"
          onClick={() => dispatch({ type: OPEN_PASSWORD_RESET_CONFIRM })}
        >
          Set New password
        </button>
      </div>
      <MinDialog isOpen={resetPasswordConfirmForm}>
        <form className="dialog" ref={resetPasswordConfirmFormRef}>
          <h3>Enter new password</h3>
          <p className={`response__message ${alert.alertType}`}>
            {alert.status && alert.msg}
          </p>
          <div className="dialog__rowSingleItem">
            <label htmlFor="">New Password</label>
            <input
              type="password"
              name="new_password"
              onChange={handleChange}
              value={new_password}
            />
          </div>
          {loading && (
            <CircularProgress
              style={{ position: "absolute", marginLeft: "43%" }}
            />
          )}
          <div className="dialog__rowSingleItem">
            <label htmlFor="">Confirm New Password</label>
            <input
              type="password"
              name="re_new_password"
              onChange={handleChange}
              value={re_new_password}
            />
          </div>
          <div className="form__Buttons">
            <button
              type="button"
              onClick={() => dispatch({ type: CLOSE_PASSWORD_RESET_CONFIRM })}
            >
              Close
            </button>
            <button type="submit" onClick={handleSetNewPassword}>
              Submit
            </button>
          </div>
        </form>
      </MinDialog>
    </>
  );
};

export default ResetPasswordConfirm;
