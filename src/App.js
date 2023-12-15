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
import { getCurrentPage } from "./utils/pageUtil";
import { mainListItems, backendListItems } from "./utils/listItems";

import "./App.css";

function App() {
  const [open, setOpen] = React.useState(true);
  const [currentPageName, setCurrentPageName] = React.useState("Main");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onMenuChange = (event, pageName) => {
    event.preventDefault();

    if (currentPageName !== pageName) {
      setCurrentPageName(pageName);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <AppBarContent
          toggleDrawer={toggleDrawer}
          open={open}
          currentPageTitle={currentPageName}
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
        <Divider />
        <List component="nav">
          {mainListItems(onMenuChange)}
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
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}></Grid>
          {getCurrentPage(currentPageName)}
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
