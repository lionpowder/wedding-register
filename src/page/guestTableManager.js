/*
Table management page (low priority)
Auto assign table based on relationship & side
List of tables (以Table為主的顯示，可能可以使用Card)
Number of checked in people at each table (regular, children, vegetarian)
Number of seats left at each table (regular, children, vegetarian)
(額外按鈕新增人) (額外按鈕移除人) Add new party: names<string>[], aliases<string>[], number of people, relationships<string>[] (Elementary friends), side (男/女/共同), table number, general notes<string>, need cake<bool>
*/

import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GuestRawTable from "../component/guestRawTable";
import GuestSelect from "../component/guestSelect";
import { GuestDataContext } from "../context/guestDataContext";

function GuestTableManager() {
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
        <GuestSelect
          guestData={guestData}
          selectedGuest={selectedGuest}
          guestNameChangeHandler={guestNameChangeHandler}
        />
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
          }}
        >
          {/* <GuestDetail guest={selectedGuest}></GuestDetail> */}
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

export default GuestTableManager;
