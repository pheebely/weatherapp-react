import React, { useState } from "react";
import axios from "axios";

export default function Weather(props) {
  let [weather, setWeather] = useState({ loaded: false });
  let [search, setSearch] = useState(props.defaultSearch);

  function getWeather(response) {
    console.log(response);
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
      long: response.data.coord.long,
      lat: response.data.coord.lat,
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
    return (
      <div className="Weather">
        <div className="col-sm-4 m-2">{form}</div>
        <div className="row m-2 p-4" id="current-temp">
          <h2>{Math.round(weather.temperature)}°C</h2>
          <h3>{weather.city}</h3>
          <p>Feels like {Math.round(weather.feelslike)}°C</p>
        </div>
        <div className="row gy-2 mx-2" id="current-forecast-container">
          <div className="col-sm-4 p-4" id="current-temp-details">
            <h3>{weather.description}</h3>
            <ul>
              <li>
                <i class="fa-solid fa-droplet"></i> Humidity{" "}
                <span id="details-style">{Math.round(weather.humidity)}%</span>
              </li>
              <li>
                <i class="fa-solid fa-wind"></i> Wind{" "}
                <span id="details-style">{Math.round(weather.wind)}km/h</span>
              </li>
              <li>
                <i class="fa-solid fa-arrows-down-to-line"></i> Pressure{" "}
                <span id="details-style">{Math.round(weather.wind)} hPa</span>
              </li>
            </ul>
          </div>
          <div className="col-sm ms-sm-2 p-3" id="current-forecast">
            <div className="row justify-content-center">
              <div className="col">
                <p>
                  Monday
                  <img
                    src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                    alt="weather icon"
                  />
                  <div className="row">
                    <div className="col tempExtreme" id="temp-high">
                      18°C
                    </div>
                    <div className="col tempExtreme" id="temp-low">
                      10°C
                    </div>
                  </div>
                </p>
              </div>
              <div className="col">
                <img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  alt="weather icon"
                />
              </div>
              <div className="col">
                <img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  alt="weather icon"
                />
              </div>
              <div className="col">
                <img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  alt="weather icon"
                />
              </div>
              <div className="col">
                <img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  alt="weather icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    apiSearch();
    return form;
  }
}
