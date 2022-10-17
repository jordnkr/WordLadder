import React from "react";

import classes from "./TitleBar.module.css";

const TitleBar = (props) => {
  return (
    <div className={classes.bar}>
      <div className={classes.helpIcon} onClick={props.onHelp}>
        <span className="material-symbols-outlined">help</span>
      </div>
      <h1 className={classes.title}>Word Ladder</h1>
    </div>
  );
};

export default TitleBar;
