import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFDFDF",
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

export default theme;
