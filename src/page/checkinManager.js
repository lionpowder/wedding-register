import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import GuestRawTable from "../component/guestRawTable";
import GuestDetail from "../component/guestDetail";
import { GuestDataContext } from "../context/guestDataContext";
import { combineNames } from "../utils/stringUtil";

/*
Input fields
  Name entry (Search, if not found, add new)
    Auto completion by names, or aliases
    (Green mark if already checked in)
  People count entry
    Prefilled with saved value (0 if not exists)
    Upon edit, show popup
      Modify number of the same table
        Show target table numbers (regular, children, vegetarian)
        Show number of each (regular, children, vegetarian) in the party currently checking in and allow modifying the number
      Add new party
        Open Table management page in new tab & open add new party modal (prefill with data of current party)
  Gift received checkbox (auto ID assignment when gift received A1, A2…)
  Is substituted checkbox
    If checked, show substitute (代包) name entry field
    Substitute will take bride cake (check box)
  Check in notes
Display fields
  Side (Warning when side is different from what’s checked)
  General notes
  Table #
  Relationships
Side checkboxes (to filter below data by side)
List of past checked in parties
(額外按鈕新增人)
*/

function CheckInManager() {
  // TODO: need to be able to select which Side
  const { guestData } = React.useContext(GuestDataContext);
  const [selectedGuest, setSelectedGuest] = React.useState(null);

  const guestNameChangeHandler = (e, value) => {
    // console.log(value?.id, value);
    setSelectedGuest(value);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          {/* TODO: If not found should add new (save filtered value and when click "add new", directly take the name here and add new record) */}
          <Autocomplete
            id="combo-checkin-search"
            options={guestData}
            getOptionLabel={(option) =>
              combineNames(option.Name) +
              (option.Alias && "(" + option.Alias + ")")
            }
            renderInput={(params) => (
              <TextField {...params} label="Search for Guest"></TextField>
            )}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {combineNames(option.Name) +
                  " " +
                  (option.Alias && "(" + option.Alias + ")") +
                  " "}
                - {option.Side}
                {option.IsCheckedin && (
                  <CheckCircleOutlinedIcon
                    color={"success"}
                  ></CheckCircleOutlinedIcon>
                )}
              </Box>
            )}
            value={selectedGuest}
            onChange={guestNameChangeHandler}
          />
          <GuestDetail guest={selectedGuest}></GuestDetail>
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <GuestRawTable />
        </Paper>
      </Grid>
    </>
  );
}

export default CheckInManager;
