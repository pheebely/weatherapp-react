import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherForecast from "./WeatherForecast";
import Map from "./Map";

export default function Weather(props) {
  let [weather, setWeather] = useState({ loaded: false });
  let [search, setSearch] = useState(props.defaultSearch);

  function getWeather(response) {
    setWeather({
      loaded: true,
      city: response.data.name,
      feelslike: response.data.main.feels_like,
      temperature: response.data.main.temp,
      pressure: response.data.main.pressure,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon,
      coord: response.data.coord, //long, lat
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    apiSearch();
  }

  function updateSearch(event) {
    setSearch(event.target.value);
  }

  function apiSearch() {
    let apiKey = "ed238469f9b5e9d801834270e65449bc";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
    axios.get(url).then(getWeather);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city"
        onChange={updateSearch}
        className="search-input"
      />
      <button class="search-button" type="submit">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );

  if (weather.loaded) {
    console.log(weather.coord);
    return (
      <div className="Weather">
        <div className="col-sm-4 mx-2 my-3">{form}</div>
        <div className="row mx-2 p-4" id="current-temp">
          <h2>{Math.round(weather.temperature)}°C</h2>
          <h3>{weather.city}</h3>
          <p>Feels like {Math.round(weather.feelslike)}°C</p>
        </div>
        <div className="container-fluid px-2 mb-3">
          <div className="row mt-1 g-3" id="current-forecast-container">
            <div className="col-sm-3">
              <div
                className="p-3 h-100 current-forecast-col"
                id="current-temp-details"
              >
                <h3>{weather.description}</h3>
                <ul>
                  <li>
                    <i class="fa-solid fa-droplet"></i> Humidity{" "}
                    <span id="details-style">
                      {Math.round(weather.humidity)}%
                    </span>
                  </li>
                  <li>
                    <i class="fa-solid fa-wind"></i> Wind{" "}
                    <span id="details-style">
                      {Math.round(weather.wind)}km/h
                    </span>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrows-down-to-line"></i> Pressure{" "}
                    <span id="details-style">
                      {Math.round(weather.wind)} hPa
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <WeatherForecast coordinates={weather.coord} />
            <Map coordinates={weather.coord} />
          </div>
        </div>
      </div>
    );
  } else {
    apiSearch();
    return form;
  }
}
