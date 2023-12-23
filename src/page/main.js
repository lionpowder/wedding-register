/**
 * Main entry page
 */
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GuestRawTable from "../component/guestRawTable";
import GuestDetail from "../component/guestDetail";
import { GuestDataContext } from "../context/guestDataContext";
import { combineNames } from "../utils/stringUtil";

function MainPage() {
  const { lastCheckinGuest } = React.useContext(GuestDataContext);

  return (
    <>
      {/* Current Guest */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 350,
          }}
        >
          目前報到賓客:
          <GuestDetail guest={lastCheckinGuest} readOnly={true}></GuestDetail>
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

export default MainPage;
