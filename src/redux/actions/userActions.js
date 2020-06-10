import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
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
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      // history.push("/");
      //this one is not working, because it will not run if it is called within the nested component. Therefore only the rendered page component can call this function for it to work properly.
      window.location.href = "/";
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
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      window.location.href = "/";
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

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
        //payload is what we send to a reducer, and reducer done something with it
      });
    })
    .catch((err) => console.log(err));
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
