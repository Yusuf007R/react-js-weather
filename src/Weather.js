import React, { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import "./Main.css";
import cloud_sun_svg from "./images/cloudy_sun.svg";
import cloud_moon_svg from "./images/cloudy_moon.svg";
import raining_sun_svg from "./images/raining_sun.svg";
import raining_moon_svg from "./images/raining_moon.svg";
import moon_svg from "./images/moon.svg";
import sun_svg from "./images/sun.svg";
import lightning_svg from "./images/lightning.svg";
import drizzle_svg from "./images/drizzle.svg";
import snow_svg from "./images/snow.svg";
import Hourly from "./Hourly.js";

function Weather(props) {
  const [dataReact, setDataReact] = useState({});
  const [weatherImg, setWeatherImg] = useState();
  const [sunriseState, setSunrise] = useState();
  const [date, setDate] = useState([]);
  
  useEffect(()=>{
    if(props.query != null){
        getData()
    }
  },[props.query])


  const getData = async () => {
    const rawData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${props.query}&appid=3803f6a6a3d667409ef82e45fd337af5&units=metric`
    );
    const data = await rawData.json();
    const rawDataHourly = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&%20&appid=3803f6a6a3d667409ef82e45fd337af5&units=metric`
    );
    let tempDate = new Date();
    var fullDate = new Date(
      (data.dt + data.timezone + tempDate.getTimezoneOffset() * 60) * 1000
    );
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let exactDate = [
      fullDate.getDate(),
      fullDate.getMonth(),
      fullDate.getFullYear(),
      days[fullDate.getDay()],
      months[fullDate.getMonth() + 1],
    ];
    setDate(exactDate);

    const dataHourly = await rawDataHourly.json();
    var sunrise = { sunrise: data.sys.sunrise, sunset: data.sys.sunset };
    setSunrise(sunrise);
    let img;
    if (data.weather[0].id < 300) {
      img = lightning_svg;
    } else if (data.weather[0].id < 400) {
      img = drizzle_svg;
    } else if (data.weather[0].id < 600) {
      if (data.dt > data.sys.sunrise && data.dt < data.sys.sunset) {
        img = raining_sun_svg;
      } else {
        img = raining_moon_svg;
      }
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
      timezoneOffset: data.timezone,
    };
    setDataReact(neededData);
    setWeatherImg(img);
  };
  return (
    <div>
      <div className="mainInfo">
        <div className="mainInfoTL">
          <h1 className="cityName">
            {dataReact.city}, {dataReact.country}
          </h1>
          <h3 className="date">
            {date[3]} {date[0]} {date[4]}, {date[2]}
          </h3>
          <img className="svg" src={weatherImg} alt="x" />
          <h2 className="weatherDesc">{dataReact.description}</h2>
        </div>
        <div className="mainInfoTR">
          <p className="infoTemperature">{Math.round(dataReact.temp) + "°"}</p>
          <p className="infoMinMax">
            {Math.round(dataReact.lowestTemp)}°/
            {Math.round(dataReact.highestTemp)}°
          </p>
        </div>
      </div>
      <div className="hourlyDiv">
        <Hourly data={dataReact} sunrise={sunriseState} hour="2" />
        <Hourly data={dataReact} sunrise={sunriseState} hour="3" />
        <Hourly data={dataReact} sunrise={sunriseState} hour="4" />
        <Hourly data={dataReact} sunrise={sunriseState} hour="5" />
        <Hourly data={dataReact} sunrise={sunriseState} hour="6" />
        <Hourly data={dataReact} sunrise={sunriseState} hour="7" />
      </div>
    </div>
  );
}

export default Weather;
