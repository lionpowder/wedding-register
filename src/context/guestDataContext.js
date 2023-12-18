import React from "react";
import { defaultGuestData } from "../data/guestData";
import {
  getFullGuestList,
  updateGuestData as updateGuestCloudData,
} from "../db/cloudDb";

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
    // load guest data from cloud DB when first hit the site
    getFullGuestList().then((data) => {
      setGuestDataList(data);
    });
  }, []);

  // TODO: need to refresh guest data from DB once every 5 min
  // TODO: need to listen to localStorage data for updating guestDataList list

  /**
   * Update Guest data in context, localStorage, & cloud
   * This guest data is used throughout the website within single tab
   * @param {*} guestData
   */
  // TODO: update localStorage data every time there's an update
  const updateGuestData = (guestData) => {
    let updatedGuestDataList = [...guestDataList];
    const updatedDataIdx = updatedGuestDataList.findIndex(
      (data) => data.Id === guestData.Id
    );

    // Update data context
    updatedGuestDataList[updatedDataIdx] = guestData;
    setGuestDataList(updatedGuestDataList);

    // Update to cloud
    updateGuestCloudData(guestData);
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
