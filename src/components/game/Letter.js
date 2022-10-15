import React from 'react';

import classes from './Letter.module.css';

const Letter = (props) => {
  return ( <span className={`${classes.letter} ${classes[props.displayClass]}`}>{props.value.toUpperCase()}</span> );
}
 
export default Letter;