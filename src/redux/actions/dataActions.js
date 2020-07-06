import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

// Get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get("/posts").then((res) => {
    if (res.data.success) {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    }
  });
};
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a scream
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios({
    method: "post",
    url: "/mediaPost",
    data: newScream,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => {
    if (res.data.success) {
      dispatch({
        type: POST_SCREAM,
        payload: res.data.data,
      });
      dispatch(clearErrors());
    } else {
      dispatch({
        type: SET_ERRORS,
        payload: res.data.message,
      });
    }
  });
};
// Like a scream
export const likeScream = (screamId) => (dispatch) => {
  axios.get(`/post/${screamId}/like`).then((res) => {
    if (res.data.success) {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data.data,
      });
    } else {
      console.log(res.data.message);
    }
  });
};
// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios.get(`/post/${screamId}/unlike`).then((res) => {
    if (res.data.success) {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data.data,
      });
    } else {
      console.log(res.data.message);
    }
  });
};
// Submit a comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios.post(`/post/${screamId}/comment`, commentData).then((res) => {
    if (res.data.success) {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data.data,
      });
      dispatch(clearErrors());
    } else {
      dispatch({
        type: SET_ERRORS,
        payload: res.data.message,
      });
    }
  });
};
export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/post/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get(`/user/${userHandle}`).then((res) => {
    if (res.data.success) {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.data.screams,
      });
    } else {
      dispatch({
        type: SET_SCREAMS,
        payload: null,
      });
    }
  });
};
//action creator
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
