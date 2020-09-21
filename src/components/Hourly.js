import React, { useEffect, useState } from "react";
import "../App.css";
import WeatherSVG from "./WeatherSVG.js";
import { Animated } from "react-animated-css";

function Hourly(props) {
  const [datahour, setDatahour] = useState({});
  const [exactHour, setexactHour] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});
  
  useEffect(() => {
    if (props.data.hourly !== undefined) {
      setDatahour(props.data.hourly[props.hour]);
      formatHour();
      setWeatherInfo({sunset:props.sunrise.sunset,sunrise:props.sunrise.sunrise,id:props.data.hourly[props.hour].weather[0].id})
    }
         // eslint-disable-next-line
  }, [props.data, props.hour, props.hourFormatted]);

  const formatHour = () => {
    let tempDate = new Date();
    var fullDate = new Date(
      (props.data.hourly[props.hour].dt +
        props.data.timezoneOffset +
        tempDate.getTimezoneOffset() * 60) *
        1000
    );
    let hour = { hour: fullDate.getHours(), ampm: null };
    if (hour.hour === 0) {
      hour.hour = 12;
      hour.ampm = "AM";
    } else if (hour.hour > 12) {
      hour.hour -= 12;
      hour.ampm = "PM";
    } else {
      hour.ampm = "AM";
    }

    setexactHour(hour);
  };

  return props.data.hourly !== undefined ? (
    <Animated
    animationIn="bounceIn"
    isVisible={true}
  >
    <div className="hourMainDiv">
      <h1 className="hour">
        {exactHour.hour}
        {exactHour.ampm}
      </h1>
      <WeatherSVG
        dt={datahour.dt}
        sunset={weatherInfo.sunset}
        sunrise={weatherInfo.sunrise}
        id={weatherInfo.id}
      />
      <h2 className="hourTemp">{Math.round(datahour.temp)}°</h2>
    </div>
    </Animated>

  ):(
    <div>

    </div>
  )
}

export default Hourly;
