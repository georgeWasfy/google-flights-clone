import {
  Accordion,
  AccordionSummary,
  Typography,
  Grid2,
  AccordionDetails,
  Divider,
} from "@mui/material";
import {
  calculateTotalWaitingTime,
  getEstimatedTime,
  getFormattedTimes,
} from "../../utils/time";
import useSearchParams from "../../hooks/useSearchParams";
import {
  ExpandMore,
} from "@mui/icons-material";
import FlightSegment from "./FlightSegment";
import { Itinerary } from "./types";
import { v4 as uuidv4 } from "uuid";
const FlightCard = ({ itinerary }: { itinerary: Itinerary }) => {
  const { tripType } = useSearchParams();
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Grid2 width="100%" container spacing={2} alignItems="center">
          <Grid2 size={1} alignItems="center">
            <img
              src={itinerary.legs[0].carriers.marketing[0].logoUrl}
              alt={itinerary.legs[0].carriers.marketing[0].name}
              style={{
                width: "100%",
                maxWidth: "40px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          </Grid2>

          <Grid2 size={3} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {getFormattedTimes({
                arrival: itinerary.legs[0].arrival,
                departure: itinerary.legs[0].departure,
              })}
            </Typography>
            {itinerary.legs[0].segments.map((seg) => (
              <Typography
                variant="caption"
                sx={{ color: "gray", marginBottom: "8px" }}
                key={uuidv4()}
              >
                {seg.marketingCarrier.name}
              </Typography>
            ))}
          </Grid2>

          <Grid2 size={2} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {getEstimatedTime({
                arrival: itinerary.legs[0].arrival,
                departure: itinerary.legs[0].departure,
              })}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              {`${itinerary.legs[0].segments[0].origin.displayCode} - ${itinerary.legs[0].segments[0].destination.displayCode}`}
            </Typography>
          </Grid2>
          <Grid2 size={2} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {itinerary.legs[0].stopCount} stop
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              {calculateTotalWaitingTime(itinerary.legs[0].segments)}
            </Typography>
          </Grid2>
          <Grid2 size={2} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {100} kg CO2e
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              Avg emissions
            </Typography>
          </Grid2>
          <Grid2 size={2} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {itinerary.price.formatted}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              {tripType}
            </Typography>
          </Grid2>
        </Grid2>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        {itinerary.legs[0].segments.map((seg) => (
          <div key={uuidv4()}>
            <FlightSegment
              segment={seg}
              airlineLogo={
                itinerary.legs[0].carriers.marketing[0].logoUrl || ""
              }
              airlineName={itinerary.legs[0].carriers.marketing[0].name}
              flightEmission="100"
            />
            <Divider />
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
export default FlightCard;
