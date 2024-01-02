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
import ConfirmScreen from "./confirmScreen";
import MainApp from "./mainApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />}>
          {pages.map((page) => (
            <Route key={page.title} path={page.path} element={page.content} />
          ))}
        </Route>
        <Route path="/confirm" element={<ConfirmScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
