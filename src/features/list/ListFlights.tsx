import { Skeleton } from "@mui/material";
import FlightCard from "./FlightCard";
import { FlightData } from "./types";

const ListFlights = ({
  flights,
  loading,
}: {
  flights: FlightData | undefined;
  loading: boolean;
}) => {
  return (
    <>
      {loading && <Skeleton height={"50px"} animation="wave" />}
      {loading && <Skeleton height={"50px"} animation="wave" />}
      {loading && <Skeleton height={"50px"} animation="wave" />}
      {flights?.itineraries.map((it) => (
        <FlightCard key={it.id} itinerary={it} />
      ))}
    </>
  );
};

export default ListFlights;
