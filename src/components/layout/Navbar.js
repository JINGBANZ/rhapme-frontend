import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
// MUI stuff
// import each separate module you need, so you dont need to import entire material-ui/core
// so then you can use these elements to build your page
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// import Button from "@material-ui/core/Button";
// Icons
import HomeIcon from "@material-ui/icons/Home";

class Navbar extends Component {
  render() {
    const { authenticated, title } = this.props;

    let home =
      title === undefined ? (
        <HomeIcon />
      ) : (
        <span style={{ color: "#fff" }}>{title}</span>
      );

    let navbar = !authenticated ? null : (
      <AppBar>
        <Toolbar className="nav-container">
          <Fragment>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">{home}</MyButton>
            </Link>
            <Notifications />
          </Fragment>
        </Toolbar>
      </AppBar>
    );
    return navbar;
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  title: state.user.credentials.title,
});

export default connect(mapStateToProps)(Navbar);

// (
//   <Fragment>
//     <Button color="inherit" component={Link} to="/login">
//       Login
//     </Button>
//     <Button color="inherit" component={Link} to="/">
//       Home
//     </Button>
//     <Button color="inherit" component={Link} to="/signup">
//       Signup
//     </Button>
//   </Fragment>
// )
