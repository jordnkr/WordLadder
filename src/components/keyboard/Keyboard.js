import React from "react";

import classes from "./Keyboard.module.css";
import KeyboardRow from "./KeyboardRow";

const Keyboard = (props) => {
  const keys = {
    top: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    middle: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    bottom: ["Backspace", "Z", "X", "C", "V", "B", "N", "M", "Enter"]
  }

  return (
    <div className={classes.keyboard}>
      <KeyboardRow keys={keys.top} onButtonPress={props.onButtonPress} />
      <KeyboardRow keys={keys.middle} onButtonPress={props.onButtonPress} />
      <KeyboardRow keys={keys.bottom} onButtonPress={props.onButtonPress} />
    </div>
  );
};

export default Keyboard;
