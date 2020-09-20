import React, { useState } from "react";
import { Animated } from "react-animated-css";
import "./Main.css";
import search_svg from "./images/search.svg";
import Weather from "./Weather.js"

function Main() {
  const [query, setQuery] = useState();
  const [propQuery, setPropQuery] = useState(null);
  const searchcity = (evt) => {
    if (evt.key === "Enter") {
      setQuery("");
      setPropQuery(document.getElementById("searchBarID").value)
    }
  };
  return (
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
        <img className="searchSvg" src={search_svg} alt="xd" />
      </div>
      <Weather query={propQuery}/>
    </div>
  );
}

export default Main;
