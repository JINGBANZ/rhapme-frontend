import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg";
import axios from "axios";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      errors: {},
      step: 0,
      otp: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  verifyEmail = (event) => {
    event.preventDefault();
    axios.post("/otp", { email: this.state.email }).then((res) => {
      if (res.data.success) {
        this.setState({ title: res.data.data, step: this.state.step + 1 });
      } else {
        console.log(res.data.message);
      }
    });
  };

  submitOtp = (event) => {
    event.preventDefault();
    axios
      .post("/verify", { email: this.state.email, code: this.state.otp })
      .then((res) => {
        if (res.data.success) {
          this.setState({ step: this.state.step + 1 });
        } else {
          console.log(res.data.message);
        }
      });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username,
    };
    this.props.signupUser(newUserData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    let formContainer = null;
    switch (this.state.step) {
      case 0:
        formContainer = (
          <>
            <Typography variant="h6" className={classes.pageTitle}>
              Sign Up
            </Typography>
            <form noValidate onSubmit={this.verifyEmail}>
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
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                Enter
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                Already have an account ? Login <Link to="/login">here</Link>
              </small>
            </form>
          </>
        );
        break;
      case 1:
        formContainer = (
          <>
            <Typography variant="h6" className={classes.pageTitle}>
              Enter Verification Code
            </Typography>
            <form noValidate onSubmit={this.submitOtp}>
              <TextField
                id="otp"
                name="otp"
                label="Number"
                className={classes.textField}
                value={this.state.otp}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                Verify
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                Already have an account ? Login <Link to="/login">here</Link>
              </small>
            </form>
          </>
        );
        break;
      case 2:
        formContainer = (
          <>
            <Typography variant="h4" className={classes.pageTitle}>
              SignUp
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="username"
                name="username"
                type="text"
                label="Username"
                className={classes.textField}
                helperText={errors.username}
                error={errors.username ? true : false}
                value={this.state.username}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                className={classes.textField}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                fullWidth
              />

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
                SignUp
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                Already have an account ? Login <Link to="/login">here</Link>
              </small>
            </form>
          </>
        );
        break;
      default:
        formContainer = null;
    }

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={logo} alt="rhapme" className={classes.image} />

          {formContainer}
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

// {signupUser} is just a simplified way to do mapActionToProps
export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
