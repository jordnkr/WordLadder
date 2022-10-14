import React, { useEffect, useState } from "react";

import { generate, randomWord } from "../word-ladder/wordladder.js";

const Game = () => {
  const [inputChars, setInputChars] = useState([]);
  const [words, setWords] = useState([]);
  const [maxInputs, setMaxInputs] = useState(false);

  const handleKeyDown = e => {
    console.log(e);
    if (
      ((e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 97 && e.keyCode <= 122)) &&
      !maxInputs
    ) {
      if (inputChars.length === 3) {
        setMaxInputs(true);
      }
      setInputChars((prevChars) => {
        const newChars = [...prevChars];
        newChars.push(e.key);
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
      const newWord = inputChars.join('');
      // IF NEW WORD IN WORD LIST, AND ALSO IS ONLY 1 CHAR OFF PREV-WORD, DO FOLLOWING CODE
      setInputChars([]);
      setMaxInputs(false);
      setWords((prevWords) => {
        const newWords = [...prevWords];
        newWords.push(newWord);
        return newWords;
      })
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputChars]);

  return (
    <>
      <div>
        {inputChars.map((char) => (
          <span>{char}</span>
        ))}
      </div>
      <div>
        {words.map((word) => (
          <span>{word} </span>
        ))}
      </div>
    </>
  );
};

export default Game;
