import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  // console.log(`Weather forecast received ${props.unit}`);

  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
    console.log(response.data);
  }

  function load() {
    let apiKey = "07bo10f2070ddf37c70acdt3d11ba4d4";
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (loaded) {
    return (
      <div className="col-sm">
        <div className="p-3 current-forecast-col" id="current-forecast">
          <div className="row justify-content-center">
            {forecast.map(function (dailyForecast, index) {
              //loop to go through forecast from 0 to 5 and create a div for each where data gets the dailyForecast
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
