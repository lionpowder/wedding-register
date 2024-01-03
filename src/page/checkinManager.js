import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GuestRawTable from "../component/guestRawTable";
import GuestDetail from "../component/guestDetail";
import GuestSelect from "../component/guestSelect";
import { GuestDataContext } from "../context/guestDataContext";

/*
List of past checked in parties
(額外按鈕新增人)
*/

function CheckInManager() {
  const { guestData, setConfirmGuestStore } =
    React.useContext(GuestDataContext);
  const [selectedGuest, setSelectedGuest] = React.useState({});

  const guestNameChangeHandler = (e, value) => {
    setSelectedGuest(value ?? {});
  };

  // clear selection if the can't find the selected guest in the guest list anymore
  React.useEffect(() => {
    const guestFound = guestData.find((guest) => selectedGuest.Id === guest.Id);
    if (!guestFound) {
      setSelectedGuest({});
    } else {
      // If guestData changes, update the selected guest data as well
      setSelectedGuest(guestFound);
    }
  }, [guestData, selectedGuest.Id]);

  React.useEffect(() => {
    setConfirmGuestStore(selectedGuest);
  }, [selectedGuest]);

  return (
    <>
      <Grid item xs={12}>
        {/* TODO: If not found should add new (save filtered value and when click "add new", directly take the name here and add new record) */}
        <Paper
          sx={{
            p: 2,
            pb: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GuestSelect
            guestData={guestData}
            selectedGuest={selectedGuest}
            guestNameChangeHandler={guestNameChangeHandler}
          />
        </Paper>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GuestDetail guest={selectedGuest}></GuestDetail>
        </Paper>
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
