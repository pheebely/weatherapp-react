import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  // console.log(`Weather forecast received ${props.unit}`);

  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);
  // let [time, setTime] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  // function getDate(response) {
  //   const today = new Date();
  //   const timestamp = response.data.current.dt * 1000; //convert to millisecons
  //   const timezoneOffset = response.data.timezone_offset * 1000; //convert to milliseconds
  //   const timestampLocal = timestamp + timezoneOffset;

  //   console.log("System date:", today);
  //   console.log("Unix Timestamp:", timestamp);
  //   console.log("Timezone Offset (ms):", timezoneOffset);
  //   console.log("Local Timestamp (ms):", timestampLocal);

  //   let localTime = new Date(timestampLocal);

  //   console.log("Today is", localTime);
  //   return localTime;
  // }

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
    console.log(response.data);

    // setTime(getDate(response)); // Set the time state
    // props.onTimeChange(time); // Pass the time to the parent component
    // console.log("The time in forecast city is", time);
  }

  function load() {
    let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
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
