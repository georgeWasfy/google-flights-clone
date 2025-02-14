import FlightCard from "./FlightCard";
import { FlightData } from "./types";

const ListFlights = ({ flights }: { flights: FlightData | undefined }) => {
  return (
    <>
      {flights?.itineraries.map((it) => (
        <FlightCard key={it.id} itinerary={it} />
      ))}
    </>
  );
};

export default ListFlights;
