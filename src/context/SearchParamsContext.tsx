import { createContext, ReactNode, useState } from "react";

type SearchParamsContextType = {
  setDepartureCity: React.Dispatch<
    React.SetStateAction<{
      id: string;
      label: string;
      skyId: string;
    } | null>
  >;
  setDestinationCity: React.Dispatch<
    React.SetStateAction<{
      id: string;
      label: string;
      skyId: string;
    } | null>
  >;
  setDepartureDate: React.Dispatch<
    React.SetStateAction<Date | null | undefined>
  >;
  setReturnDate: React.Dispatch<React.SetStateAction<Date | null | undefined>>;
  setTripType: React.Dispatch<React.SetStateAction<string>>;
  setFlightClass: React.Dispatch<React.SetStateAction<string>>;
  departureCity: {
    id: string;
    label: string;
    skyId: string;
  } | null;
  destinationCity: {
    id: string;
    label: string;
    skyId: string;
  } | null;
  departureDate: Date | null | undefined;
  returnDate: Date | null | undefined;
  tripType: string;
  flightClass: string;
  incrementPassengersCount: (x: string) => void;
  decrementPassengersCount: (x: string) => void;
  getTotalPassengers: () => number;
  getPassengersCount: (x: string) => number;
  reverseDepartureDestination: () => void;
  getFullSearchParams: () => void;
};

export const SearchParamsContext =
  createContext<SearchParamsContextType | null>(null);

export default function SearchParamsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [departureCity, setDepartureCity] = useState<{
    id: string;
    label: string;
    skyId: string;
  } | null>(null);
  const [destinationCity, setDestinationCity] = useState<{
    id: string;
    label: string;
    skyId: string;
  } | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null | undefined>(
    null
  );
  const [returnDate, setReturnDate] = useState<Date | null | undefined>(null);
  const [tripType, setTripType] = useState("one-way");
  const [flightClass, setFlightClass] = useState("economy");

  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

  const getTotalPassengers = () => {
    return adultsCount + childrenCount + infantsCount;
  };
  const getPassengersCount = (type: string) => {
    switch (type) {
      case "Adults":
        return adultsCount;
      case "Children":
        return childrenCount;
      case "Infants":
        return infantsCount;
      default:
        return 0;
    }
  };
  const incrementPassengersCount = (type: string) => {
    switch (type) {
      case "Adults":
        setAdultsCount(adultsCount + 1);
        break;
      case "Children":
        setChildrenCount(childrenCount + 1);
        break;
      case "Infants":
        setInfantsCount(infantsCount + 1);
        break;
      default:
        break;
    }
  };

  const decrementPassengersCount = (type: string) => {
    switch (type) {
      case "Adults":
        if (adultsCount > 0) {
          setAdultsCount(adultsCount - 1);
        }
        break;
      case "Children":
        if (childrenCount > 0) {
          setChildrenCount(childrenCount - 1);
        }
        break;
      case "Infants":
        if (infantsCount > 0) {
          setInfantsCount(infantsCount - 1);
        }
        break;
      default:
        break;
    }
  };

  const reverseDepartureDestination = () => {
    const dep = departureCity;
    const det = destinationCity;
    setDepartureCity(det);
    setDestinationCity(dep);
  };

  const getFullSearchParams = () => {
    return {
      originSkyId: departureCity?.skyId,
      destinationSkyId: destinationCity?.skyId,

      originEntityId: departureCity?.id,
      destinationEntityId: destinationCity?.id,

      date: departureDate?.toLocaleDateString("en-CA"),
      returnDate: returnDate ?? undefined,

      cabinClass: flightClass,

      adults: adultsCount,
      childrens: childrenCount,
      infants: infantsCount,
    };
  };

  return (
    <SearchParamsContext.Provider
      value={{
        setDepartureCity,
        setDestinationCity,
        setDepartureDate,
        setReturnDate,
        setTripType,
        setFlightClass,
        departureCity,
        destinationCity,
        departureDate,
        returnDate,
        tripType,
        flightClass,
        incrementPassengersCount,
        decrementPassengersCount,
        getTotalPassengers,
        getPassengersCount,
        reverseDepartureDestination,
        getFullSearchParams,
      }}
    >
      {children}
    </SearchParamsContext.Provider>
  );
}
