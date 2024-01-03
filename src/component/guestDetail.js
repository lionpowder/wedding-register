import * as React from "react";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Title from "./titleBar";
import GuestNumber from "./guestNumber";
import SubstituteGuest from "./substituteGuest";
import { GuestDataContext } from "../context/guestDataContext";
import { assignGuestIfEmpty, generateEnvelopId } from "../utils/guestUtil";
import { combineNames } from "../utils/stringUtil";

/*Input fields
  Gift received checkbox (auto ID assignment when gift received A1, A2…)
  Substitute will take bride cake (check box) ??*/
function GuestDetail({
  id = "guest",
  isReadOnly = false,
  guest,
  isSubstitute = false,
  onSaveChange,
}) {
  const { updateGuestData, guestData } = React.useContext(GuestDataContext);
  const [selectedGuest, setSelectedGuest] = React.useState(
    assignGuestIfEmpty(guest)
  );

  /**
   * Reassign guest to state if prop changes
   */
  React.useEffect(() => {
    setSelectedGuest(assignGuestIfEmpty(guest));
  }, [guest]);

  /**
   * Generate necessary values for the guest and save data
   */
  const onSaveClick = () => {
    // Should not save/update if the guest data doesn't include any Id
    if (!selectedGuest.Id) return;

    let modifiedGuest = { ...selectedGuest };

    // Generate envelope Id if the guest checked in
    // TODO: currently checkedin flag act as gift received as well. Do we still need gift received checkbox
    if (!selectedGuest.EnvelopId && selectedGuest.IsCheckedIn) {
      const envelopeId = generateEnvelopId(selectedGuest.Side, guestData);
      modifiedGuest.EnvelopId = envelopeId;
    }

    // Update local state
    setSelectedGuest(modifiedGuest);

    // Update data
    updateGuestData(modifiedGuest);

    onSaveChange && onSaveChange(selectedGuest.Id);
  };

  /**
   * Check in checkbox value changes
   */
  const onCheckedinChange = (e) => {
    const modifiedGuest = { ...selectedGuest, IsCheckedIn: e.target.checked };
    setSelectedGuest(modifiedGuest);
  };

  const onNoteChange = (e) => {
    const modifiedGuest = { ...selectedGuest, CheckinNote: e.target.value };
    setSelectedGuest(modifiedGuest);
  };

  const onSubstituteChange = (value) => {
    const modifiedGuest = { ...selectedGuest, SubstituteFor: value };
    setSelectedGuest(modifiedGuest);
  };

  // TODO: Side (Warning when side is different from what’s checked)

  return (
    <>
      <Box
        sx={{
          gap: "4px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Title isSub={true}>
          {"目前賓客:" + combineNames(selectedGuest.Name)}
        </Title>
        {/* <Chip
          id={id + "-chip-checkin-side"}
          label={selectedGuest.Side}
          variant="filled"
        /> */}
        {selectedGuest.Relationship.map((relationship) => {
          return (
            <Chip
              key={id + "-chip-side-" + relationship}
              label={relationship}
              variant="outlined"
            />
          );
        })}
      </Box>
      <Box
        sx={{
          mt: "4px",
          mb: "8px",
        }}
      >
        <Typography variant="body1" gutterBottom>
          {"桌次: " + (selectedGuest.TableNo || "未指定")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {"備註: " + (selectedGuest.GeneralNote || "")}
        </Typography>
      </Box>
      <FormControlLabel
        label="已報到"
        control={
          <Checkbox
            disabled={isReadOnly}
            id={id + "-checkbox-has-checkin"}
            sx={{
              "&.Mui-checked": {
                color: green[600],
              },
            }}
            checked={selectedGuest.IsCheckedIn}
            onChange={onCheckedinChange}
          />
        }
      />
      <GuestNumber
        id={id + "-number"}
        selectedGuest={selectedGuest}
        setSelectedGuest={setSelectedGuest}
        isReadOnly={isReadOnly}
      />
      {!isReadOnly && (
        <>
          <TextField
            id={id + "multiline-checkin-note"}
            label="報到備註"
            multiline
            rows={3}
            value={selectedGuest.CheckinNote || ""}
            onChange={onNoteChange}
          />

          {!isSubstitute && (
            <SubstituteGuest
              guest={selectedGuest}
              guestData={guestData}
              substituteFor={selectedGuest.SubstituteFor}
              guestSubstituteChangeHandler={onSubstituteChange}
            ></SubstituteGuest>
          )}

          <Button
            id={id + "-button-checkin-guest-save"}
            onClick={onSaveClick}
            variant="outlined"
            sx={{
              mt: "8px",
            }}
          >
            儲存
          </Button>
        </>
      )}
    </>
  );
}

export default GuestDetail;
