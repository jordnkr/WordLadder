import React, { useCallback, useEffect, useState } from "react";

import {
  generate,
  randomWord,
  validWord,
} from "../../word-ladder/wordladder.js";
import classes from "./Game.module.css";
import Word from "./Word.js";
import Letter from "./Letter.js";
import WordList from "./WordList.js";

const Game = () => {
  const [resetToggle, setResetToggle] = useState(true);
  const [win, setWin] = useState(false);
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

  const alphabetHandler = useCallback(
    (e) => {
      if (inputChars.length === 3) {
        setMaxInputs(true);
      }
      setInputChars((prevChars) => {
        const newChars = [...prevChars];
        newChars.push(e.key.toUpperCase());
        return newChars;
      });
    },
    [inputChars]
  );

  const backspaceHandler = useCallback(() => {
    if (inputChars.length > 0) {
      setInputChars((prevChars) => {
        const newChars = [...prevChars];
        newChars.pop();
        return newChars;
      });
      if (maxInputs === true) {
        setMaxInputs(false);
      }
    } else {
      if (enteredWords.length > 0) {
        let prevWord = enteredWords[enteredWords.length - 1];
        setInputChars(prevWord.split(""));
        setEnteredWords((prevWords) => {
          const newWords = [...prevWords];
          newWords.pop();
          return newWords;
        });
      }
    }
  }, [inputChars, maxInputs, enteredWords]);

  const enterHandler = useCallback(() => {
    const newWord = inputChars.join("").toLowerCase();

    // IF NEW WORD IN WORD LIST, AND ALSO IS ONLY 1 CHAR OFF PREV-WORD
    if (validWord(newWord) && charDifference(newWord, currentWord) <= 1) {
      if (charDifference(newWord, startingWords.lastWord) <= 1) {
        setWin(true);
      } else {
        setInputChars([]);
        setMaxInputs(false);
        setCurrentWord(newWord);
        setEnteredWords((prevWords) => {
          const newWords = [...prevWords];
          newWords.push(newWord);
          return newWords;
        });
      }
    }
  }, [currentWord, inputChars, startingWords]);

  const resetHandler = useCallback((event) => {
    setWin(false);
    setResetToggle((prevState) => !prevState);
    setInputChars([]);
    setEnteredWords([]);
    setMaxInputs(false);
    event.target.blur();
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (
        ((e.keyCode >= 65 && e.keyCode <= 90) ||
          (e.keyCode >= 97 && e.keyCode <= 122)) &&
        !maxInputs
      ) {
        alphabetHandler(e);
      } else if (e.keyCode === 8) {
        backspaceHandler();
      } else if (e.keyCode === 13 && maxInputs) {
        enterHandler();
      }
    },
    [maxInputs, alphabetHandler, backspaceHandler, enterHandler]
  );

  useEffect(() => {
    console.log(inputChars);
    if (!win) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputChars, enteredWords, win, handleKeyDown]);

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

  return (
    <div className={classes.game}>
      <WordList>
        <Word word={startingWords.firstWord} displayClass="starter" />
        {enteredWords.map((word) => (
          <Word word={word} />
        ))}
        {(() => {
          const arr = [];
          for (let i = 0; i < 4; i++) {
            arr.push(
              <Letter
                value={inputChars[i] ? inputChars[i] : ""}
                displayClass={inputChars.length === i && "active"}
              />
            );
          }
          return arr;
        })()}
        <Word word={startingWords.lastWord} displayClass="starter" />
      </WordList>
      {!win && <button onClick={resetHandler}>Reset</button>}
      {win && <button onClick={resetHandler}>Play Again</button>}
      {win && <p>You win!</p>}
    </div>
  );
};

export default Game;
