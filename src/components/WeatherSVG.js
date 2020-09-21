import React, { useState ,useEffect } from 'react';
import cloud_sun_svg from "../images/cloudy_sun.svg";
import cloud_moon_svg from "../images/cloudy_moon.svg";
import raining_sun_svg from "../images/raining_sun.svg";
import raining_moon_svg from "../images/raining_moon.svg";
import moon_svg from "../images/moon.svg";
import sun_svg from "../images/sun.svg";
import lightning_svg from "../images/lightning.svg";
import drizzle_svg from "../images/drizzle.svg";
import snow_svg from "../images/snow.svg";

function WeatherSVG(props) {
    const [weatherImg, setWeatherImg] = useState();
    useEffect(()=>{
        let img
        if (props.id < 300) {
            img = lightning_svg;
          } else if (props.id < 400) {
            img = drizzle_svg;
          } else if (props.id < 600) {
            if (props.dt > props.sunrise && props.dt < props.sunset) {
              img = raining_sun_svg;
            } else {
              img = raining_moon_svg;
            }
          } else if (props.id < 700) {
            img = snow_svg;
          } else if (props.id === 800) {
            if (props.dt > props.sunrise && props.dt < props.sunset) {
              img = sun_svg;
            } else {
              img = moon_svg;
            }
          } else if (props.id < 900) {
            if (props.dt > props.sunrise && props.dt < props.sunset) {
              img = cloud_sun_svg;
            } else {
              img = cloud_moon_svg;
              
            }
          }
          setWeatherImg(img)
    },[props])

    

    return (
        <div>
            <img className={props.class} src={weatherImg} alt="xd"/>
        </div>
    );
}

export default WeatherSVG;