import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_NOTIFICATIONS_READ,
} from "../types";

//this is not the global state, it is just states inside userReducer, and would be assign to user object in global states
//user: userReducer;
const initialState = {
  authenticated: false, // default value
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};
//function take a parameter of state, and assign default value of initialState to state
//default value of state is initialState
export default function (state = initialState, action) {
  //depend on action type, we do corresponding thing
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
        //spread these property sent from our server, which contains creadentials/likes/notification
        //and they will bind to corresponding state property
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
          // leave all likes that are not equal to action.payload.screamId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
