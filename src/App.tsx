import "./App.css";
import SearchParamsContextProvider from "./context/SearchParamsContext";
import FlightSearchBar from "./features/search/SearchBar";
function App() {
  return (
    <div >
      <div className="imageContainer">
        <img className="image" src="src/assets/hero.svg" alt="Travel " height="250px"></img>
      </div>
      <h1>Flight</h1>
      <SearchParamsContextProvider>
        <FlightSearchBar />
      </SearchParamsContextProvider>
    </div>
  );
}

export default App;
