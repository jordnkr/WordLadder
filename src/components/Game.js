import React, { useEffect, useState } from "react";

import { generate, randomWord, validWord } from "../word-ladder/wordladder.js";
import classes from "./Game.module.css";

const Game = () => {
  const [resetToggle, setResetToggle] = useState(true);
  const [inputChars, setInputChars] = useState([]);
  const [maxInputs, setMaxInputs] = useState(false);
  const [enteredWords, setEnteredWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [startingWords, setStartingWords] = useState({
    firstWord: "",
    lastWord: "",
  });

  // Determines amount of different chars between 2 strings (same size)
  const charDifference = (str1, str2) => {
    let diff = 0;
    for (let i = 0; i < 4; i++) {
      if (str1[i] !== str2[i]) {
        diff += 1;
      }
    }
    return diff;
  };

  const alphabetHandler = (e) => {
    if (inputChars.length === 3) {
      setMaxInputs(true);
    }
    setInputChars((prevChars) => {
      const newChars = [...prevChars];
      newChars.push(e.key.toUpperCase());
      return newChars;
    });
  };

  const backspaceHandler = () => {
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
  };

  const enterHandler = () => {
    const newWord = inputChars.join("").toLowerCase();
    // IF NEW WORD IN WORD LIST, AND ALSO IS ONLY 1 CHAR OFF PREV-WORD
    if (validWord(newWord) && charDifference(newWord, currentWord) <= 1) {
      setInputChars([]);
      setMaxInputs(false);
      setCurrentWord(newWord);
      setEnteredWords((prevWords) => {
        const newWords = [...prevWords];
        newWords.push(newWord);
        return newWords;
      });
    }
  };

  const handleKeyDown = (e) => {
    console.log(e);
    if (
      ((e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 97 && e.keyCode <= 122)) &&
      !maxInputs &&
      enteredWords.length < 4
    ) {
      alphabetHandler(e);
    } else if (e.keyCode == 8) {
      backspaceHandler();
    } else if (e.keyCode == 13 && maxInputs) {
      enterHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputChars, enteredWords]);

  useEffect(() => {
    let ladder = [];
    // generate() function doesn't always return a ladder
    while (ladder.length === 0) {
      ladder = generate(randomWord());
    }
    setCurrentWord(ladder[0]);
    setStartingWords({
      firstWord: ladder[0],
      lastWord: ladder[ladder.length - 1],
    });
  }, [resetToggle]);

  const resetHandler = (event) => {
    setResetToggle((prevState) => !prevState);
    setInputChars([]);
    setEnteredWords([]);
    setMaxInputs(false);
    event.target.blur();
  };

  return (
    <>
      <div className={classes.section}>
        <p>First Word: {startingWords.firstWord}</p>
        <p>Last Word: {startingWords.lastWord}</p>
      </div>
      <div className={classes.section}>
        {inputChars.map((char) => (
          <span>{char}</span>
        ))}
      </div>
      <div className={classes.section}>
        {enteredWords.map((word) => (
          <span>{`${word} `}</span>
        ))}
      </div>
      <button id="cars" onClick={resetHandler}>
        Reset
      </button>
    </>
  );
};

export default Game;
