import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  function maxTemperatureC() {
    let temperature = Math.round(props.data.temp.max);
    return `${temperature}°`;
  }

  function minTemperatureC() {
    let temperature = Math.round(props.data.temp.min);
    return `${temperature}°`;
  }

  function maxTemperatureF() {
    let fahrenheitMax = (props.data.temp.max * 9) / 5 + 32;
    let temperature = Math.round(fahrenheitMax);
    return `${temperature}°`;
  }

  function minTemperatureF() {
    let fahrenheitMin = (props.data.temp.min * 9) / 5 + 32;
    let temperature = Math.round(fahrenheitMin);
    return `${temperature}°`;
  }

  return (
    <div className="col">
      <div className="WeatherForecast-day p-2 pt-0">{day()}</div>
      <WeatherIcon iconData={props.data.weather[0].icon} size={32} />
      <div className="row mx-2 justify-content-center">
        <div className="col p-0 tempExtreme" id="temp-high">
          {props.unit === "celsius" ? maxTemperatureC() : maxTemperatureF()}
        </div>
        <div className="col p-0 tempExtreme" id="temp-low">
          {props.unit === "celsius" ? minTemperatureC() : minTemperatureF()}
        </div>
      </div>
    </div>
  );
}
