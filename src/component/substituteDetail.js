import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { assignGuestIfEmpty, findGuestById } from "../utils/guestUtil";
import GuestDetail from "./guestDetail";
import GuestSelect from "./guestSelect";
import GuestCakeDetail from "./guestCakeDetail";

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

  React.useEffect(() => {
    setSubstituteData(findGuestById(guestData, selectedSubstitute));
  }, [guestData, selectedSubstitute]);

  const handleSave = (id) => {
    // TODO: 自動將代領人員名字加入備註
    onChange(id);
    onClose();
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
          <GuestSelect
            id={"substitute-guest-dialog"}
            guestData={guestData}
            selectedGuest={assignGuestIfEmpty(substituteData)}
            guestNameChangeHandler={(e, value) => {
              setSubstituteData(value);
            }}
          />
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
