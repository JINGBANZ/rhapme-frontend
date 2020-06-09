import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// this can be used to bring in global theme, and then use it.

import PropTypes from "prop-types";
//built in method in React for type checking
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
// Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

//this is a function, and take them object as input, return the following ...theme
const styles = (theme) => ({
  ...theme,
  // spread the theme, so we can access everything in the global theme
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email + this.props.code,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
    //this history can be use to redirect us on success
    //this.props.history.push('/') redirect to the homepage
  };

  //event will have a target property which will point to the element that triger it
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      code,
      classes,
      UI: { loading }, // loading is inside the UI object
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        {/* there are three grid. if you dont specify
        their width value, by default, they will be
        split equally and automatically. 3 items => each 33%
        4 items => each 25% */}

        <Grid item sm>
          {/* <img src={AppIcon} alt="logo" className={classes.image} /> */}
          {/* <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography> */}
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{code}</InputAdornment>
                ),
              }}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password} //this errors is sent back from the server, and have the corresponding key inside the errors object
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {/* if errors sent back from server contains key 'general', then display it */}
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            {/* relationship between button and progress: button is relative
            and progress is absolute, so we can locate progress in the middle of button */}
            <br />

            {/* <small>
              dont have an account ? sign up <Link to="/signup">here</Link>
            </small> */}
          </form>
        </Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
//it take our global state, and we take what we need
// all of these will be in our props, so we also define props types above
// through this.props we can access all these object
// all these are brought in from global state, and map into our component props
//and they are in our props right now
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
// it would just bundle the styles object with this component login
// and create a classes object in this.props, so we can access this style