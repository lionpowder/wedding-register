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
List of past checked in parties
(額外按鈕新增人)
*/

function CheckInManager() {
  const { guestData } = React.useContext(GuestDataContext);
  const [selectedGuest, setSelectedGuest] = React.useState({});

  const guestNameChangeHandler = (e, value) => {
    setSelectedGuest(value ?? {});
  };

  React.useEffect(() => {
    if (!guestData.find((guest) => selectedGuest.Id === guest.Id)) {
      setSelectedGuest({});
    }
  }, [guestData, selectedGuest.Id]);

  return (
    <>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 60,
          }}
        >
          {/* TODO: If not found should add new (save filtered value and when click "add new", directly take the name here and add new record) */}
          <Autocomplete
            id="combo-checkin-search"
            options={guestData}
            getOptionLabel={(option) =>
              Object.keys(option).length !== 0
                ? combineNames(option.Name) +
                  (option.Alias?.length > 0 &&
                    "(" + combineNames(option.Alias) + ")")
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
            value={selectedGuest}
            onChange={guestNameChangeHandler}
          />
        </Paper>
        {selectedGuest.Id && (
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 300,
            }}
          >
            <GuestDetail guest={selectedGuest}></GuestDetail>
          </Paper>
        )}
      </Grid>
      {/* Guest Data */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, pt: 5, display: "flex", flexDirection: "column" }}>
          <GuestRawTable />
        </Paper>
      </Grid>
    </>
  );
}

export default CheckInManager;
