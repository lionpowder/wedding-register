import * as React from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { combineNames } from "../utils/stringUtil";
import { findGuestById } from "../utils/guestUtil";

/**
 *
 * @param {*} props guestData, selectedGuest, guestNameChangeHandler
 * @returns
 */
function GuestSelect({
  sx,
  guestData,
  selectedGuest,
  guestNameChangeHandler,
  inputChangeHandler,
  id = "guest-select",
  disabled = false,
  freeSolo = false,
}) {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <Autocomplete
      freeSolo={freeSolo}
      disabled={disabled}
      sx={{
        minWidth: "300px",
        ...sx,
      }}
      id={id + "-combo-guestselect-search"}
      options={guestData}
      getOptionLabel={(option) => {
        const currentGuest =
          typeof option === "string"
            ? findGuestById(guestData, option) ?? option
            : option;

        return currentGuest && Object.keys(currentGuest).length !== 0
          ? combineNames(currentGuest.Name) +
              (currentGuest.Alias?.length > 0
                ? "(" + combineNames(currentGuest.Alias) + ")"
                : "")
          : "";
      }}
      renderInput={(params) => (
        <TextField {...params} label="搜尋賓客"></TextField>
      )}
      isOptionEqualToValue={(option, value) => {
        if (typeof value === "string") {
          return value === option.Id || value === null;
        } else {
          return (
            value === null || value === undefined || value.Id === option.Id
          );
        }
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {combineNames(option.Name) +
            " " +
            (option.Alias?.length > 0
              ? `(${combineNames(option.Alias)})`
              : "") +
            " "}
          - {option.Side}
          {option.IsCheckedIn && (
            <CheckCircleOutlinedIcon
              color={"success"}
            ></CheckCircleOutlinedIcon>
          )}
        </Box>
      )}
      value={selectedGuest}
      onChange={guestNameChangeHandler}
      inputValue={inputValue}
      onInputChange={(e, value) => {
        // e will be null if external updates caused the input change event
        e && inputChangeHandler && inputChangeHandler(e, value);
        e && setInputValue(value);
      }}
    />
  );
}

export default GuestSelect;
