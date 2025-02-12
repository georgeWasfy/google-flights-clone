import { useContext } from "react";
import { SearchParamsContext } from "../context/SearchParamsContext";

const useSearchParams = () => {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error("Search Params Hook Cant be used outside form context");
  }
  return context;
};

export default useSearchParams;
