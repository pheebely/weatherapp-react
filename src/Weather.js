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
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon,
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
        {form}
        <div className="row m-2 p-4" id="current-temp">
          <h2>{Math.round(weather.temperature)}°C</h2>
          <h3>{weather.city}</h3>
          <p>Feels like {Math.round(weather.feelslike)}</p>
        </div>
        <div className="row gx-5 m-2" id="current-forecast-container">
          <div className="col-sm-4 p-3" id="current-temp-details">
            <h3>{weather.description}</h3>
            <ul>
              <li>Humidity: {Math.round(weather.humidity)}%</li>
              <li>Wind: {Math.round(weather.wind)}km/h</li>
            </ul>
          </div>
          <div className="col-sm-8 p-3" id="current-forecast">
            <div className="row">
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
