import React from "react";

import Word from "./Word";
import Letter from "./Letter";
import classes from "./WordList.module.css";

const WordList = (props) => {
  return (
    <div className={classes.wordlist}>
      <Word word={props.startingWords.firstWord} displayClass="starter" />
      {props.enteredWords.map((word) => (
        <Word word={word} displayClass={props.win && "gg"} />
      ))}
      {(() => {
          const arr = [];
          for (let i = 0; i < 4; i++) {
            arr.push(
              <Letter
                key={i}
                value={props.inputChars[i] ? props.inputChars[i] : ""}
                displayClass={
                  props.win
                    ? "gg"
                    : props.inputChars.length < 4
                    ? props.inputChars.length === i && "active"
                    : "active"
                }
              />
            );
          }
          return arr;
        })()}
      <Word word={props.startingWords.lastWord} displayClass="starter" />
      {props.children}
    </div>
  );
};

export default WordList;
