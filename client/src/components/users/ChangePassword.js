// import installed packages
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import styles

// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import { ifEmpty } from "../../shared/sharedFunctions";
import globals from "../../shared/globals";
// import components/pages
import MinDialog from "../common/MinDialog";

// import redux API
import {
  CLOSE_CHANGE_PASSWORD,
  START_LOADING,
} from "../../redux/actions/types";
import { setAlert } from "../../redux/actions/shared";
import { change_password } from "../../redux/actions/auth";

const ChangePassword = () => {
  // redux
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.auth.user?.id);
  const changePasswordForm = useSelector(
    (state) => state.auth?.changePasswordForm
  );
  const alert = useSelector((state) => state.shared?.alert);
  const loading = useSelector((state) => state.shared?.loading);

  // internal state
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const changePasswordFormRef = useRef();

  //############### destructuring code ###################//
  const { current_password, new_password, confirm_new_password } = passwords;
  const { error } = globals;
  //#################end of destructuring ###########//

  // handle change function
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // function to handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (ifEmpty(passwords)) {
      return dispatch(setAlert(error, "Email and password required"));
    }
    changePasswordFormRef.current?.setAttribute("id", "pageSubmitting");
    // dispatch loading action to allow spinner and setting attribute,we introduce a slight delay of 1s to allow attribute to work
    dispatch({ type: START_LOADING });
    // call the signup action creator
    dispatch(change_password(passwords, userId, history));
    if (!loading) {
      setTimeout(() => {
        changePasswordFormRef.current?.removeAttribute("id", "pageSubmitting");
      }, 1000);
    }
  };
  return (
    <MinDialog isOpen={changePasswordForm}>
      <form className="dialog" ref={changePasswordFormRef}>
        <h3>Change your password here</h3>
        <p className={`response__message ${alert.alertType}`}>
          {alert.status && alert.msg}
        </p>
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Old Password</label>
          <input
            type="password"
            name="current_password"
            value={current_password}
            onChange={handleChange}
          />
        </div>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", marginLeft: "40%" }}
          />
        )}
        <div className="dialog__rowSingleItem">
          <label htmlFor="">New Password</label>
          <input
            type="password"
            name="new_password"
            value={new_password}
            onChange={handleChange}
          />
        </div>
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Confirm New Password</label>
          <input
            type="password"
            name="confirm_new_password"
            value={confirm_new_password}
            onChange={handleChange}
          />
        </div>
        <div className="form__Buttons">
          <button
            type="button"
            onClick={() => dispatch({ type: CLOSE_CHANGE_PASSWORD })}
          >
            Close
          </button>
          <button type="submit" onClick={handlePasswordChange}>
            Submit
          </button>
        </div>
      </form>
    </MinDialog>
  );
};

export default ChangePassword;
