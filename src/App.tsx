import "./App.css";
import SearchParamsContextProvider from "./context/SearchParamsContext";
import FlightCard from "./features/list/FlightCard";
import FlightSearchBar from "./features/search/SearchBar";
function App() {
  return (
    <>
      <div className="imageContainer">
        <img src="src/assets/hero.svg" alt="Travel " ></img>
      </div>

      <h1>Flight</h1>
      <SearchParamsContextProvider>
        <FlightSearchBar />
      </SearchParamsContextProvider>
      <FlightCard />
    </>
  );
}

export default App;
