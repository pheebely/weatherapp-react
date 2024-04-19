import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function maxTemperature() {
    let temperature = Math.round(props.data.temp.max);
    return `${temperature}°`;
  }

  function minTemperature() {
    let temperature = Math.round(props.data.temp.min);
    return `${temperature}°`;
  }

  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  return (
    <div className="col">
      <div className="WeatherForecast-day p-2 pt-0">{day()}</div>
      <WeatherIcon iconData={props.data.weather[0].icon} size={32} />
      <div className="row mx-2 justify-content-center">
        <div className="col p-0 tempExtreme" id="temp-high">
          {maxTemperature()}
        </div>
        <div className="col p-0 tempExtreme" id="temp-low">
          {minTemperature()}
        </div>
      </div>
    </div>
  );
}
