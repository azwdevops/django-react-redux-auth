// import installed packages
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styles

// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";

// import shared/global items
import globals from "../../shared/globals";

// import components/pages
import MinDialog from "../common/MinDialog";

// import redux API
import {
  CLOSE_FORGOT_PASSWORD,
  START_LOADING,
} from "../../redux/actions/types";
import { setAlert } from "../../redux/actions/shared";
import { reset_password } from "../../redux/actions/auth";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const forgotPasswordForm = useSelector(
    (state) => state.auth?.forgotPasswordForm
  );
  const loading = useSelector((state) => state.shared?.loading);
  const alert = useSelector((state) => state.shared?.alert);

  const [email, setEmail] = useState("");

  const forgotPasswordFormRef = useRef();

  //############### destructuring code ###################//
  const { success, error } = globals;

  //#################end of destructuring ###########//

  // function to reset password (send reset password email)

  const sendPasswordResetEmail = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      return dispatch(setAlert(error, "Email required"));
    }

    forgotPasswordFormRef.current?.setAttribute("id", "pageSubmitting");

    // dispatch loading action to allow spinner and setting attribute,we introduce a slight delay of 1s to allow attribute to work
    dispatch({ type: START_LOADING });
    // call the signup action creator
    dispatch(reset_password(email));

    if (!loading) {
      setEmail("");
      setTimeout(() => {
        forgotPasswordFormRef.current?.removeAttribute("id", "pageSubmitting");
      }, 1000);
    }
  };

  return (
    <MinDialog isOpen={forgotPasswordForm}>
      <form className="dialog" ref={forgotPasswordFormRef}>
        <h3>Enter your email to reset password</h3>
        <p className={`response__message ${alert.alertType}`}>
          {alert.status && alert.msg}
        </p>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", marginLeft: "40%" }}
          />
        )}
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form__Buttons">
          <button
            type="button"
            onClick={() => dispatch({ type: CLOSE_FORGOT_PASSWORD })}
          >
            Close
          </button>
          <button type="submit" onClick={sendPasswordResetEmail}>
            Reset
          </button>
        </div>
      </form>
    </MinDialog>
  );
};

export default ForgotPassword;
