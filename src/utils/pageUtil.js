/**
 * Util for page mapping
 */

import HomeIcon from "@mui/icons-material/Home";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import TableBarIcon from "@mui/icons-material/TableBar";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

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
    icon: <HomeIcon></HomeIcon>,
    title: "首頁",
    path: "/",
  },
  {
    content: <CheckInManager></CheckInManager>,
    icon: <DomainVerificationIcon></DomainVerificationIcon>,
    title: "報到管理",
    path: "/checkin",
  },
  {
    content: <GuestTableManager></GuestTableManager>, // Table Management
    icon: <TableBarIcon></TableBarIcon>,
    title: "桌次管理",
    path: "/table",
  },
  {
    content: <CakeManager></CakeManager>, // Cake Management
    icon: <CardGiftcardIcon></CardGiftcardIcon>,
    title: "領餅管理",
    path: "/cake",
  },
];
