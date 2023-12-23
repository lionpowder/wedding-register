import * as React from "react";
import { green, red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import GuestRawTable from "../component/guestRawTable";
import GuestSelect from "../component/guestSelect";
import Title from "../component/titleBar";
import { GuestDataContext } from "../context/guestDataContext";
import { combineNames } from "../utils/stringUtil";
import { assignGuestIfEmpty } from "../utils/guestUtil";

function CakeManager() {
  /*
TODO: also show substitutes in need of a cake
    Show substitute receiver
 */
  const [isFilterGuest, setIsFilterGuest] = React.useState(true);
  const { updateGuestData, guestData } = React.useContext(GuestDataContext);
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

  /**
   * Generate necessary values for the guest and save data
   */
  const onSaveClick = () => {
    // Should not save/update if the guest data doesn't include any Id
    if (!selectedGuest.Id) return;

    let modifiedGuest = { ...selectedGuest };

    // Update local state
    setSelectedGuest(modifiedGuest);

    // Update data
    updateGuestData(modifiedGuest);
  };

  /**
   * Check in checkbox value changes
   */
  const onTakeCakeChange = (e) => {
    const modifiedGuest = { ...selectedGuest, IsCakeGiven: e.target.checked };
    setSelectedGuest(modifiedGuest);
  };

  const onNoteChange = (e) => {
    const modifiedGuest = { ...selectedGuest, CakeNote: e.target.value };
    setSelectedGuest(modifiedGuest);
  };

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
              color: red,
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
            height: 250,
          }}
        >
          <Box
            sx={{
              mt: "8px",
              gap: "4px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Title isSub={true}>{combineNames(selectedGuest.Name)}</Title>
            <Chip
              id={"chip-cake-side"}
              label={"桌次: " + (selectedGuest.TableNo || "未指定")}
              variant="filled"
            />
          </Box>
          <FormControlLabel
            label="已領喜餅"
            control={
              <Checkbox
                id="checkbox-take-cake"
                sx={{
                  "&.Mui-checked": {
                    color: green[600],
                  },
                }}
                checked={selectedGuest.IsCakeGiven}
                onChange={onTakeCakeChange}
              />
            }
          />
          <TextField
            id="multiline-cake-note"
            label="領喜餅備註"
            multiline
            rows={3}
            value={selectedGuest.CakeNote || ""}
            onChange={onNoteChange}
          />

          <Button id="button-checkin-guest-save" onClick={onSaveClick}>
            Save
          </Button>
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
