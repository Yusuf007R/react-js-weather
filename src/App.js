import React, { useState } from "react";
import { Animated } from "react-animated-css";
import "./App.css";
import search_svg from "./images/search.svg";
import Weather from "./components/Weather.js"

function App() {
  const [query, setQuery] = useState("");
  const [propQuery, setPropQuery] = useState(null);
  const searchcity = (evt) => {
    if (evt.key === "Enter"|| evt.type === "click") {
      setQuery("");
      setPropQuery(document.getElementById("searchBarID").value)
    }
  };
  return (
    <div className="background">
      <Animated
        animationIn="slideInUp"
        isVisible={true}
        animationInDuration={1000}
      >
        <div className="mainDiv">
          <div className="weatherDiv">
            <div className="input">
              <input
                className="searchBar"
                type="text"
                name="searchBar"
                id="searchBarID"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={searchcity}
                placeholder="search..."
              />
              <img onClick={searchcity} className="searchSvg" src={search_svg} alt="xd" />
            </div>
            <Weather query={propQuery} />
          </div>
        </div>
      </Animated>
    </div>
  );
}
export default App;
