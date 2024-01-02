import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import GuestRawTable from "../component/guestRawTable";
import GuestSelect from "../component/guestSelect";
import GuestCakeDetail from "../component/guestCakeDetail";
import { GuestDataContext } from "../context/guestDataContext";
import { assignGuestIfEmpty } from "../utils/guestUtil";

function CakeManager() {
  /*
TODO: also show substitutes in need of a cake
    Show substitute receiver
 */
  const [isFilterGuest, setIsFilterGuest] = React.useState(true);
  const { guestData } = React.useContext(GuestDataContext);
  const getUnprocessedList = React.useMemo(
    () =>
      guestData.filter((data) => (isFilterGuest ? !data.IsCakeGiven : true)),
    [guestData, isFilterGuest]
  );
  const [selectedGuest, setSelectedGuest] = React.useState(
    assignGuestIfEmpty({})
  );

  const guestNameChangeHandler = (e, value) => {
    setSelectedGuest(value ?? {});
  };

  // clear selection if the can't find the selected guest in the guest list anymore
  React.useEffect(() => {
    if (!getUnprocessedList.find((guest) => selectedGuest.Id === guest.Id)) {
      setSelectedGuest(assignGuestIfEmpty({}));
    }
  }, [getUnprocessedList, selectedGuest.Id]);

  return (
    <>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            pb: 1,
            display: "flex",
            flexDirection: "row",
            gap: "4px",
          }}
        >
          <GuestSelect
            sx={{
              "&.MuiAutocomplete-root": {
                flexGrow: 1,
              },
            }}
            guestData={getUnprocessedList}
            selectedGuest={selectedGuest}
            guestNameChangeHandler={guestNameChangeHandler}
          />
          <FormControlLabel
            control={
              <Switch
                checked={isFilterGuest}
                onChange={(e) => setIsFilterGuest(e.target.checked)}
              />
            }
            label="篩選"
          />
        </Paper>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GuestCakeDetail guest={selectedGuest}></GuestCakeDetail>
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

export default CakeManager;
