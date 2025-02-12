import {
  CircleOutlined,
  EastOutlined,
  PinDrop,
  SyncAltOutlined,
} from "@mui/icons-material";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  Grid2,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import "./styles.css";
import PassengersDropdown from "../../components/PassengersDropdown";
const FlightSearchBar = () => {
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState<Date | null | undefined>(
    null
  );
  const [returnDate, setReturnDate] = useState<Date | null | undefined>(null);
  const [tripType, setTripType] = useState("one-way");
  const [flightClass, setFlightClass] = useState("economy");

  const useStyles = {
    select: {
      "&:hover": {
        backgroundColor: "#eeebeb",
        borderRadius: "4px",
      },
    },
  };
  return (
    <div className="search-bar-container">
      <Grid2 container spacing={2}>

        {/* Trip Type dropdown */}
        <Grid2>
          <FormControl fullWidth variant="standard" color="primary">
            <Select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              disableUnderline
              sx={useStyles.select}
            >
              <MenuItem value="one-way">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <EastOutlined style={{ marginRight: "8px", color: "gray" }} />
                  one-way
                </div>
              </MenuItem>
              <MenuItem value="round-trip">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SyncAltOutlined
                    style={{ marginRight: "8px", color: "gray" }}
                  />
                  round-trip
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        {/* Custom Passengers Dropdown component */}
        <Grid2>
          <FormControl fullWidth variant="standard" color="primary">
            <PassengersDropdown />
          </FormControl>
        </Grid2>

        {/* Flight class dropdown */}
        <Grid2>
          <FormControl fullWidth variant="standard" color="primary">
            <Select
              value={flightClass}
              onChange={(e) => setFlightClass(e.target.value)}
              disableUnderline
              sx={useStyles.select}
            >
              <MenuItem value="economy">economy</MenuItem>
              <MenuItem value="first-class">first-class</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} alignItems="center">
        {/* Destination Textboxes */}
        <Grid2 container spacing={0} alignItems="center">
          <Grid2>
            <TextField
              className="inner-curve-left"
              fullWidth
              variant="outlined"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CircleOutlined />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid2>
          <Grid2>
            <Button variant="text" size="small" style={{ borderRadius: "50%" }}>
              <SyncAltOutlined style={{ color: "gray" }} />
            </Button>
          </Grid2>
          <Grid2>
            <TextField
              className="inner-curve-right"
              fullWidth
              variant="outlined"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinDrop />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid2>
        </Grid2>

        {/* Dates Inputs */}
        <Grid2 container spacing={0} alignItems="center" size={6}>
          <Grid2 size={tripType === "round-trip" ? 6 : 12}>
            <FormControl fullWidth variant="outlined">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Controlled picker"
                  value={departureDate}
                  onChange={(newValue) => setDepartureDate(newValue)}
                  className="background"
                />
              </LocalizationProvider>
            </FormControl>
          </Grid2>

          {tripType === "round-trip" && (
            <Grid2 size={6}>
              <FormControl fullWidth variant="outlined">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Return Date"
                    value={returnDate}
                    onChange={(newDate) => setReturnDate(newDate)}
                    className="background"
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
          )}
        </Grid2>
      </Grid2>
    </div>
  );
};
export default FlightSearchBar;
