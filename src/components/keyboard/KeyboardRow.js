import React from "react";

import KeyboardKey from "./KeyboardKey";
import classes from "./KeyboardRow.module.css";

const KeyboardRow = (props) => {
  return (
    <div className={classes.row}>
      {props.keys.map((key) => (
        <KeyboardKey value={key} onButtonPress={props.onButtonPress} />
      ))}
    </div>
  );
};

export default KeyboardRow;
