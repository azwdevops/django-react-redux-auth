// import installed packages
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// import styles
import "../styles/pages/Profile.css";
// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import { ifEmpty } from "../shared/sharedFunctions";
// import components/pages
import ChangePassword from "../components/users/ChangePassword";
// import redux API
import { OPEN_CHANGE_PASSWORD, START_LOADING } from "../redux/actions/types";
import { update_user } from "../redux/actions/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const first_name = useSelector((state) => state.auth.user?.first_name);
  const last_name = useSelector((state) => state.auth.user?.last_name);
  const username = useSelector((state) => state.auth.user?.username);
  const email = useSelector((state) => state.auth.user?.email);
  const bio = useSelector((state) => state.auth.user?.bio);
  const userId = useSelector((state) => state.auth.user?.id);
  const loading = useSelector((state) => state.shared?.loading);

  // internal state
  const [updatedUser, setUpdatedUser] = useState({
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    bio: bio,
  });

  // refs
  const profilePageRef = useRef();

  // function to update user details
  const updateUserDetails = (e) => {
    e.preventDefault();
    if (ifEmpty(updatedUser)) {
      alert("Fill all fields are to update your profile");
    }
    profilePageRef.current?.setAttribute("id", "pageSubmitting");
    // dispatch loading action to allow spinner and setting attribute,we introduce a slight delay of 1s to allow attribute to work
    dispatch({ type: START_LOADING });
    // call the signup action creator
    dispatch(update_user(updatedUser, userId));
    if (!loading) {
      setTimeout(() => {
        profilePageRef.current?.removeAttribute("id", "pageSubmitting");
      }, 1000);
    }
  };

  // handle change function
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile" ref={profilePageRef}>
      <h2>Profile Details</h2>
      <div className="profile__row">
        <span>
          <label htmlFor="">First Name</label>
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleChange}
            disabled
          />
        </span>
        <span>
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleChange}
            disabled
          />
        </span>
      </div>
      <div className="profile__row">
        <span>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            disabled
          />
        </span>
        <span>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            disabled
          />
        </span>
      </div>
      {loading && (
        <CircularProgress style={{ position: "absolute", marginLeft: "30%" }} />
      )}
      <div className="profile__rowSingleItem">
        <label htmlFor="">Bio</label>
        <textarea name="bio" value={bio} onChange={handleChange}></textarea>
      </div>
      <div className="profile__Buttons">
        <button
          type="button"
          className="change__password"
          onClick={() => dispatch({ type: OPEN_CHANGE_PASSWORD })}
        >
          Change Password
        </button>
        <button type="submit" className="update" onClick={updateUserDetails}>
          Update Profile
        </button>
      </div>

      {/* linked components */}
      <ChangePassword />
    </div>
  );
};

export default Profile;
