import { Grid2, Typography } from "@mui/material";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  Timeline,
  timelineOppositeContentClasses,
  TimelineOppositeContent,
} from "@mui/lab";
import { getEstimatedTime, getFormattedTime } from "../../utils/time";
import {
  AirlineSeatLegroomNormalOutlined,
  PublicOutlined,
  TapAndPlayOutlined,
} from "@mui/icons-material";
import useSearchParams from "../../hooks/useSearchParams";

const FlightSegment = ({
  segment,
  airlineLogo,
  airlineName,
  flightEmission,
}: {
  segment: any;
  airlineLogo: string;
  airlineName: string;
  flightEmission: string;
}) => {
  const { flightClass } = useSearchParams();

  return (
    <>
      <Grid2 width="100%" container spacing={0} alignItems="center">
        <Grid2 size={2}>
          <img
            src={airlineLogo}
            alt={airlineName}
            style={{
              width: "100%",
              maxWidth: "40px",
              borderRadius: "8px",
            }}
          />
          <Grid2 spacing={0}>
            <Typography
              variant="caption"
              sx={{ color: "gray", fontWeight: "semibold" }}
            >
              Flight Details:
            </Typography>
          </Grid2>
          <Grid2 spacing={0}>
            <Typography variant="caption" sx={{ color: "gray" }}>
              {segment.marketingCarrier.name} . {flightClass} .{" "}
              {`${segment.marketingCarrier.alternateId} ${segment.flightNumber}`}
            </Typography>
          </Grid2>
        </Grid2>

        <Grid2 size={8} spacing={0} alignItems="start">
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
          >
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ alignSelf: "start1" }}
                color="textSecondary"
              >
                {getFormattedTime(segment.departure)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
                <TimelineConnector>
                  <Grid2 width="200px" container>
                    <Typography
                      m={2}
                      variant="caption"
                      sx={{ color: "gray", marginBottom: "8px" }}
                    >
                      {`Travel time: ${getEstimatedTime({
                        arrival: segment.arrival,
                        departure: segment.departure,
                      })}`}
                    </Typography>
                  </Grid2>
                </TimelineConnector>
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body1" fontWeight="semibold">
                  {`${segment.origin.name} ${segment.origin.type} (${segment.origin.displayCode})`}
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                {getFormattedTime(segment.arrival)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body1" fontWeight="semibold">
                  {`${segment.destination.name} ${segment.destination.type} (${segment.destination.displayCode})`}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Grid2>

        <Grid2 size={2}>
          <Grid2 container>
            <PublicOutlined sx={{ color: "gray" }} />
            <Typography
              variant="caption"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              {flightEmission} kg CO2e
            </Typography>
          </Grid2>
          <Grid2 container>
            <AirlineSeatLegroomNormalOutlined sx={{ color: "gray" }} />
            <Typography
              variant="caption"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              Average leg room: NA
            </Typography>
          </Grid2>
          <Grid2 container>
            <TapAndPlayOutlined sx={{ color: "gray" }} />
            <Typography
              variant="caption"
              sx={{ color: "gray", marginBottom: "8px" }}
            >
              Stream media to your device
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

export default FlightSegment;
