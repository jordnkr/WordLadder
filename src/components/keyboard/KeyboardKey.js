import React from 'react';

import classes from './KeyboardKey.module.css';

const KeyboardKey = (props) => {
  const clickHandler = (e) => {
    const text = e.target.textContent;
    e.target.blur();
    props.onButtonPress(text);
  }

  return ( <button onClick={clickHandler} className={`${classes.button} ${classes[props.color]}`}>{props.value}</button> );
}
 
export default KeyboardKey;