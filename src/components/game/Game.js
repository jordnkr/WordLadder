import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  generate,
  randomWord,
  validWord,
} from "../../word-ladder/wordladder.js";
import classes from "./Game.module.css";
import WordList from "./WordList";
import Results from "./Results";
import GameControls from "./GameControls.js";
import Keyboard from "../keyboard/Keyboard";

const Game = () => {
  const [resetToggle, setResetToggle] = useState(true);
  const [win, setWin] = useState(false);
  const [inputChars, setInputChars] = useState([]);
  const [maxInputs, setMaxInputs] = useState(false);
  const [enteredWords, setEnteredWords] = useState([]);
  const [startingWords, setStartingWords] = useState({
    firstWord: "",
    lastWord: "",
  });
  const dummyDiv = useRef(null);

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
        newChars.push(e.toUpperCase());
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
        setMaxInputs(true);
        setEnteredWords((prevWords) => {
          const newWords = [...prevWords];
          newWords.pop();
          return newWords;
        });
      }
    }
  }, [inputChars, maxInputs, enteredWords]);

  const enterHandler = useCallback(() => {
    dummyDiv.current.scrollIntoView({ behavior: "smooth" });
    const newWord = inputChars.join("").toLowerCase();
    const prevWord =
      enteredWords.length > 0
        ? enteredWords[enteredWords.length - 1]
        : startingWords.firstWord;

    // IF NEW WORD IN WORD LIST, AND ALSO IS ONLY 1 CHAR OFF PREV-WORD
    if (validWord(newWord) && charDifference(newWord, prevWord) === 1) {
      if (charDifference(newWord, startingWords.lastWord) <= 1) {
        setWin(true);
      } else {
        setInputChars([]);
        setMaxInputs(false);
        setEnteredWords((prevWords) => {
          const newWords = [...prevWords];
          newWords.push(newWord);
          return newWords;
        });
      }
    }
  }, [enteredWords, inputChars, startingWords]);

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
        alphabetHandler(e.key);
      } else if (e.keyCode === 8) {
        backspaceHandler();
      } else if (e.keyCode === 13 && maxInputs) {
        enterHandler();
      }
    },
    [maxInputs, alphabetHandler, backspaceHandler, enterHandler]
  );

  const handleKeyButtonPress = (value) => {
    if (value === "Del") {
      backspaceHandler();
    } else if (value === "Enter" && maxInputs) {
      enterHandler();
    } else if (!maxInputs) {
      alphabetHandler(value);
    }
  };

  useEffect(() => {
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
      if (
        ladder.length > 0 &&
        charDifference(ladder[0], ladder[ladder.length - 1]) <= 1
      ) {
        ladder = []; // if ladder words are only 1 apart, keep searching for pair
      }
    }
    setStartingWords({
      firstWord: ladder[0],
      lastWord: ladder[ladder.length - 1],
    });
  }, [resetToggle]);

  return (
    <>
      <div className={classes.game}>
        <WordList
          startingWords={startingWords}
          enteredWords={enteredWords}
          inputChars={inputChars}
          win={win}
        >
          <div ref={dummyDiv}></div>
        </WordList>
        <GameControls win={win} onReset={resetHandler} />
        {win && <Results message="You win!" />}
      </div>
      <Keyboard onButtonPress={handleKeyButtonPress} />
    </>
  );
};

export default Game;
