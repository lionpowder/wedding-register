import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";

import MainPage from "../page/main";
import CheckInManager from "../page/checkinManager";

export const pages = {
  Main: {
    content: <MainPage></MainPage>,
    icon: <DashboardIcon></DashboardIcon>,
    title: "Main Page",
  },
  Checkin: {
    content: <CheckInManager></CheckInManager>,
    icon: <ShoppingCartIcon></ShoppingCartIcon>,
    title: "Checkin Management",
  },
  Table: {
    content: null,
    icon: <PeopleIcon></PeopleIcon>,
    title: "Table Management",
  },
  Cake: {
    content: null,
    icon: <AssignmentIcon></AssignmentIcon>,
    title: "Cake Management",
  },
};

export const getCurrentPage = (pageName) => {
  return pages[pageName] || pages["Main"];
};
