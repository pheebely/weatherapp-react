import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Simple Weather</h1>
        <Weather defaultSearch="Paris" />
        <footer className="px-2 pb-5">
          Coded by Phoebe Ly and is open sourced on
          <a href="https://github.com/pheebely/weatherapp-react">
            {" "}
            GitHub
          </a>{" "}
          hosted on{" "}
          <a href="https://soft-cranachan-a772ce.netlify.app/">Netlify</a>.{" "}
          Forecast data from
          <a href="https://openweathermap.org/api"> OpenWeather</a>.
        </footer>
      </div>
    </div>
  );
}

export default App;
