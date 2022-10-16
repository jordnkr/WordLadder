import React from "react";

import "./App.css";
import Game from "./components/game/Game";
import TitleBar from "./components/UI/TitleBar";

function App() {
  return (
    <>
      <TitleBar />
      <Game />
    </>
  );
}

export default App;
