/**
 * Util for page mapping
 */

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";

import MainPage from "../page/main";
import CheckInManager from "../page/checkinManager";

/**
 * Definition of pages
 * Each page object should contain: content element, icon element, & page title
 */
export const pages = {
  Main: {
    content: <MainPage></MainPage>,
    icon: <DashboardIcon></DashboardIcon>,
    title: "首頁",
  },
  Checkin: {
    content: <CheckInManager></CheckInManager>,
    icon: <ShoppingCartIcon></ShoppingCartIcon>,
    title: "報到管理",
  },
  Table: {
    content: null, // Table Management
    icon: <PeopleIcon></PeopleIcon>,
    title: "桌次管理",
  },
  Cake: {
    content: null, // Cake Management
    icon: <AssignmentIcon></AssignmentIcon>,
    title: "領餅管理",
  },
};

/**
 * get the page object based on page's key
 * @param {*} pageName page's key
 * @returns page object
 */
export const getCurrentPage = (pageName) => {
  return pages[pageName] || pages["Main"];
};
