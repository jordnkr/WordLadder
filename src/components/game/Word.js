import React from "react";
import Letter from "./Letter";

import classes from "./Word.module.css";

const Word = (props) => {
  return (
    <div>
      {(() => {
        const arr = [];
        for (let i = 0; i < props.word.length; i++) {
          arr.push(
            <Letter value={props.word[i]} displayClass={props.displayClass} />
          );
        }
        return arr;
      })()}
    </div>
  );
};

export default Word;
