import React from "react";

import classes from "./Results.module.css";

const Results = (props) => {
  return (
    <p className={classes.results}>
      <b>{props.message}</b>
    </p>
  );
};

export default Results;
