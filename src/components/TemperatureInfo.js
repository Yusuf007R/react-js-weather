import React from "react";
import { Animated } from "react-animated-css";

function TemperatureInfo(props) {
  return props.data.lowestTemp !== undefined ? (
    <Animated
      animationIn="bounceIn"
      isVisible={true}
    >
      <div className="mainInfoTR">
        <p className="infoTemperature">{Math.round(props.data.temp) + "°"}</p>
        <p className="infoMinMax">
          {Math.round(props.data.lowestTemp)}°/
          {Math.round(props.data.highestTemp)}°
        </p>
      </div>
    </Animated>
  ) : (
    <div></div>
  );
}

export default TemperatureInfo;
