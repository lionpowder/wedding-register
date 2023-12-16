import React from "react";
import { defaultGuestData } from "../data/guestData";
import { getFullGuestList } from "../db/cloudDb";

export const GuestDataContext = React.createContext({
  guestData: [defaultGuestData],
  updateGuestData: null,
  setLastCheckinGuest: null,
  lastCheckinGuest: defaultGuestData,
});

export const GuestDataProvider = ({ children }) => {
  const [guestData, setGuestData] = React.useState([defaultGuestData]);
  const [lastCheckinGuest, setLastCheckinGuest] =
    React.useState(defaultGuestData);

  React.useEffect(() => {
    // load guest data
    getFullGuestList().then((data) => {
      setGuestData(data);
      console.log(data);
    });
  }, []);

  // TODO: Need to refresh guest data from DB once every 5 min
  // TODO: update localStorage data every time there's update
  const updateGuestData = (guestData) => {
    setGuestData(guestData);
  };

  const value = {
    guestData,
    updateGuestData,
    lastCheckinGuest,
    setLastCheckinGuest,
  };

  return (
    <GuestDataContext.Provider value={value}>
      {children}
    </GuestDataContext.Provider>
  );
};
