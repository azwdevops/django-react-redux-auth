import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("session_cookie")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem(
      "session_cookie"
    )}`;
    req.headers.Accept = "application/json";
  }
  return req;
});

// user routes

// signup
export const signUp = (newUser) => API.post("/api/user/signup/", newUser);
// activate user account
export const activateAccount = (uid, token) =>
  API.post("/api/auth/users/activation/", { uid, token }); // djoser url

// resend account activation email
export const resendActivation = (email) =>
  API.post("/api/user/resend-account-activation-link/", { email });

// sign in user
export const signIn = (loginData) => API.post("/api/user/login/", loginData);

// send password reset email, this is a djoser url
export const resetPassword = (email) =>
  API.post("/api/auth/users/reset_password/", { email });

// set new password using reset link sent from above, this is also a djoser url
export const setPassword = (newPasswords) =>
  API.post("/api/auth/users/reset_password_confirm/", newPasswords);

// patch user data
export const updateUser = (updatedUser, userId) =>
  API.patch(`/api/user/update-user-details/${userId}/`, updatedUser);

// user change password
export const changePassword = (passwords, userId) =>
  API.post(`/api/user/change-user-password/${userId}/`, passwords);

// get user data
export const getUser = () => API.get("/api/user/get-user-data/");
