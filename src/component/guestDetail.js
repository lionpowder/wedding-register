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
  const onSave = (modifiedGuest) => {
    // Should not save/update if the guest data doesn't include any Id
    if (!modifiedGuest.Id) return;

    // Update local state
    setSelectedGuest(modifiedGuest);

    // Update data
    updateGuestData(modifiedGuest);

    onSaveChange && onSaveChange(modifiedGuest.Id);
  };

  const onCheckInClick = () => {
    const modifiedGuest = { ...selectedGuest };

    // If was checked in but then modified to not checkin, do not automatic update checkin flag
    if (!guest.IsCheckedIn) {
      modifiedGuest.IsCheckedIn = true;
    }

    onSave(modifiedGuest);
  };

  /**
   * Check in checkbox value changes
   */
  const onCheckedinChange = (e) => {
    const modifiedGuest = { ...selectedGuest, IsCheckedIn: e.target.checked };
    setSelectedGuest(modifiedGuest);
  };

  const onEnvelopReceivedChange = (e) => {
    const isEnvelopeReceived = e.target.checked;
    const modifiedGuest = {
      ...selectedGuest,
      IsEnvelopeReceived: isEnvelopeReceived,
    };

    // Generate envelope Id if receive envelope
    if (!selectedGuest.EnvelopId && isEnvelopeReceived) {
      const envelopeId = generateEnvelopId(selectedGuest.Side, guestData);
      modifiedGuest.EnvelopId = envelopeId;
    }

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
          gap: "16px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Title isSub={true}>
          {"目前賓客: " + combineNames(selectedGuest.Name)}
        </Title>
        <Box
          sx={{
            gap: "4px",
            display: "flex",
            flexDirection: "row",
          }}
        >
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
          <Chip
            id={id + "chip-cake-side"}
            label={"桌次: " + (selectedGuest.TableNo.join(", ") || "未指定")}
            variant="outlined"
          />
        </Box>
      </Box>
      <Box
        sx={{
          mt: "4px",
          mb: "8px",
        }}
      >
        {/* <Typography variant="body1" gutterBottom>
          {"桌次: " + (selectedGuest.TableNo.join(', ') || "未指定")}
        </Typography> */}
        <Typography variant="body1" gutterBottom>
          {"備註: " + (selectedGuest.GeneralNote || "")}
        </Typography>
      </Box>
      <GuestNumber
        id={id + "-number"}
        selectedGuest={selectedGuest}
        setSelectedGuest={setSelectedGuest}
        isReadOnly={isReadOnly}
      />
      <Box
        sx={{
          gap: "4px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          label="已收到紅包"
          control={
            <Checkbox
              disabled={isReadOnly}
              id={id + "-checkbox-has-checkin"}
              sx={{
                "&.Mui-checked": {
                  color: green[600],
                },
              }}
              checked={selectedGuest.IsEnvelopeReceived}
              onChange={onEnvelopReceivedChange}
            />
          }
        />

        {selectedGuest.EnvelopId && (
          <Chip
            id={id + "-chip-checkin-envelopeId"}
            label={"紅包號: " + selectedGuest.EnvelopId}
            variant="filled"
          />
        )}
      </Box>

      {!isSubstitute && (
        <FormControlLabel
          label="已報到"
          control={
            <Checkbox
              disabled={isReadOnly || !selectedGuest.IsCheckedIn}
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
      )}
      {!isReadOnly && (
        <>
          <TextField
            id={id + "multiline-checkin-note"}
            label="報到備註"
            multiline
            rows={3}
            value={selectedGuest.CheckinNote || ""}
            onChange={onNoteChange}
            sx={{
              mt: "4px",
            }}
          />

          {!isSubstitute && (
            <SubstituteGuest
              guest={selectedGuest}
              guestData={guestData}
              substituteFor={selectedGuest.SubstituteFor}
              guestSubstituteChangeHandler={onSubstituteChange}
              title="代包紅包"
            ></SubstituteGuest>
          )}

          {isSubstitute ? (
            <Button
              id={id + "-button-checkin-guest-save"}
              onClick={() => onSave(selectedGuest)}
              variant="outlined"
              sx={{
                mt: "8px",
              }}
            >
              儲存
            </Button>
          ) : (
            <Button
              id={id + "-button-checkin-guest-checkin"}
              onClick={onCheckInClick}
              variant="outlined"
              sx={{
                mt: "8px",
              }}
            >
              {guest.IsCheckedIn ? "儲存" : "報到"}
            </Button>
          )}
        </>
      )}
    </>
  );
}

export default GuestDetail;
