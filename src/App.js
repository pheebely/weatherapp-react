import "./App.css";
import Map from "./Map";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Simple Weather</h1>
        <Weather defaultSearch="Paris" />
        <footer>
          <a href="https://github.com/pheebely/weatherapp-react">GitHub Code</a>{" "}
          by Phoebe Ly for SheCodes
        </footer>
      </div>
    </div>
  );
}

export default App;
