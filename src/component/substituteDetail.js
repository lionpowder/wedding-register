import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import GuestDetail from "./guestDetail";
import GuestSelect from "./guestSelect";
import GuestCakeDetail from "./guestCakeDetail";
import { assignGuestIfEmpty, findGuestById } from "../utils/guestUtil";
import { defaultGuestData, generateNewGuestData } from "../data/guestData";
import { addGuestData } from "../db/cloudDb";
import { GuestDataContext } from "../context/guestDataContext";

/**
 *
 * @returns
 */
function SubstituteDetail({
  open,
  guest,
  selectedSubstitute: selectedSubstituteId,
  onChange,
  onClose,
  isGuestCake = false,
}) {
  const { guestData } = React.useContext(GuestDataContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [substituteData, setSubstituteData] = React.useState(
    findGuestById(guestData, selectedSubstituteId)
  );
  const newGuestInput = React.useRef(null);

  React.useEffect(() => {
    setSubstituteData(findGuestById(guestData, selectedSubstituteId));
  }, [guestData, selectedSubstituteId]);

  React.useEffect(() => {
    if (!open) {
      setSubstituteData(undefined);
    }
  }, [open]);

  const handleSave = (id) => {
    // TODO: 自動將代領人員名字加入備註
    onChange(id);
    onClose();
  };

  const handleSelectionChange = (e, value) => {
    setSubstituteData(value);
  };

  const handleSearchChange = (e, value) => {
    newGuestInput.current = value;
  };

  const handleAddNewGuest = async () => {
    if (newGuestInput.current && newGuestInput.current.length > 0) {
      const newGuest = generateNewGuestData({
        Name: [newGuestInput.current],
        Side: guest.Side,
      });

      // Saving to cloud
      const savedGuestData = await addGuestData(newGuest);
      setSubstituteData(savedGuestData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogActions>
        <IconButton aria-label="close" color="primary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle>賓客資料</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText> */}
        {!selectedSubstituteId && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
            }}
          >
            <GuestSelect
              sx={{
                mt: "8px",
                "&.MuiAutocomplete-root": {
                  flexGrow: 1,
                },
              }}
              freeSolo={true}
              id={"substitute-guest-dialog"}
              guestData={guestData}
              selectedGuest={assignGuestIfEmpty(substituteData)}
              guestNameChangeHandler={handleSelectionChange}
              inputChangeHandler={handleSearchChange}
            />
            <Button onClick={handleAddNewGuest}>新增賓客</Button>
          </Box>
        )}
        {substituteData &&
          (!isGuestCake ? (
            <GuestDetail
              id="substitute-guest-detail"
              guest={substituteData}
              parentGuest={guest}
              isSubstitute={true}
              onSaveChange={handleSave}
            />
          ) : (
            <GuestCakeDetail
              id="substitute-guest-cake-detail"
              guest={substituteData}
              isSubstitute={true}
              onSaveChange={handleSave}
            ></GuestCakeDetail>
          ))}
      </DialogContent>
    </Dialog>
  );
}

export default SubstituteDetail;
