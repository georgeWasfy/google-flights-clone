import {
  ArrowDropDownOutlined,
  Add,
  Person,
  RemoveOutlined,
} from "@mui/icons-material";
import {
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Grid2,
  Typography,
} from "@mui/material";
import { useState, useRef } from "react";
import useSearchParams from "../hooks/useSearchParams";

const PassengerTypes = ["Adults", "Children", "Infants"];
const CustomStyles = {
  dropdown_trigger: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "black",
    boxShadow: "none",
    outline: "none",
    "&:hover": {
      backgroundColor: "#eeebeb",
      borderRadius: "4px",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
  remove_outline: {
    boxShadow: "none",
    outline: "none",
    "&:focus": {
      outline: "none",
      border: "none",
      boxShadow: "none",
    },
  },
};
const PassengersDropdown = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const {
    decrementPassengersCount,
    incrementPassengersCount,
    getTotalPassengers,
    getPassengersCount,
  } = useSearchParams();
  const handleMenuOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Button
        disableRipple
        ref={buttonRef}
        onClick={handleMenuOpen}
        sx={CustomStyles.dropdown_trigger}
      >
        <span style={{ marginLeft: "auto" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Person style={{ color: "gray" }} />
            {getTotalPassengers().toString()}
            <ArrowDropDownOutlined
              style={{ marginRight: "8px", color: "gray" }}
            />
          </div>
        </span>
      </Button>

      {/* Dropdown menu */}
      <Popper
        open={open}
        anchorEl={buttonRef.current}
        transition
        disablePortal
        sx={{
          zIndex: 1300,
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "top left" }}>
            <Paper
              sx={{
                width: "350px",
                maxHeight: "250px",
                overflowY: "auto",
              }}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList>
                  {PassengerTypes.map((type) => (
                    <MenuItem key={type} disableRipple>
                      <Grid2
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        size={12}
                      >
                        <Typography m={1}>{type}</Typography>
                        <Grid2 container alignItems="center" spacing={1}>
                          {/* Decrement Button */}
                          <Button
                            disableRipple
                            value={getPassengersCount(type).toString()}
                            onClick={() => decrementPassengersCount(type)}
                            sx={CustomStyles.remove_outline}
                          >
                            <RemoveOutlined
                              sx={CustomStyles.remove_outline}
                              color="primary"
                            />
                          </Button>
                          {getPassengersCount(type)}
                          {/* Increment Button */}
                          <Button
                            disableRipple
                            value={getPassengersCount(type).toString()}
                            onClick={() => incrementPassengersCount(type)}
                            sx={CustomStyles.remove_outline}
                          >
                            <Add
                              sx={CustomStyles.remove_outline}
                              color="primary"
                            />
                          </Button>
                        </Grid2>
                      </Grid2>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
export default PassengersDropdown;
