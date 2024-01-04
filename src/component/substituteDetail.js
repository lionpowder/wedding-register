import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import GuestDetail from "./guestDetail";
import GuestSelect from "./guestSelect";
import GuestCakeDetail from "./guestCakeDetail";
import { assignGuestIfEmpty, findGuestById } from "../utils/guestUtil";
import { generateNewGuestData } from "../data/guestData";
import { addGuestData } from "../db/cloudDb";

/**
 *
 * @returns
 */
function SubstituteDetail({
  open,
  guestData,
  selectedSubstitute,
  onChange,
  onClose,
  isGuestCake = false,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [substituteData, setSubstituteData] = React.useState(
    findGuestById(guestData, selectedSubstitute)
  );
  const newGuestInput = React.useRef(null);
  // const [newGuestName, setNewGuestName] = React.useState("");

  React.useEffect(() => {
    setSubstituteData(findGuestById(guestData, selectedSubstitute));
  }, [guestData, selectedSubstitute]);

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
      });

      // Saving to cloud
      const savedGuestData = await addGuestData(newGuest);
      setSubstituteData(savedGuestData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>賓客資料</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText> */}
        {!selectedSubstitute && (
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
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubstituteDetail;
