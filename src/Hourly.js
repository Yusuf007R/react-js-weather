import React, { useEffect, useState } from "react";
import cloud_sun_svg from "./svg/cloudy_sun.svg";
import cloud_moon_svg from "./svg/cloudy_moon.svg";
import moon_svg from "./svg/moon.svg";
import sun_svg from "./svg/sun.svg";
import lightning_svg from "./svg/lightning.svg";
import drizzle_svg from "./svg/drizzle.svg";
import raining_svg from "./svg/raining.svg";
import snow_svg from "./svg/snow.svg";
import "./Hourly.css";

function Hourly(props) {
  const [datahour, setDatahour] = useState({});
  const [imgsvg, setImgsvg] = useState({});
  const [exactHour, setexactHour] = useState({});
  const [hour, setHour] = useState();

  useEffect(() => {
    if(props.data.hourly !== undefined){
      setDatahour(props.data.hourly[props.hour])
      setexactHour(props.hourFormatted)
      setHour(parseInt(props.hour))
      weather()
    }
  }, [props.data,props.hour,props.hourFormatted]);

  const weather = () =>{
    let sunrisexd = {sunrise:props.sunrie.sunrise,sunset:props.sunrie.sunset}
    let img
    if (props.data.hourly[props.hour].weather[0].id < 300) {
      img = lightning_svg;
    } else if (props.data.hourly[props.hour].weather[0].id < 400) {
      img = drizzle_svg;
    } else if (props.data.hourly[props.hour].weather[0].id < 600) {
      img = raining_svg;
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
  setImgsvg(img)
}

  return (
    <div className="hourMainDiv">
          {/* <button
            onClick={(exd) => {
              console.log(datahour);
              console.log(props.sunrie);
            }}
          ></button>  */}

        <h1 className="hour">{exactHour[0]}</h1>
      <img className="hourSvg" src={imgsvg} alt="xd" />
          <h2 className="hourTemp">{Math.round(datahour.temp)}</h2>
    </div>  
  );
}

export default Hourly;
