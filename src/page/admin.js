/**
 * Main entry page
 */
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GuestRawTable from "../component/guestRawTable";
import { GuestDataContext } from "../context/guestDataContext";
import GuestCSVParser from "../data/guestCSVParser";
import { Button } from "@mui/material";
import { deleteGuestData } from "../db/cloudDb";

function AdminPage() {
  const { fullGuestData } = React.useContext(GuestDataContext);

  const deleteAllData = () => {
    fullGuestData.forEach((guestInfo) => deleteGuestData(guestInfo));
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <GuestCSVParser />
          <br />
          <div style={{ textAlign: "right" }}>
            <Button variant="outlined" onClick={deleteAllData}>
              全部刪除
            </Button>
          </div>

          <GuestRawTable showAllGuests />
        </Paper>
      </Grid>
    </>
  );
}

export default AdminPage;
