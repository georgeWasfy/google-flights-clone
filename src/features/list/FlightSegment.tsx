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
  return (
    <Grid2 width="100%" container spacing={0} alignItems="center">
      <Grid2 size={2}>
        <img
          src={airlineLogo}
          alt={airlineName}
          style={{
            width: "100%",
            maxWidth: "50px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      </Grid2>

      <Grid2 size={8}>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          <TimelineItem>
            <TimelineOppositeContent color="textSecondary">
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
              <Typography variant="body1" fontWeight="bold">
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
              <Typography variant="body1" fontWeight="bold">
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
  );
};

export default FlightSegment;
