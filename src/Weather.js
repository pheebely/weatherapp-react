import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [loaded, setLoaded] = useState(false);
  let [search, setSearch] = useState("");
  let [weather, setWeather] = useState({});

  function updateSearch(event) {
    setSearch(event.target.value);
  }

  function getWeather(response) {
    console.log(response);
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon,
    });
  }

  function showResults(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ed238469f9b5e9d801834270e65449bc&units=metric`;
    axios.get(url).then(getWeather);
  }

  let form = (
    <form onSubmit={showResults}>
      <input type="text" placeholder="Type here" onChange={updateSearch} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="Weather">
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {Math.round(weather.humidity)}%</li>
          <li>Wind: {Math.round(weather.wind)}km/h</li>
          <li>
            <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
