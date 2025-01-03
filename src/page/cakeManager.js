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
  const [isIncludeCakeGiven, setIsIncludeCakeGiven] = React.useState(false);
  const { guestData } = React.useContext(GuestDataContext);
  const getUnprocessedList = React.useMemo(
    () =>
      guestData
        .filter(
          (data) =>
            data.NeedCake &&
            data.IsCheckedIn &&
            (isIncludeCakeGiven ? true : !data.IsCakeGiven)
        )
        .sort((a, b) => b?.LastModifiedTime - a?.LastModifiedTime),
    [guestData, isIncludeCakeGiven]
  );
  const [selectedGuest, setSelectedGuest] = React.useState(null);

  const guestNameChangeHandler = (e, value) => {
    setSelectedGuest(value ?? {});
  };

  const onSave = () => {
    setSelectedGuest(null);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "32px" }}>
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
                  checked={isIncludeCakeGiven}
                  onChange={(e) => {
                    setIsIncludeCakeGiven(e.target.checked);
                  }}
                />
              }
              label="包含已領餅"
            />
          </div>

          {selectedGuest?.Id && (
            <div
              style={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                minHeight: "200px",
              }}
            >
              <GuestCakeDetail
                guest={selectedGuest}
                onSaveChange={onSave}
              ></GuestCakeDetail>
            </div>
          )}
        </Paper>
      </Grid>
      {/* Guest Data */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, mt: 2, display: "flex", flexDirection: "column" }}>
          <GuestRawTable />
        </Paper>
      </Grid>
    </>
  );
}

export default CakeManager;
