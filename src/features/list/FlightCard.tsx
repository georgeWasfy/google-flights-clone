import {
  Accordion,
  AccordionSummary,
  Typography,
  Grid2,
} from "@mui/material";
import { getEstimatedTime, getFormattedTimes } from "../../utils/time";
import useSearchParams from "../../hooks/useSearchParams";
import { ExpandMore } from "@mui/icons-material";

const FlightCard = ({single_card}: {single_card: any}) => {
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
              src={single_card.legs[0].carriers.marketing[0].logoUrl}
              alt={single_card.legs[0].carriers.marketing[0].name}
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
                arrival: single_card.legs[0].arrival,
                departure: single_card.legs[0].departure,
              })}
            </Typography>
            {single_card.legs[0].segments.map((seg: any) => (
              <Typography
                variant="caption"
                sx={{ color: "gray", marginBottom: "8px" }}
              >
                {seg.marketingCarrier.name}
              </Typography>
            ))}
          </Grid2>

          <Grid2 size={2} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {getEstimatedTime({
                arrival: single_card.legs[0].arrival,
                departure: single_card.legs[0].departure,
              })}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              {`${single_card.legs[0].segments[0].origin.displayCode} - ${single_card.legs[0].segments[0].destination.displayCode}`}
            </Typography>
          </Grid2>
          <Grid2 size={2} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {single_card.legs[0].stopCount} stop
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              Title sub
            </Typography>
          </Grid2>
          <Grid2 size={2} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {single_card.eco.ecoContenderDelta} kg CO2e
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
              {single_card.price.formatted}
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
      {/* <AccordionDetails>
        <Divider />
        <Grid2 container>
          <Grid2>
            <img
              src="src/assets/airline_logo.png"
              alt="Example"
              style={{
                width: "100%",
                maxWidth: "50px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          </Grid2>

          <Grid2>
            <Grid2 container>
              <Grid2>the line</Grid2>
              <Grid2>
                <Typography variant="body1">EGP 79,528</Typography>
                <Typography variant="body1">EGP 79,528</Typography>
                <Typography variant="body1">EGP 79,528</Typography>
              </Grid2>
            </Grid2>
          </Grid2>

          <Grid2>
            <Typography variant="body1">EGP 79,528</Typography>
            <Typography variant="body1">EGP 79,528</Typography>
          </Grid2>
        </Grid2>
      </AccordionDetails> */}
    </Accordion>
  );
};
export default FlightCard;
