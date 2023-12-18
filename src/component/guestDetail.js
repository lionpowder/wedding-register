import * as React from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { GuestDataContext } from "../context/guestDataContext";
import { assignGuestIfEmpty, generateEnvelopId } from "../utils/guestUtil";
import { combineNames } from "../utils/stringUtil";
import Title from "./titleBar";
import GuestNumber from "./guestNumber";

/*Input fields
  Name entry (Search, if not found, add new)
    Auto completion by names, or aliases
    (Green mark if already checked in)
  People count entry
    Prefilled with saved value (0 if not exists)
    Upon edit, show popup
      Modify number of the same table
        Show target table numbers (regular, children, vegetarian)
        Show number of each (regular, children, vegetarian) in the party currently checking in and allow modifying the number
      Add new party
        Open Table management page in new tab & open add new party modal (prefill with data of current party)
  Gift received checkbox (auto ID assignment when gift received A1, A2…)
  Is substituted checkbox
    If checked, show substitute (代包) name entry field
    Substitute will take bride cake (check box)
  Check in notes
Display fields
  Side (Warning when side is different from what’s checked)
  General notes
  Table #
  Relationships*/
function GuestDetail(props) {
  const { updateGuestData, guestData } = React.useContext(GuestDataContext);
  const [selectedGuest, setSelectedGuest] = React.useState(
    assignGuestIfEmpty(props.guest)
  );

  const currentSides = props.sides; // current filtered side(s)

  /**
   * Reassign guest to state if prop changes
   */
  React.useEffect(() => {
    setSelectedGuest(assignGuestIfEmpty(props.guest));
  }, [props.guest]);

  /**
   * Saving data to local storage or DB
   */
  const onSaveClick = () => {
    // Generate envelope Id
    // TODO: should only generate Id if gift received checkbox is checked
    const envelopeId = generateEnvelopId(selectedGuest.Side, guestData);

    const modifiedGuest = { ...selectedGuest, EnvelopId: envelopeId };
    setSelectedGuest(modifiedGuest);

    updateGuestData(modifiedGuest);
  };

  /**
   * Check in checkbox value changes
   */
  const onCheckedinChange = (e) => {
    const modifiedGuest = { ...selectedGuest, IsCheckedIn: e.target.checked };
    setSelectedGuest(modifiedGuest);
  };

  return (
    <>
      <Title isSub={true}>{combineNames(selectedGuest.Name)}</Title>
      <FormControlLabel
        label="已報到"
        control={
          <Checkbox
            color={selectedGuest.IsCheckedIn ? "success" : "warning"}
            checked={selectedGuest.IsCheckedIn}
            onChange={onCheckedinChange}
          />
        }
      />
      <GuestNumber
        selectedGuest={selectedGuest}
        setSelectedGuest={setSelectedGuest}
      />
      <Button onClick={onSaveClick}>Save</Button>
    </>
  );
}

export default GuestDetail;
