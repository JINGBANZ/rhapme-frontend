import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  SET_NOTIFICATION,
} from "../types";
import axios from "axios";
// input
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  //we dispatch a type, and we will catch the type from reducer
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData(history));
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};
// if you need to use dispatch, you need to have dispatch in your input argument.
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData(history));
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  //remove the authorization header from axios
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = "/";
};

export const getUserData = (history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user/info")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .then(() => {
      if (history !== undefined) {
        history.push("/");
      }
    })
    .catch((err) => console.log(err));

  // axios
  //   .get("/user/notifications")
  //   .then((res) => {
  //     dispatch({ type: SET_NOTIFICATION, payload: res.data });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`; // format it as a template string
  localStorage.setItem("FBIdToken", FBIdToken);
  // keep the token in local storage.
  axios.defaults.headers.common["Authorization"] = FBIdToken;
  //at axios github document page
  // every axios request would therefore have the header of authorization
};
