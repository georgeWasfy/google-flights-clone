import "./App.css";
import FlightCard from "./features/list/FlightCard";
import FlightSearchBar from "./features/search/SearchBar";
function App() {
  return (
    <div>
      <div className="imageContainer">
        <img src="src/assets/hero.svg" alt="Travel " className="image"></img>
      </div>

      <h1>Flight</h1>
      <FlightSearchBar />
      <FlightCard />
    </div>
  );
}

export default App;
