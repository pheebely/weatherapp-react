import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <h1>Simple Weather ☀️</h1>
      <body>
        <Weather name={""} temperature={""} />
      </body>
      <footer>
        <a href="https://github.com/pheebely/weatherapp-react">GitHub Code</a>{" "}
        by Phoebe Ly for SheCodes
      </footer>
    </div>
  );
}

export default App;
