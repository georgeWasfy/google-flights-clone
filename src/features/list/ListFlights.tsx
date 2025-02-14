import { Box, Button, Skeleton } from "@mui/material";
import FlightCard from "./FlightCard";
import { FlightData } from "./types";
import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";

const ListFlights = ({
  flights,
  loading,
}: {
  flights: FlightData | undefined;
  loading: boolean;
}) => {
  const [limit, setLimit] = useState(1);
  const loadMore = () => {
    setLimit(limit + 10);
    setItineraries(flights?.itineraries.slice(0, limit + 10));
  };
  const [itineraries, setItineraries] = useState(
    flights?.itineraries.slice(0, limit)
  );
  const canLoadMore = () => {
    if (flights?.itineraries && limit >= flights?.itineraries.length)
      return true;
    return false;
  };
  return (
    <>
      {loading && <Skeleton height={"50px"} animation="wave" />}
      {loading && <Skeleton height={"50px"} animation="wave" />}
      {loading && <Skeleton height={"50px"} animation="wave" />}
      {itineraries?.map((it) => (
        <FlightCard key={it.id} itinerary={it} />
      ))}
      <Box sx={{ width: 200 }}>
        <Button
          onClick={loadMore}
          disabled={canLoadMore()}
          variant="text"
          sx={{
            width: "100%",
            textAlign: "center",
            borderRadius: "50px",
            transition: "all 0.3s ease-in-out",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
          endIcon={<ExpandMore />}
        >
          Load More Items
        </Button>
      </Box>
    </>
  );
};

export default ListFlights;
