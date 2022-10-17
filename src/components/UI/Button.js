import React from "react";

import classes from "./Button.module.css";

const Button = React.forwardRef((props, ref) => {
  return (
    <button
    ref={ref}
      className={`${classes.button} ${classes[props.color]}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
});

export default Button;
