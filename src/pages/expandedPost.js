import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import StaticProfile from "../components/profile/StaticProfile";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "../components/scream/LikeButton";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import MyButton from "../util/MyButton";
import { connect } from "react-redux";
import { getUserData, getScream } from "../redux/actions/dataActions";
import Comments from "../components/scream/Comments";
import CommentForm from "../components/scream/CommentForm";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import { CardActions } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = {
  content: {
    padding: 25,
    objectFit: "cover",
  },
  card_root: {
    marginBottom: 20,
    // position: "relative",
  },
};

class expandedPost extends Component {
  state = {
    profile: null,
  };
  //dont have to store this user profile in our global state, becasue it is static
  //so we can just have it in our component
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    this.props.getScream(screamId);
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;

    const screamMarkup = loading ? (
      <ScreamSkeleton />
    ) : (
      <Card className={classes.card_root}>
        <CardHeader
          avatar={<Avatar alt={userHandle} src={userImage} />}
          action={
            <IconButton aria-label="tools">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
        <CardActions>
          <LikeButton screamId={this.props.match.params.screamId} />
          <span>{likeCount}</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount}</span>
        </CardActions>
        <Grid container>
          <CommentForm screamId={this.props.match.params.screamId} />
          {comments !== undefined && <Comments comments={comments} />}
        </Grid>
      </Card>
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {screamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

expandedPost.propTypes = {
  getUserData: PropTypes.func.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

export default connect(mapStateToProps, { getUserData, getScream })(
  withStyles(styles)(expandedPost)
);
