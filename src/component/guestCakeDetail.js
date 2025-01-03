import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import SubstituteGuest from "./substituteGuest";
import { GuestDataContext } from "../context/guestDataContext";
import { assignGuestIfEmpty } from "../utils/guestUtil";

function GuestCakeDetail({
  id = "guest-cake",
  guest,
  isSubstitute = false,
  onSaveChange,
}) {
  const { updateGuestData } = React.useContext(GuestDataContext);
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
  const onSaveClick = async () => {
    // Should not save/update if the guest data doesn't include any Id
    if (!selectedGuest.Id) return;

    let modifiedGuest = { ...selectedGuest };

    // Update data
    await updateGuestData(modifiedGuest);

    onSaveChange && onSaveChange(selectedGuest.Id);
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

  const onSubstituteChange = (value) => {
    const modifiedGuest = { ...selectedGuest, SubstituteFor: value };
    setSelectedGuest(modifiedGuest);
  };

  return (
    <>
      <Box
        sx={{
          mt: "8px",
          gap: "4px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* <Title isSub={true}>{combineNames(selectedGuest.Name)}</Title> */}
        <Chip
          id={id + "chip-cake-side"}
          label={"桌次: " + (selectedGuest.TableNo.join(", ") || "未指定")}
          variant="filled"
        />
      </Box>
      <Box
        sx={{
          mt: "16px",
          mb: "24px",
        }}
      >
        {selectedGuest.GeneralNote && (
          <Typography sx={{ fontWeight: "600", color: "red" }}>
            {"備註: " + (selectedGuest.GeneralNote || "")}
          </Typography>
        )}
      </Box>
      <FormControlLabel
        label="已領喜餅"
        control={
          <Checkbox
            id={id + "checkbox-take-cake"}
            checked={selectedGuest.IsCakeGiven}
            onChange={onTakeCakeChange}
          />
        }
      />
      <TextField
        id={id + "multiline-cake-note"}
        label="領喜餅備註"
        multiline
        rows={3}
        value={selectedGuest.CakeNote || ""}
        onChange={onNoteChange}
      />

      {!isSubstitute && (
        <SubstituteGuest
          guest={selectedGuest}
          substituteFor={selectedGuest.SubstituteFor}
          guestSubstituteChangeHandler={onSubstituteChange}
          isGuestCake={true}
          title="代領"
        ></SubstituteGuest>
      )}

      <Button id="button-checkin-guest-save" onClick={onSaveClick}>
        儲存
      </Button>
    </>
  );
}

export default GuestCakeDetail;
