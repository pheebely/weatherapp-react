import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  console.log(`Weather forecast received ${props.unit}`);

  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    console.log(response);
    setForecast(response.data.daily);
    setLoaded(true);
  }

  function load() {
    let apiKey = "ed238469f9b5e9d801834270e65449bc";
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  if (loaded) {
    return (
      <div className="col-sm">
        <div className="p-3 current-forecast-col" id="current-forecast">
          <div className="row justify-content-center">
            {forecast.map(function (dailyForecast, index) {
              if (index < 6) {
                return (
                  <div className="col-4 col-sm py-2" key={index}>
                    <WeatherForecastDay
                      data={dailyForecast}
                      unit={props.unit}
                    />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    );
  } else {
    load();

    return null;
  }
}
