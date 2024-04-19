import React, { useState } from "react";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celsius"); // default is celsius

  function convertToFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function convertToCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <div className="col">
        <h2 className="large">
          {Math.round(props.celsius)}
          <span className="small">
            {" "}
            °C{" "}
            <span className="units">
              | {""}
              <a href="/" onClick={convertToFahrenheit}>
                °F
              </a>
            </span>
          </span>
        </h2>

        <h3>{props.city}</h3>
        <p>Feels like {Math.round(props.feelslike)}°C</p>
      </div>
    );
  } else {
    let fahrenheit = (props.celsius * 9) / 5 + 32;
    let fahrenheitfeels = (props.feelslike * 9) / 5 + 32;

    return (
      <div className="col">
        <h2 className="large">
          {Math.round(fahrenheit)}
          <span className="small">
            {" "}
            °F{" "}
            <span className="units">
              | {""}
              <a href="/" onClick={convertToCelsius}>
                °C
              </a>
            </span>
          </span>
        </h2>
        <h3>{props.city}</h3>
        <p>Feels like {Math.round(fahrenheitfeels)}°F</p>
      </div>
    );
  }
}
