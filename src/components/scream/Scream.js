import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteScream from "./DeleteScream";
import LikeButton from "./LikeButton";
import Tools from "./Tools";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { CardActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import ChatIcon from "@material-ui/icons/Chat";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// Redux
import { connect } from "react-redux";
import Picture from "./Picture";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  card_root: {
    marginBottom: 20,
    // position: "relative",
  },
  expandButton: {
    // position: 'absolute',
    marginLeft: "auto",
    // left: '90%'
  },
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    //add plugin relativeTime in dayjs
    const {
      classes,
      scream: {
        body,
        images,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    // object destructuring, this.props is an object contains a lot of properties
    // it would assign properties in this.props to corresponding key.
    // it equals to => const classes = this.props.classes;
    // scream = this.props.scream, which is passed by its parent

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
    // return (
    //   <Card className={classes.card}>
    //     <CardMedia
    //       image={userImage}
    //       title="Profile image"
    //       className={classes.image}
    //     />
    //     <CardContent className={classes.content}>
    //       <Typography
    //         variant="h5"
    //         component={Link}
    //         to={`/users/${userHandle}`}
    //         color="primary"
    //       >
    //         {userHandle}
    //       </Typography>
    //       {deleteButton}
    //       <Typography variant="body2" color="textSecondary">
    //         {dayjs(createdAt).fromNow()}
    //       </Typography>
    //       <Typography variant="body1">{body}</Typography>
    //       <LikeButton screamId={screamId} />
    //       <span>{likeCount} Likes</span>
    //       <MyButton tip="comments">
    //         <ChatIcon color="primary" />
    //       </MyButton>
    //       <span>{commentCount} comments</span>
    //       <ScreamDialog
    //         screamId={screamId}
    //         userHandle={userHandle}
    //         openDialog={this.props.openDialog}
    //       />
    //     </CardContent>
    //   </Card>
    // );
    return (
      <Card className={classes.card_root}>
        <CardHeader
          avatar={<Avatar alt={userHandle} src={userImage} />}
          action={<Tools />}
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
              {dayjs(createdAt).fromNow()}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1">{body}</Typography>
          <div className="picture">
            <Picture images={images}></Picture>
          </div>
        </CardContent>
        <CardActions>
          <LikeButton screamId={screamId} />
          <span>{likeCount}</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount}</span>
          <Tooltip title="Expand Post" placement="top">
            <Button
              className={classes.expandButton}
              component={Link}
              to={`/users/${userHandle}/scream/${screamId}`}
            >
              <KeyboardArrowDownIcon color="primary" />
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

//withStyles(styles)(Scream) it creates an object called classes in component`s props
//and we can access this classes by this.props.classes
export default connect(mapStateToProps)(withStyles(styles)(Scream));
