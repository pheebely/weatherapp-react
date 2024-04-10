import React from "react";
import axios from "axios";

export default function Weather(props) {
  function handleResponse(response) {
    alert(`The weater in ${response.data.name} is ${response.data.main.temp}`);
  }

  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);

  return <h2>The weather in {props.city} is</h2>;
}
