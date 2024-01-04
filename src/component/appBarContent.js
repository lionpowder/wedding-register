import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SideSelectionBar from "./sideSelectionBar";

// props type: open, toggleDrawer, currentPageTitle
function AppBarContent(props) {
  return (
    <Toolbar
      sx={{
        pr: "24px", // keep right padding when drawer closed
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={props.toggleDrawer}
        sx={{
          marginRight: "36px",
          ...(props.open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {props.currentPageTitle ?? "Title"}
      </Typography>
      <SideSelectionBar />
      <IconButton color="inherit" disabled>
        {/* <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge> */}
      </IconButton>
    </Toolbar>
  );
}

export default AppBarContent;
