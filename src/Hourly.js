import React, { useEffect, useState } from "react";
import cloud_sun_svg from "./images/cloudy_sun.svg"; 
import cloud_moon_svg from "./images/cloudy_moon.svg";
import raining_sun_svg from "./images/raining_sun.svg";
import raining_moon_svg from "./images/raining_moon.svg";
import moon_svg from "./images/moon.svg";
import sun_svg from "./images/sun.svg";
import lightning_svg from "./images/lightning.svg";
import drizzle_svg from "./images/drizzle.svg";
import snow_svg from "./images/snow.svg";
import "./Hourly.css";

function Hourly(props) {
  const [datahour, setDatahour] = useState({});
  const [imgsvg, setImgsvg] = useState({});
  const [exactHour, setexactHour] = useState({});

  useEffect(() => {
    if (props.data.hourly !== undefined) {
      setDatahour(props.data.hourly[props.hour]);
      formatHour();
      weather();
    }
  }, [props.data, props.hour, props.hourFormatted]);

  
  const formatHour = () => {
    let tempDate = new Date()
    var fullDate = new Date((props.data.hourly[props.hour].dt + props.data.timezoneOffset + (tempDate.getTimezoneOffset()*60)) * 1000);
    let hour = {hour:fullDate.getHours(),ampm:null}
    if(hour.hour === 0){
      hour.hour = 12 
      hour.ampm = "AM"
    }
    else if(hour.hour>12){
      hour.hour -=12
      hour.ampm = "PM"
    }
    else{
      hour.ampm = "AM"
    }

    setexactHour(hour)
  };

  const weather = () => {
    let sunrisexd = {
      sunrise: props.sunrise.sunrise,
      sunset: props.sunrise.sunset,
    };
    let img;
    if (props.data.hourly[props.hour].weather[0].id < 300) {
      img = lightning_svg;
    } else if (props.data.hourly[props.hour].weather[0].id < 400) {
      img = drizzle_svg;
    } else if (props.data.hourly[props.hour].weather[0].id < 600) {
      if (datahour.dt > sunrisexd.sunrise && datahour.dt < sunrisexd.sunset) {
        img = raining_sun_svg
      } else {
        img = raining_moon_svg
      }
    } else if (props.data.hourly[props.hour].weather[0].id < 700) {
      img = snow_svg;
    } else if (props.data.hourly[props.hour].weather[0].id === 800) {
      if (datahour.dt > sunrisexd.sunrise && datahour.dt < sunrisexd.sunset) {
        img = sun_svg;
      } else {
        img = moon_svg;
      }
    } else if (props.data.hourly[props.hour].weather[0].id < 900) {
      if (datahour.dt > sunrisexd.sunrise && datahour.dt < sunrisexd.sunset) {
        img = cloud_sun_svg;
      } else {
        img = cloud_moon_svg;
      }
    }
    setImgsvg(img);
  };

  return (
    <div className="hourMainDiv">
      {/* <button
        onClick={(exd) => {
          console.log(datahour);
          console.log(props.sunrise);
        }}
      ></button> */}

    <h1 className="hour">{exactHour.hour}{exactHour.ampm}</h1>
      <img className="hourSvg" src={imgsvg} alt="xd" />
      <h2 className="hourTemp">{Math.round(datahour.temp)}°</h2>
    </div>
  );
}

export default Hourly;
