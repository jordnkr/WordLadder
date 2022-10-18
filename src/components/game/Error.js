import React from "react";

import classes from "./Error.module.css";

const Error = (props) => {
  return (
    <div className={classes.errorContainer}>
      <p className={classes.error}>{props.message}</p>
    </div>
  );
};

export default Error;
