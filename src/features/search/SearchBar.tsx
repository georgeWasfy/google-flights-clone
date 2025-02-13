import {
  CircleOutlined,
  EastOutlined,
  PinDrop,
  Search,
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
  Fab,
  Autocomplete,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import "./styles.css";
import PassengersDropdown from "../../components/PassengersDropdown";
import useSearchParams from "../../hooks/useSearchParams";

const CustomStyles = {
  select: {
    "&:hover": {
      backgroundColor: "#eeebeb",
      borderRadius: "4px",
    },
  },
};
const FlightSearchBar = () => {
  const {
    departureCity,
    destinationCity,
    setDepartureCity,
    setDestinationCity,

    tripType,
    flightClass,
    setTripType,
    setFlightClass,

    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate,
  } = useSearchParams();

  return (
    <div>
      <div className="search-bar-container">
        <Grid2 container spacing={2}>
          {/* Trip Type dropdown */}
          <Grid2>
            <FormControl fullWidth variant="standard" color="primary">
              <Select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                disableUnderline
                sx={CustomStyles.select}
              >
                <MenuItem value="one-way">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EastOutlined
                      style={{ marginRight: "8px", color: "gray" }}
                    />
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
                sx={CustomStyles.select}
              >
                <MenuItem value="economy">economy</MenuItem>
                <MenuItem value="first-class">first-class</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} alignItems="center">
          {/* Destination Textboxes */}
          <Grid2 size={{ sm: 12, md: 6 }}>
            <Grid2 container spacing={0}>
              <Grid2 size={5}>
                <Autocomplete
                  disablePortal
                  options={[
                    { label: "The Godfather", id: 1 },
                    { label: "Pulp Fiction", id: 2 },
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="inner-curve-left"
                      variant="outlined"
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <CircleOutlined />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={2}>
                  <Button
                    variant="text"
                    size="large"
                    sx={{ borderRadius: "50%" }}
                  >
                    <SyncAltOutlined
                      style={{ color: "gray",padding:6 }}
                    />
                  </Button>
              </Grid2>
              <Grid2 size={5}>
                <Autocomplete
                  getOptionLabel={(option: any) => option.label}
                  disablePortal
                  options={[
                    { label: "The Godfather", id: 1 },
                    { label: "Pulp Fiction", id: 2 },
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="inner-curve-right"
                      variant="outlined"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <PinDrop />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </Grid2>
          {/* Dates Inputs */}
          <Grid2 size={{ sm: 12, md: 6 }}>
            <Grid2 container spacing={0}>
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
        </Grid2>
        <br />
      </div>
      {/* Floating Button */}
      <Fab
        variant="extended"
        color="primary"
        aria-label="search"
        style={{
          bottom: 30,
          right: 30,
        }}
      >
        search <Search />
      </Fab>
    </div>
  );
};
export default FlightSearchBar;
