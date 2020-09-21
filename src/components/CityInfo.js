import React from 'react';
import { Animated } from "react-animated-css";
import WeatherSVG from "./WeatherSVG.js"
function CityInfo(props) {
    return props.data.country !== undefined ? (
        <Animated
        animationIn="bounceIn"
        isVisible={true}
      >
        <div className="mainInfoTL">
          <h1 className="cityName">
            {props.data.city}, {props.data.country}
          </h1>
          <h3 className="date">
            {props.date[3]} {props.date[0]} {props.date[4]}, {props.date[2]}
          </h3>
            <WeatherSVG class="svg" dt={props.data.dt} sunset={props.data.sunset} sunrise={props.data.sunrise} id={props.data.weatherID} />
          <h2 className="weatherDesc">{props.data.description}</h2>
        </div>
        </Animated>
    ): (
        <div></div>
    )
}

export default CityInfo;