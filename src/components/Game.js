import React, { useEffect, useState } from "react";

import { generate, randomWord } from "../word-ladder/wordladder.js";
import classes from "./Game.module.css";

const Game = () => {
  const [resetToggle, setResetToggle] = useState(true);
  const [inputChars, setInputChars] = useState([]);
  const [startingWords, setStartingWords] = useState([]);
  const [words, setWords] = useState([]);
  const [maxInputs, setMaxInputs] = useState(false);

  const handleKeyDown = (e) => {
    console.log(e);
    if (
      // if alphabet key
      ((e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 97 && e.keyCode <= 122)) &&
      !maxInputs
    ) {
      if (inputChars.length === 3) {
        setMaxInputs(true);
      }
      setInputChars((prevChars) => {
        const newChars = [...prevChars];
        newChars.push(e.key.toUpperCase());
        return newChars;
      });
    } else if (e.keyCode == 8) {
      if (inputChars.length > 0) {
        setInputChars((prevChars) => {
          const newChars = [...prevChars];
          newChars.pop();
          return newChars;
        });
        if (maxInputs === true) {
          setMaxInputs(false);
        }
      }
    } else if (e.keyCode == 13 && maxInputs) {
      // if ENTER and 4 chars
      const newWord = inputChars.join("");
      // IF NEW WORD IN WORD LIST, AND ALSO IS ONLY 1 CHAR OFF PREV-WORD, DO FOLLOWING CODE
      setInputChars([]);
      setMaxInputs(false);
      setWords((prevWords) => {
        const newWords = [...prevWords];
        newWords.push(newWord);
        return newWords;
      });
    }
  };

  useEffect(() => {
    if (words.length < 6) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputChars, words]);

  useEffect(() => {
    const randWord = randomWord();
    setStartingWords(generate(randWord));
  }, [resetToggle]);

  const resetHandler = (event) => {
    setResetToggle((prevState) => !prevState);
    setInputChars([]);
    setStartingWords([]);
    setWords([]);
    setMaxInputs(false);
    event.target.blur();
  };

  return (
    <>
      <div className={classes.section}>
        <span>Starting Words: </span>
        {startingWords.map((word) => (
          word + " "
        ))}
      </div>
      <div className={classes.section}>
        {inputChars.map((char) => (
          <span>{char}</span>
        ))}
      </div>
      <div className={classes.section}>
        {words.map((word) => (
          <span>{`${word} `}</span>
        ))}
      </div>
      <button id="cars" onClick={resetHandler}>Reset</button>
    </>
  );
};

export default Game;
