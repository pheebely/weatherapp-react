import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

export default function WeatherForecast(props) {
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
      <div className="col-sm-9">
        <div className="p-3 h-100 current-forecast-col" id="current-forecast">
          <div className="row justify-content-center">
            <div className="col">
              <p>
                Monday
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                  alt="weather icon"
                />
                <div className="row mx-2 justify-content-center">
                  <div className="col p-0 tempExtreme" id="temp-high">
                    18°C
                  </div>
                  <div className="col p-0 tempExtreme" id="temp-low">
                    10°C
                  </div>
                </div>
              </p>
            </div>
            <div className="col">
              <img
                src={`http://openweathermap.org/img/w/${forecast.icon}.png`}
                alt="weather icon"
              />
            </div>
            <div className="col">
              <img
                src={`http://openweathermap.org/img/w/${forecast.icon}.png`}
                alt="weather icon"
              />
            </div>
            <div className="col">
              <img
                src={`http://openweathermap.org/img/w/${forecast.icon}.png`}
                alt="weather icon"
              />
            </div>
            <div className="col">
              <img
                src={`http://openweathermap.org/img/w/${forecast.icon}.png`}
                alt="weather icon"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    load();

    return null;
  }
}
