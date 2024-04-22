import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherForecast from "./WeatherForecast";
import Map from "./Map";
import WeatherTemperature from "./WeatherTemperature";
import cloudyImage from "./assets/cloudy.jpg";
import clearImage from "./assets/clear.jpg";
import clearNightImage from "./assets/clear_night.avif";
import rainImage from "./assets/rain_cute.jpg";
import thunderImage from "./assets/thunderstorm.jpg";
import snowImage from "./assets/snow.jpeg";

export default function Weather(props) {
  let [weather, setWeather] = useState({ loaded: false });
  let [search, setSearch] = useState(props.defaultSearch);
  let [unit, setUnit] = useState("celsius");

  function showDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return `${days[day]}, ${date}/${month}`;
  }

  function getTime() {
    const today = new Date();

    let minutes = today.getMinutes();
    let hours = today.getHours();

    return { hours, minutes };
  }

  function showTime() {
    let minutes = getTime().minutes;
    let hours = getTime().hours;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (hours < 10) {
      hours = `0${hours}`;
    }

    return `${hours}:${minutes}`;
  }

  const handleUnitChange = (unit) => {
    console.log(`Temperature unit changed to: ${unit}`);
    setUnit(unit); //unit sent from WeatherTemperature
  };

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

  function setBackground() {
    const description = `${weather.description}`;
    const currentTime = getTime().hours;
    console.log(
      `The description and current time is ${description}, ${currentTime}`
    );

    if (
      description.includes("clear") &&
      (currentTime < 8 || currentTime > 17)
    ) {
      return { backgroundImage: `url(${clearImage})` };
    }
    if (
      description.includes("clear") &&
      (currentTime > 8 || currentTime < 17)
    ) {
      return { backgroundImage: `url(${clearNightImage})` };
    }
    if (description.includes("cloud") || description.includes("mist")) {
      return { backgroundImage: `url(${cloudyImage})` };
    }
    if (description.includes("rain")) {
      return { backgroundImage: `url(${rainImage})` };
    }
    if (description.includes("thunder")) {
      return { backgroundImage: `url(${thunderImage})` };
    }
    if (description.includes("snow")) {
      return { backgroundImage: `url(${snowImage})` };
    } else {
      return { backgroundImage: `url(${clearImage})` };
    }
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
        type="search"
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
        <div className="row"></div>
        <div className="col-sm-4 mx-2 my-3">{form}</div>

        <div className="row mx-2 p-4" id="current-temp" style={setBackground()}>
          <WeatherTemperature
            onUnitChange={handleUnitChange} //need to send this to WeatherForecastDay
            celsius={weather.temperature}
            city={weather.city}
            feelslike={weather.feelslike}
            icon={weather.icon}
          />
          <div className="col-sm-4 my-3">
            <div className="p-3 current-forecast-col" id="current-temp-details">
              <div className="row">
                <div className="col text-left">{showDate()}</div>
                <div className="col d-flex flex-column align-items-end">
                  {showTime()}
                </div>
              </div>
              <hr></hr>
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
                  <span id="details-style">{Math.round(weather.wind)}km/h</span>
                </li>
                <li>
                  <i class="fa-solid fa-arrows-down-to-line"></i> Pressure{" "}
                  <span id="details-style">{Math.round(weather.wind)} hPa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container-fluid px-2 mb-3">
          <div
            className="row mt-1 g-3 justify-content-center"
            id="current-forecast-container"
          >
            <WeatherForecast coordinates={weather.coord} unit={unit} />
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
