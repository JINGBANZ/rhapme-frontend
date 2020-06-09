import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Signup from "./signup";
import Login from "./login";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = (theme) => ({
  ...theme,
  formControl: {
    width: 300,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

class landing extends Component {
  constructor() {
    super();
    this.state = {
      tab: 0,
      code: "",
      options: [
        {
          name: "university of southern california",
          code: "@usc.edu",
        },
        {
          name: "ucla",
          code: "@ucla.edu",
        },
      ],
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;

    let loginAndSignup =
      this.state.code.length === 0 ? null : (
        <div>
          <TabPanel value={this.state.tab} index={0}>
            <Login code={this.state.code} />
          </TabPanel>
          <TabPanel value={this.state.tab} index={1}>
            <Signup code={this.state.code} />
          </TabPanel>
          <AppBar position="static">
            <Tabs
              value={this.state.tab}
              onChange={(event, newValue) => this.setState({ tab: newValue })}
              aria-label="tabs"
              variant="fullWidth"
              centered
            >
              <Tab label="Login" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Signup" id="tab-1" aria-controls="tabpanel-1" />
            </Tabs>
          </AppBar>
        </div>
      );

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <TextField
            id="code"
            name="code"
            select
            label="University"
            value={this.state.code}
            onChange={this.handleChange}
            SelectProps={{
              native: true,
            }}
          >
            <option key="none" value="" />
            {this.state.options.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </TextField>
          {loginAndSignup}
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

landing.propTypes = {
  authenticated: PropTypes.bool,
};

export default connect(mapStateToProps)(withStyles(styles)(landing));
