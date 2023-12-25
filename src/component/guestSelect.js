import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { combineNames } from "../utils/stringUtil";

/**
 *
 * @param {*} props guestData, selectedGuest, guestNameChangeHandler
 * @returns
 */
function GuestSelect(props) {
  return (
    <Autocomplete
      sx={props.sx}
      id="combo-guestselect-search"
      options={props.guestData}
      getOptionLabel={(option) =>
        Object.keys(option).length !== 0
          ? combineNames(option.Name) +
            (option.Alias?.length > 0 && "(" + combineNames(option.Alias) + ")")
          : ""
      }
      renderInput={(params) => (
        <TextField {...params} label="搜尋賓客"></TextField>
      )}
      isOptionEqualToValue={(option, value) =>
        value.Id === option.Id ||
        value === null ||
        Object.keys(value).length === 0
      }
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {combineNames(option.Name) +
            " " +
            (option.Alias?.length > 0 &&
              "(" + combineNames(option.Alias) + ")") +
            " "}
          - {option.Side}
          {option.IsCheckedIn && (
            <CheckCircleOutlinedIcon
              color={"success"}
            ></CheckCircleOutlinedIcon>
          )}
        </Box>
      )}
      value={props.selectedGuest}
      onChange={props.guestNameChangeHandler}
    />
  );
}

export default GuestSelect;
