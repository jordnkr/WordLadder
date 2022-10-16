import React from 'react';

import classes from './KeyboardKey.module.css';

const KeyboardKey = (props) => {
  const clickHandler = (e) => {
    props.onButtonPress(e.target.textContent);
  }

  return ( <button onClick={clickHandler} className={classes.button}>{props.value}</button> );
}
 
export default KeyboardKey;