import React from "react";
import { GuestDataProvider } from "./guestDataContext";

const entryPage = "Main";

export const PageContext = React.createContext({
  // eslint-disable-next-line no-undef
  currentPageName: entryPage,
  setCurrentPageName: null,
});

// TODO: Add user info to the app later
// TODO: Whenever there's new update in data from cloud/localstorage, send notification to current user
export const PageProvider = ({ children }) => {
  const [currentPageName, setCurrentPageName] = React.useState(entryPage);

  const value = {
    currentPageName,
    setCurrentPageName,
  };

  return (
    <PageContext.Provider value={value}>
      <GuestDataProvider>{children}</GuestDataProvider>
    </PageContext.Provider>
  );
};
