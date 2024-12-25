import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

/*Input fields
  People count entry
    Prefilled with saved value (0 if not exists)
    Upon edit, show popup
      Modify number of the same table
        Show target table numbers (regular, children, vegetarian)
        Show number of each (regular, children, vegetarian) in the party currently checking in and allow modifying the number
      Add new party
        Open Table management page in new tab & open add new party modal (prefill with data of current party)*/
function GuestNumber({
  id = "guest-number",
  selectedGuest,
  setSelectedGuest,
  isReadOnly,
}) {
  // TODO: show target table number (?)

  // Use memo to preserve previous value
  const originalGuestNumbers = React.useMemo(() => {
    return {
      NoOfRegular: selectedGuest.NoOfRegular || 0,
      NoOfVegetarian: selectedGuest.NoOfVegetarian || 0,
      NoOfChildren: selectedGuest.NoOfChildren || 0,
    };
  }, []);

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
          disabled={isReadOnly}
          id={id + "-no-of-regular-guest"}
          label="一般"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          value={selectedGuest.NoOfRegular || 0}
          onChange={(e) => onChangeHandler(e, "NoOfRegular")}
          // helperText={" 原本: " + originalGuestNumbers.NoOfRegular}
        />
        <TextField
          disabled={isReadOnly}
          id={id + "-no-of-vegetarian-guest"}
          label="素食"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          value={selectedGuest.NoOfVegetarian || 0}
          onChange={(e) => onChangeHandler(e, "NoOfVegetarian")}
          // helperText={" 原本: " + originalGuestNumbers.NoOfVegetarian}
        />
        <TextField
          disabled={isReadOnly}
          id={id + "-no-of-children-guest"}
          label="兒童椅"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          value={selectedGuest.NoOfChildren || 0}
          onChange={(e) => onChangeHandler(e, "NoOfChildren")}
          // helperText={" 原本: " + originalGuestNumbers.NoOfChildren}
        />
      </div>
    </Box>
  );
}

export default GuestNumber;
