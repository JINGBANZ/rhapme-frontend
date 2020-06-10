import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// Components
import Navbar from "./components/layout/Navbar";
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";
// Pages
import Home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
import landing from "./pages/landing";

import axios from "axios";

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
  "https://us-central1-test-a4386.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  //decode the json web token
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  //it will have a property call exp
  //if you pass new Date(decodedToken.exp * 1000), you know when it will expired
  //decodedToken.exp * 1000 is expired time
  if (decodedToken.exp * 1000 < Date.now()) {
    //expired
    store.dispatch(logoutUser());
    window.location.href = "/landing";
  } else {
    //not expired
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      //these two provider do not interact with each other
      //everything that is inside our provider would have access to our store / states
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <AuthRoute exact path="/" component={Home} />
                <Route exact path="/landing" component={landing} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <AuthRoute exact path="/users/:handle" component={user} />
                <AuthRoute
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
