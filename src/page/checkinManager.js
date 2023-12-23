import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GuestRawTable from "../component/guestRawTable";
import GuestDetail from "../component/guestDetail";
import GuestSelect from "../component/guestSelect";
import { GuestDataContext } from "../context/guestDataContext";

function CheckInManager() {
  const { guestData } = React.useContext(GuestDataContext);
  const [selectedGuest, setSelectedGuest] = React.useState({});

  const guestNameChangeHandler = (e, value) => {
    setSelectedGuest(value ?? {});
  };

  // clear selection if the can't find the selected guest in the guest list anymore
  React.useEffect(() => {
    if (!guestData.find((guest) => selectedGuest.Id === guest.Id)) {
      setSelectedGuest({});
    }
  }, [guestData, selectedGuest.Id]);

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
            height: 400,
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
