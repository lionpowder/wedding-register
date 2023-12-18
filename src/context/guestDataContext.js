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
  const [guestDataList, setGuestDataList] = React.useState([defaultGuestData]);
  const [lastCheckinGuest, setLastCheckinGuest] =
    React.useState(defaultGuestData); // TODO: Get from local storage, assign default if empty

  React.useEffect(() => {
    // load guest data
    getFullGuestList().then((data) => {
      setGuestDataList(data);
    });
  }, []);

  /**
   * Update Guest data in context
   * This guest data is used throughout the website within single tab
   * @param {*} guestData
   */
  // TODO: Need to refresh guest data from DB once every 5 min
  // TODO: update localStorage data every time there's an update
  const updateGuestData = (guestData) => {
    // Updating context data
    const updatedGuestDataList = guestDataList.map((data) => {
      return data.Id === guestData.Id ? { ...data, ...guestData } : data;
    });

    setGuestDataList(updatedGuestDataList);
  };

  // const guestDataGroomList = () => {
  //   return guestData.filter((data) => data.Side === "男方");
  // };

  // const guestDataBrideList = () => {
  //   return guestData.filter(
  //     (data) => data.Side === "共同" || data.Side === "女方"
  //   );
  // };

  const value = {
    guestData: guestDataList,
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
