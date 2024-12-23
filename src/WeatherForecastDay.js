import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function day() {
    let date = new Date(props.data.time * 1000); //get data from dailyForecast
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day]; //map the value from day to the same index in days
  }

  function maxTemperatureC() {
    let temperature = Math.round(props.data.temperature.maximum);
    return `${temperature}°`;
  }

  function minTemperatureC() {
    let temperature = Math.round(props.data.temperature.minimum);
    return `${temperature}°`;
  }

  function maxTemperatureF() {
    let fahrenheitMax = (props.data.temperature.maximum * 9) / 5 + 32;
    let temperature = Math.round(fahrenheitMax);
    return `${temperature}°`;
  }

  function minTemperatureF() {
    let fahrenheitMin = (props.data.temperature.minimum * 9) / 5 + 32;
    let temperature = Math.round(fahrenheitMin);
    return `${temperature}°`;
  }

  return (
    <div className="col">
      <div className="WeatherForecast-day p-2 pt-0">{day()}</div>
      <WeatherIcon code={props.data.condition.icon} size={32} />
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
