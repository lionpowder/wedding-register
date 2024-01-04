import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import { sides } from "../data/sideData";
import { relationships } from "../data/relationshipData";
import GuestNumber from "./guestNumber";
import { defaultGuestData, generateNewGuestData } from "../data/guestData";
import { addGuestData } from "../db/cloudDb";

/**
 *
 * @returns
 */
function NewGuest({ open, onChange, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [newGuest, setNewGuest] = React.useState(defaultGuestData);

  const onSave = (e) => {
    const finalSavedData = generateNewGuestData(newGuest);
    // Saving to cloud
    addGuestData(finalSavedData);

    onChange && onChange(finalSavedData);
    onClose && onClose();
  };

  const onNameChange = (e) => {
    const modifiedGuest = { ...newGuest, Name: [e.target.value] };
    setNewGuest(modifiedGuest);
  };

  const onSideChange = (e, value) => {
    const modifiedGuest = { ...newGuest, Side: value };
    setNewGuest(modifiedGuest);
  };

  const onRelationshipChange = (e, value) => {
    const modifiedGuest = { ...newGuest, Relationship: value };
    setNewGuest(modifiedGuest);
  };

  // TODO: Table Number Selection

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>新增賓客</DialogTitle>
      <DialogContent
        sx={{
          gap: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          id={"textfield-new-guest-name"}
          label="名字"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            mt: "8px",
          }}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          value={newGuest.Name[0]}
          onChange={onNameChange}
        />
        <GuestNumber
          id={"new-guest-number"}
          selectedGuest={newGuest}
          setSelectedGuest={setNewGuest}
          isReadOnly={false}
        />
        <Autocomplete
          id="multi-select-new-guest-side"
          options={sides}
          // getOptionLabel={(option) => option.title}
          value={newGuest.Side}
          onChange={onSideChange}
          sx={{
            width: 300,
          }}
          renderInput={(params) => <TextField {...params} label="賓客種類" />}
        />
        <Autocomplete
          multiple
          limitTags={3}
          id="multi-select-new-guest-relationship"
          options={relationships}
          // getOptionLabel={(option) => option.title}
          value={newGuest.Relationship}
          onChange={onRelationshipChange}
          sx={{
            width: 300,
          }}
          renderInput={(params) => <TextField {...params} label="關係" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave}>確定新增</Button>
        <Button onClick={onClose}>取消</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewGuest;