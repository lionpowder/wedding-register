/**
 * Util for page mapping
 */

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";

import MainPage from "../page/main";
import CakeManager from "../page/cakeManager";
import CheckInManager from "../page/checkinManager";
import GuestTableManager from "../page/guestTableManager";

/**
 * Definition of pages
 * Each page object should contain: content element, icon element, & page title
 */
export const pages = [
  {
    content: <MainPage></MainPage>,
    icon: <DashboardIcon></DashboardIcon>,
    title: "首頁",
    path: "/",
  },
  {
    content: <CheckInManager></CheckInManager>,
    icon: <ShoppingCartIcon></ShoppingCartIcon>,
    title: "報到管理",
    path: "/checkin",
  },
  {
    content: <GuestTableManager></GuestTableManager>, // Table Management
    icon: <PeopleIcon></PeopleIcon>,
    title: "桌次管理",
    path: "/table",
  },
  {
    content: <CakeManager></CakeManager>, // Cake Management
    icon: <AssignmentIcon></AssignmentIcon>,
    title: "領餅管理",
    path: "/cake",
  },
];
