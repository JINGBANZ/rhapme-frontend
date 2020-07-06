import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Tools = () => {
  return (
    <IconButton aria-label="tools">
      <MoreVertIcon />
    </IconButton>
  );
};

export default Tools;
