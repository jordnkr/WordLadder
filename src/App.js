import React, { useState } from "react";

import "./App.css";
import Game from "./components/game/Game";
import Help from "./components/game/Help";
import TitleBar from "./components/UI/TitleBar";

function App() {
  const [helpShown, setHelpShown] = useState(false);

  const showHelpHandler = () => {
    setHelpShown(true);
  }

  const closeHelpHandler = () => {
    setHelpShown(false);
  }

  return (
    <>
      {helpShown && <Help onClose={closeHelpHandler} />}
      <TitleBar onHelp={showHelpHandler} />
      <Game />
    </>
  );
}

export default App;
