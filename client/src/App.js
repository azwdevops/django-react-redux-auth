// import installed packages
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import styles
import "./App.css";
// import material ui items

// import shared/global items
import PrivateRoute from "./shared/PrivateRoute";
// import components/pages
import Header from "./components/common/Header";
// import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import ActivateAccount from "./pages/ActivateAccount";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

// import redux API
import { get_user } from "./redux/actions/auth";

function App() {
  const dispatch = useDispatch();
  const session_cookie = localStorage.getItem("session_cookie");

  useEffect(() => {
    // get user on page refresh
    if (session_cookie) {
      dispatch(get_user());
    }
  }, [dispatch, session_cookie]);

  return (
    <div id="body-pd">
      <Router>
        <Header />
        <Sidebar />
        <Switch>
          {/* unauthenticated routes */}
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/user/password/reset/confirm/:uid/:token/"
            component={ResetPasswordConfirm}
          />
          <Route
            exact
            path="/user/activate/:uid/:token/"
            component={ActivateAccount}
          />
          {/* authenticated routes */}
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/dashboard/" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
