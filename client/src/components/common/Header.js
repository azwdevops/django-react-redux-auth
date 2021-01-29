// import installed packages
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
// import styles

import "../../styles/components/common/Header.css";
// import material ui items
import Avatar from "@material-ui/core/Avatar";
// import shared/global items
import { showNavbar } from "../../shared/scripts";
// import components/pages
import Login from "../users/Login";
import Signup from "../users/Signup";

// import redux API
import { OPEN_LOGIN, OPEN_SIGNUP } from "../../redux/actions/types";
import { logout } from "../../redux/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const session_cookie = localStorage.getItem("session_cookie");
  const username = useSelector((state) => state.auth.user?.username);
  const userImage = useSelector((state) => state.auth?.userImage);

  // console.log(location.pathname);

  return (
    <>
      <header className="header" id="header">
        <div className="header__toggle">
          <i className="bx bx-menu" id="header-toggle" onClick={showNavbar}></i>
          <h1>azw</h1>
        </div>

        {session_cookie ? (
          <div className="header__right authenticated">
            <>
              <div>
                <Avatar alt={username} src={userImage} className="user__image">
                  {username?.charAt(0)}
                </Avatar>
                <h6>{username}</h6>
                <i className="bx bx-caret-down"></i>
              </div>
              <ul className="dropdown">
                <li>
                  <Link to="/dashboard/">Dashboard</Link>
                </li>
                <li onClick={() => dispatch(logout(history))}>Logout</li>
              </ul>
            </>
          </div>
        ) : (
          <div className="header__right">
            <span
              className="button"
              onClick={() => dispatch({ type: OPEN_LOGIN })}
            >
              Login
            </span>
            <span
              className="button"
              onClick={() => dispatch({ type: OPEN_SIGNUP })}
            >
              Signup
            </span>
          </div>
        )}
      </header>
      {/* components */}
      <Login />
      <Signup />
    </>
  );
};

export default Header;
