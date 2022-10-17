import React, { useEffect, useRef } from "react";
import Button from "../UI/Button";

import Modal from "../UI/Modal";
import classes from "./Help.module.css";

const Help = (props) => {
  const btnRef = useRef();

  useEffect(() => {
    btnRef.current.focus();
  });

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.modalContent}>
        <h2 className={classes.title}>How To Play</h2>
        <div className={classes.instructions}>
          <p>Connect the first and last words.</p>
          <p>With each new entered word, only 1 letter at a time can change.</p>
          <p>That's it!</p>
        </div>
        <Button onClick={props.onClose} ref={btnRef}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default Help;
