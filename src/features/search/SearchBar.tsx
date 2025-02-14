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
  CircularProgress,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import "./styles.css";
import PassengersDropdown from "../../components/PassengersDropdown";
import useSearchParams from "../../hooks/useSearchParams";
import { useAirportsQuery } from "./hooks/useAirportListing";
import { preprocess_airports } from "../../utils/airport";
import { useEffect, useState } from "react";
import { FLIGHT_CLASS, SearchParams, SORTBY } from "./types";
import { useFlightsQuery } from "./hooks/useFlightSearchQuery";
import ListFlights from "../list/ListFlights";

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
    reverseDepartureDestination,
    getFullSearchParams,
    sort_by,
    setSortBy,
  } = useSearchParams();
  const [departureAirportPrefix, setDepartureAirportPrefix] = useState("");
  const [destinationAirportPrefix, setDestinationAirportPrefix] = useState("");

  const { data: departureAirports, isLoading: departureAirportsLoading } =
    useAirportsQuery({
      query: departureAirportPrefix,
    });
  const { data: destinationAirports, isLoading: destinationAirportsLoading } =
    useAirportsQuery({
      query: destinationAirportPrefix,
    });
  const [search, setSearch] = useState<SearchParams>();
  const { data: flights, isLoading: isFlightsLoading } =
    useFlightsQuery(search);

  useEffect(() => {
    setSearch(getFullSearchParams());
  }, [sort_by]);
  const handleSearch = () => {
    setSearch(getFullSearchParams());
  };
  return (
    <>
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
                  {FLIGHT_CLASS.map((cl) => (
                    <MenuItem key={cl} value={cl}>
                      {cl}
                    </MenuItem>
                  ))}
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
                    loading={departureAirportsLoading}
                    disablePortal
                    options={preprocess_airports(departureAirports?.data) || []}
                    value={departureCity}
                    onChange={(
                      _: any,
                      newValue: {
                        id: string;
                        label: string;
                        skyId: string;
                      } | null
                    ) => {
                      setDepartureCity(newValue);
                    }}
                    inputValue={departureAirportPrefix}
                    onInputChange={(_, newInputValue) => {
                      setDepartureAirportPrefix(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="inner-curve-left"
                        variant="outlined"
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
                    onClick={reverseDepartureDestination}
                  >
                    <SyncAltOutlined style={{ color: "gray", padding: 6 }} />
                  </Button>
                </Grid2>
                <Grid2 size={5}>
                  <Autocomplete
                    loading={destinationAirportsLoading}
                    getOptionLabel={(option: any) => option.label}
                    disablePortal
                    value={destinationCity}
                    options={
                      preprocess_airports(destinationAirports?.data) || []
                    }
                    onChange={(
                      _: any,
                      newValue: {
                        id: string;
                        label: string;
                        skyId: string;
                      } | null
                    ) => {
                      setDestinationCity(newValue);
                    }}
                    inputValue={destinationAirportPrefix}
                    onInputChange={(_, newInputValue) => {
                      setDestinationAirportPrefix(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="inner-curve-right"
                        variant="outlined"
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
                        label="Departure"
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
                          label="Return"
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
          disabled={isFlightsLoading}
          onClick={handleSearch}
        >
          {isFlightsLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              search <Search />
            </>
          )}
        </Fab>
      </div>

      {flights?.status === "failure" && (
        <Typography
          variant="caption"
          sx={{ color: "gray", marginBottom: "8px" }}
        >
          No Flights Found
        </Typography>
      )}

      {flights?.data?.itineraries.length && (
        <Grid2 container spacing={1} width={"100%"} textAlign="end">
          <Grid2 size={11}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              Sort by
            </Typography>
          </Grid2>

          <Grid2 size={1}>
            <FormControl variant="standard" color="primary">
              <Select
                value={sort_by}
                onChange={(e) => setSortBy(e.target.value)}
                disableUnderline
              >
                {SORTBY.map((cl) => (
                  <MenuItem key={cl} value={cl}>
                    {cl}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
      )}
      <ListFlights loading={isFlightsLoading} flights={flights?.data} />
    </>
  );
};
export default FlightSearchBar;
