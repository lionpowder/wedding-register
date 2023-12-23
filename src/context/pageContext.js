import React from "react";
import { GuestDataProvider } from "./guestDataContext";

const entryPage = "Main";

export const PageContext = React.createContext({
  // eslint-disable-next-line no-undef
  currentPageName: entryPage,
  setCurrentPageName: null,
  app: null,
  setApp: null,
});

export const PageProvider = ({ children }) => {
  const [currentPageName, setCurrentPageName] = React.useState(entryPage);
  const [app, setApp] = React.useState(null); // TODO: what is set app....

  const value = {
    currentPageName,
    setCurrentPageName,
    app,
    setApp,
  };

  return (
    <PageContext.Provider value={value}>
      <GuestDataProvider>{children}</GuestDataProvider>
    </PageContext.Provider>
  );
};
