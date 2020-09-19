import React, { useState } from "react";
import "./App.css";
import cloud_sun_svg from "./svg/cloudy_sun.svg";
import cloud_moon_svg from "./svg/cloudy_moon.svg";
import moon_svg from "./svg/moon.svg";
import sun_svg from "./svg/sun.svg";
import lightning_svg from "./svg/lightning.svg";
import drizzle_svg from "./svg/drizzle.svg";
import raining_svg from "./svg/raining.svg";
import snow_svg from "./svg/snow.svg";
import Hourly from "./Hourly.js";
import search_svg from "./svg/search.svg";

function App() {
  // useEffect(() => {
  //   fetchx();
  // }, []);

  const [dataReact, setDataReact] = useState([
    {
      main: {},
    },
  ]);
  const [query, setQuery] = useState([]);
  const [weatherImg, setWeatherImg] = useState([]);
  const [sunriseState, setSunrise] = useState([]);
  const [date, setDate] = useState([]);
  const searchcity = (evt) => {
    if (evt.key === "Enter") {
      fetchx();
      setQuery("");
      document.getElementById("searchBarID").innerHTML = "xd";
    }
  };

  const fetchx = async () => {
    const rawData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=3803f6a6a3d667409ef82e45fd337af5&units=metric`
    );
    const data = await rawData.json();
    const rawDataHourly = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&%20&appid=3803f6a6a3d667409ef82e45fd337af5&units=metric`
    );
    // const rawTimeZoneData = await fetch(
    //   `http://api.timezonedb.com/v2.1/get-time-zone?key=HC0PRN62BP60&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`
    // );
    // const timezoneData = await rawTimeZoneData.json();
    // let exactHour = timezoneData.formatted.substr(11, timezoneData.formatted.length);
    // let exactDate = timezoneData.formatted.split(" ", 1)
    // exactDate = exactDate[0]
    // exactHour = exactHour.split(':');
    // exactDate = exactDate.split('-');
    // let temp = exactDate[1].split("0")
    // exactDate[1] = temp[1]
    
    // let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    // exactDate[1]= months[exactDate[1]-1]
    // setDate(exactDate)
    // setHour(exactHour)
    let tempDate = new Date()
    var fullDate = new Date((data.dt + data.timezone + (tempDate.getTimezoneOffset()*60)) * 1000);
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let exactDate = [fullDate.getDate(),fullDate.getMonth(),fullDate.getFullYear(),days[fullDate.getDay()],months[fullDate.getMonth()+1]]
    setDate(exactDate)
    console.log(exactDate)
    const dataHourly = await rawDataHourly.json();
    var sunrise = { sunrise: data.sys.sunrise, sunset: data.sys.sunset };
    setSunrise(sunrise);
    let img;
    if (data.weather[0].id < 300) {
      img = lightning_svg;
    } else if (data.weather[0].id < 400) {
      img = drizzle_svg;
    } else if (data.weather[0].id < 600) {
      img = raining_svg;
    } else if (data.weather[0].id < 700) {
      img = snow_svg;
    } else if (data.weather[0].id === 800) {
      if (data.dt > data.sys.sunrise && data.dt < data.sys.sunset) {
        img = sun_svg;
      } else {
        img = moon_svg;
      }
    } else if (data.weather[0].id < 900) {
      if (data.dt > data.sys.sunrise && data.dt < data.sys.sunset) {
        img = cloud_sun_svg;
      } else {
        img = cloud_moon_svg;
      }
    }

    const neededData = {
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      main: data.weather[0].main,
      weatherID: data.weather[0].id,
      temp: data.main.temp,
      highestTemp: data.main.temp_max,
      lowestTemp: data.main.temp_min,
      clouds: data.clouds.all,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      hourly: dataHourly.hourly,
      timezoneOffset:data.timezone
    };;
    setDataReact(neededData);
    setWeatherImg(img);
  };
  return (
    <div className="background">
      <div className="mainDiv">
        <div className="test">
          <div className="input">
            {/* <button
            onClick={(exd) => {
              console.log(dataReact.hourly[0].temp);
            }}
          ></button> */}
            <input
              className="searchBar"
              type="text"
              name="searchBar"
              id="searchBarID"
              onChange={(xd) => setQuery(xd.target.value)}
              value={query}
              onKeyPress={searchcity}
              placeholder="search..."
            />
            <img className="searchSvg" src={search_svg} alt="xd" />
          </div>
          <div className="mainInfo">
            <div className="mainInfoTL">
              <h1 className="cityName">
                {dataReact.city}, {dataReact.country}
              </h1>
        <h3 className="date">{date[3]} {date[0]} {date[4]}, {date[2]}</h3>
              <img className="svg" src={weatherImg} alt="x" />
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
          <div className="hourlyDiv">
            <Hourly
              data={dataReact}
              sunrise={sunriseState}
              hour="2"
            />
            <Hourly
              data={dataReact}
              sunrise={sunriseState}
              hour="3"
            />
            <Hourly
              data={dataReact}
              sunrise={sunriseState}
              hour="4"
            />
            <Hourly
              data={dataReact}
              sunrise={sunriseState}
              hour="5"
            />
            <Hourly
              data={dataReact}
              sunrise={sunriseState}
              hour="6"
            />
            <Hourly
              data={dataReact}
              sunrise={sunriseState}
              hour="7"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
