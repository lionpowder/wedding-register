import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { sides } from "../data/sideData";

function SideSelectionBar(props) {
  const isOpen = props.open;
  // TODO: add selected side to context and update guest data accordingly

  return isOpen ? (
    <Toolbar
      sx={{
        pr: "24px",
      }}
    >
      <Autocomplete
        multiple
        limitTags={1}
        id="multi-select-filter-side"
        options={sides}
        // getOptionLabel={(option) => option.title}
        defaultValue={[sides[2]]}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="資料篩選" />}
      />
    </Toolbar>
  ) : (
    <>
      {sides.map((side) => {
        return (
          <Chip key={"chip-side-" + side} label={side} variant="outlined" />
        );
      })}
    </>
  );
}

export default SideSelectionBar;
