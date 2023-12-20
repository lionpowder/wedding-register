import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { sides } from "../data/sideData";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { GuestDataContext } from "../context/guestDataContext";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#880000",
    },
    secondary: {
      main: "#FF0000",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#333", // Dark grey color
    },
  },
});

function SideSelectionBar(props) {
  const { sideFilter, setSideFilter } = React.useContext(GuestDataContext);
  const handleChange = (e, value) => {
    setSideFilter(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <Autocomplete
          multiple
          limitTags={3}
          id="multi-select-filter-side"
          options={sides}
          // getOptionLabel={(option) => option.title}
          value={sideFilter}
          onChange={handleChange}
          sx={{
            "& .MuiFormLabel-root": {
              color: "#ffffff !important",
            },
            width: 300,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.87) !important",
            },
          }}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "#ffffff",
                color: "#000000",
                "& .MuiAutocomplete-option.Mui-focused": {
                  backgroundColor: "rgba(136, 0, 0, 0.24)",
                },
              },
            },
          }}
          size="small"
          renderInput={(params) => <TextField {...params} label="資料篩選" />}
        />
      </Toolbar>
    </ThemeProvider>
  );
}

export default SideSelectionBar;
