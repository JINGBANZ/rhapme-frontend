import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// destructuring properties inside props
// component would hold the component you are passed in
// the rest of properties would be at rest
// another way of defining a component  (input) => (return component)
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest} // spread the rest of props
    render={(props) =>
      authenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/landing" />
      )
    }
  />
);

//function it return an object
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

AuthRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(AuthRoute);
