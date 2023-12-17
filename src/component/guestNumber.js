import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GuestDataContext } from "../context/guestDataContext";
import { addGuestData } from "../db/cloudDb";
import { combineNames } from "../utils/stringUtil";
import { defaultGuestData } from "../data/guestData";

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
function GuestNumber({ selectedGuest, setSelectedGuest }) {
  // TODO: show target table number (?)
  const originalGuestNumbers = {
    NoOfRegular: selectedGuest.NoOfRegular || 0,
    NoOfVegetarian: selectedGuest.NoOfVegetarian || 0,
    NoOfChildren: selectedGuest.NoOfChildren || 0,
  };

  const onChangeHandler = (e, type) => {
    const modifiedGuest = { ...selectedGuest, [type]: Number(e.target.value) };
    setSelectedGuest(modifiedGuest);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "8ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Typography variant="subtitle2" component="p">
          參與人數
        </Typography>
      </div>
      <div>
        <TextField
          id="no-of-regular-guest"
          label="一般"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          value={selectedGuest.NoOfRegular || 0}
          onChange={(e) => onChangeHandler(e, "NoOfRegular")}
        />
        {" 原本: " + originalGuestNumbers.NoOfRegular}
        <TextField
          id="no-of-vegetarian-guest"
          label="素食"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          value={selectedGuest.NoOfVegetarian || 0}
          onChange={(e) => onChangeHandler(e, "NoOfVegetarian")}
        />
        {" 原本: " + originalGuestNumbers.NoOfVegetarian}
        <TextField
          id="no-of-children-guest"
          label="小孩"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          value={selectedGuest.NoOfChildren || 0}
          onChange={(e) => onChangeHandler(e, "NoOfChildren")}
        />
        {" 原本: " + originalGuestNumbers.NoOfChildren}
      </div>
    </Box>
  );
}

export default GuestNumber;
