import React from "react";

import Button from "../UI/Button";
import classes from "./GameControls.module.css";

const GameControls = (props) => {
  return (
    <div className={classes.buttons}>
      {!props.win && <Button onClick={props.onReset} color="gray">Reset</Button>}
      {props.win && <Button onClick={props.onReset} color="gray">Play Again</Button>}
    </div>
  );
};

export default GameControls;
