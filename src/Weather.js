import React, { useState, useEffect } from "react";
import "./App.css";
import Hourly from "./components/Hourly.js";
import CityInfo from "./components/CityInfo.js";
import TemperatureInfo from "./components/TemperatureInfo.js";
import Error from "./components/Error.js";
function Weather(props) {
  const [dataReact, setDataReact] = useState({});
  const [sunriseState, setSunrise] = useState();
  const [date, setDate] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (props.query != null) {
      getData()
    }
     // eslint-disable-next-line
  }, [props.query]);

  const getData = async () => {
    setError(false)
    const rawData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${props.query}&appid=3803f6a6a3d667409ef82e45fd337af5&units=metric`
    );
    const data = await rawData.json();
    if(data.cod === '404'){
      setError(true)
      setTimeout(()=>{
      setError(false)
      },1000)
      return
    }
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
    const neededData = {
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      main: data.weather[0].main,
      weatherID: data.weather[0].id,
      temp: data.main.temp,
      highestTemp: dataHourly.daily[0].temp.max,
      lowestTemp: dataHourly.daily[0].temp.min,
      clouds: data.clouds.all,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      hourly: dataHourly.hourly,
      timezoneOffset: data.timezone,
      dt:data.dt,
      sunrise:data.sys.sunrise,
      sunst:data.sys.sunset
    };
    setDataReact(neededData);
  };


  return (
    <div>
      <div className="mainInfo">
        <Error error={error}/> 
        <div className="mainInfoTLXD">
          <CityInfo date={date} data={dataReact} />
        </div>
        <div className="mainInfoTRXD">
          <TemperatureInfo data={dataReact}/>
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
  )

}

export default Weather;
