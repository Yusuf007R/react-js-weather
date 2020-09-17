import React, { useEffect, useState } from "react";
import "./App.css";
import cloud_sun_svg from "./svg/cloudy_sun.svg";
import cloud_moon_svg from "./svg/cloudy_moon.svg";
import moon from "./svg/moon.svg";
import sun from "./svg/sun.svg";
import lightning from "./svg/lightning.svg";

function App() {
  // useEffect(() => {
  //   fetchx();
  // }, []);

  const [dataReact, setDataReact] = useState([
    {
      main: {},
    },
  ]);
  const [query,setQuery] = useState([])

  const searchcity = evt =>{
    if(evt.key === "Enter"){
      fetchx()
      setQuery("")
      document.getElementById("searchBarID").innerHTML = "xd"
    }
  }

  const fetchx = async () => {
    const rawData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=3803f6a6a3d667409ef82e45fd337af5&units=metric`
    );
    const data = await rawData.json();
    console.log(query)
    const neededData = {
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      main: data.weather[0].main,
      temp: data.main.temp,
      highestTemp: data.main.temp_max,
      lowestTemp: data.main.temp_min,
      clouds: data.clouds.all,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    };

    setDataReact(neededData);
    console.log(data);
  };
  return (
    <div className="background">
      <div className="mainDiv">
        <div className="input">
          <input
            className="searchBar"
            type="text"
            name="searchBar"
            id="searchBarID"
            onChange={xd => setQuery(xd.target.value)}
            value={query}
            onKeyPress={searchcity}
            placeholder="search..."
          />
        </div>
        <div className="mainInfo">
          <div className="mainInfoTL">
  <h1 className="cityName">{dataReact.city}, {dataReact.country}</h1>
            <h3 className="date">September 16,2020</h3>
            <img className="svg" src={cloud_moon_svg} alt="x" />
            <h2 className="weatherDesc">{dataReact.description}</h2>
          </div>
          <div className="mainInfoTR">
            <p className="infoTemperature">
              {Math.round(dataReact.temp) + "°"}
            </p>

            <p className="infoMinMax">
              {Math.round(dataReact.lowestTemp)}°/
              {Math.round(dataReact.highestTemp)}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
