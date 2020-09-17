import React, { useEffect, useState } from "react";
// import cloud_sun_svg from "./svg/cloudy_sun.svg";
import cloud_moon_svg from "./svg/cloudy_moon.svg";
// import moon from "./svg/moon.svg";
// import sun from "./svg/sun.svg";
// import lightning from "./svg/lightning.svg";
import "./Hourly.css";

function Hourly(props) {

  const [datahour, setDatahour] = useState([]);



  return (
    <div className="hourMainDiv">
      <h1 className="hour">12AM</h1>
      <img className="hourSvg" src={cloud_moon_svg} alt="xd" />
      <h2 className="hourTemp">25°</h2>
    </div>
  );
}

export default Hourly;
