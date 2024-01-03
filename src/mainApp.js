import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Copyright from "./component/copyRight";
import AppBar from "./component/appBar";
import AppBarContent from "./component/appBarContent";
import Drawer from "./component/drawer";
import { pages } from "./utils/pageUtil";
import { MainListItems, backendListItems } from "./utils/listItems";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./App.css";

export default function MainApp() {
  const [open, setOpen] = React.useState(true);
  const location = useLocation();

  const getPageTitle = () => {
    return pages.find((page) => page.path === location.pathname).title;
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <AppBarContent
          toggleDrawer={toggleDrawer}
          open={open}
          currentPageTitle={getPageTitle()}
        ></AppBarContent>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <List component="nav">
          <MainListItems />
          <Divider sx={{ my: 1 }} />
          {backendListItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {/* dummy toolbar for top padding */}
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
          <Grid container spacing={3}></Grid>
          <Outlet />
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}
