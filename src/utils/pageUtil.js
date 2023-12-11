import MainPage from "../page/main";
import CheckInManager from "../page/checkinManager";

// TODO: include icon, title, etc
export const pages = {
  Main: <MainPage></MainPage>,
  Checkin: <CheckInManager></CheckInManager>,
  Table: null,
  Cake: null,
};

export const getCurrentPage = (pageName) => {
  return pages[pageName] || pages["Main"];
};
