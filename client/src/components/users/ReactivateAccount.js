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
  CLOSE_RESEND_ACTIVATION,
  START_LOADING,
} from "../../redux/actions/types";
import { resend_activation } from "../../redux/actions/auth";
import { setAlert } from "../../redux/actions/shared";

const ReactivateAccount = () => {
  const dispatch = useDispatch();
  const resendActivationForm = useSelector(
    (state) => state.auth?.resendActivationForm
  );
  const alert = useSelector((state) => state.shared?.alert);
  const loading = useSelector((state) => state.shared?.loading);
  const [email, setEmail] = useState("");

  const reactivateAccountFormRef = useRef();

  // ###################### destructuring to make code organized ######################### //
  const { success, error } = globals;
  // ###################### end destructuring to make code organized ######################### //

  // function to resend confirmation link
  const resendAccountConfirmationLink = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      return dispatch(setAlert(error, "Email required"));
    }
    reactivateAccountFormRef.current?.setAttribute("id", "pageSubmitting");
    // dispatch loading action to allow spinner and setting attribute,we introduce a slight delay of 1s to allow attribute to work
    dispatch({ type: START_LOADING });
    // call the signup action creator
    dispatch(resend_activation(email));

    if (!loading) {
      setTimeout(() => {
        reactivateAccountFormRef.current?.removeAttribute(
          "id",
          "pageSubmitting"
        );
      }, 1000);
    }
  };
  return (
    <MinDialog
      isOpen={resendActivationForm} // since the styles of min width applied globally is affecting the reactivate form width, apply inline styles
    >
      <form className="dialog" ref={reactivateAccountFormRef}>
        <h3>Enter email to resend confirmation link</h3>
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
            required
          />
        </div>

        <div className="form__Buttons">
          <button
            type="button"
            onClick={() => dispatch({ type: CLOSE_RESEND_ACTIVATION })}
          >
            Close
          </button>
          <button type="submit" onClick={resendAccountConfirmationLink}>
            Send
          </button>
        </div>
      </form>
    </MinDialog>
  );
};

export default ReactivateAccount;
