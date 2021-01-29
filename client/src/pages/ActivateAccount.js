// import installed packages
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// import styles
import "../styles/pages/ActivateAccount.css";
// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
import { activate_account } from "../redux/actions/auth";

// import shared/global items

// import components/pages

// import redux API
import { START_LOADING } from "../redux/actions/types";

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.shared?.loading);

  const btnRef = useRef();
  const pageRef = useRef();

  const handleActivate = () => {
    // dispatch the loaidng action
    dispatch({ type: START_LOADING });
    if (btnRef.current) {
      pageRef.current.setAttribute("id", "pageSubmitting");
    }
    dispatch(activate_account({ uid, token, history }));

    // if loading is done, remove the attribute
    if (!loading) {
      if (btnRef.current) {
        pageRef.current.removeAttribute("id", "pageSubmitting");
      }
    }
  };

  return (
    <div className="activate__account" ref={pageRef}>
      <h1>Click on the button below to verify your account</h1>
      {loading && (
        <CircularProgress style={{ position: "absolute", marginLeft: "1%" }} />
      )}
      <button type="button" onClick={handleActivate} ref={btnRef}>
        Verify
      </button>
    </div>
  );
};

export default ActivateAccount;
