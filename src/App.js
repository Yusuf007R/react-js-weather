import React from "react";
import { Animated } from "react-animated-css";
import "./App.css";
import Main from "./Main.js";

function App() {
  return (
    <div className="background">
      <div className="mainDiv">
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} animationInDuration={2000}>
          <Main />
        </Animated>
      </div>
    </div>
  );
}
export default App;
