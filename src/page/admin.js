/**
 * Main entry page
 */
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GuestRawTable from "../component/guestRawTable";
import { GuestDataContext } from "../context/guestDataContext";
import GuestCSVParser from "../data/guestCSVParser";

function AdminPage() {
  const { confirmGuestStore } = React.useContext(GuestDataContext);

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <GuestCSVParser />
          <br />
          <GuestRawTable />
        </Paper>
      </Grid>
    </>
  );
}

export default AdminPage;
