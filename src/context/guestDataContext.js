import React from "react";
import { defaultGuestData } from "../data/guestData";
import {
  getFullGuestList,
  updateGuestData as updateGuestCloudData,
} from "../db/cloudDb";
import { sides } from "../data/sideData";

export const GuestDataContext = React.createContext({
  guestData: [defaultGuestData],
  updateGuestData: null,
  setLastCheckinGuest: null,
  lastCheckinGuest: defaultGuestData,
  sideFilter: sides,
  setSideFilter: null,
});

export const GuestDataProvider = ({ children }) => {
  const [fullGuestDataList, setFullGuestDataList] = React.useState([
    defaultGuestData,
  ]);
  const [guestDataList, setGuestDataList] = React.useState([defaultGuestData]);
  const [lastCheckinGuest, setLastCheckinGuest] =
    React.useState(defaultGuestData); // TODO: Get from local storage, assign default if empty
  const [sideFilter, setSideFilter] = React.useState(sides);

  React.useEffect(() => {
    // load guest data from cloud DB when first hit the site
    getFullGuestList().then((data) => {
      setFullGuestDataList(data);
    });
  }, []);

  React.useEffect(() => {
    const filteredGuestDataList = fullGuestDataList.filter((guestData) =>
      sideFilter.includes(guestData.Side)
    );
    setGuestDataList(filteredGuestDataList);
  }, [fullGuestDataList, sideFilter]);

  // TODO: need to refresh guest data from DB once every 5 min
  // TODO: need to listen to localStorage data for updating guestDataList list

  /**
   * Update Guest data in context, localStorage, & cloud
   * This guest data is used throughout the website within single tab
   * @param {*} guestData
   */
  // TODO: update localStorage data every time there's an update
  // Use partial guest data here to minimize chances of race condition for write op
  // TODO: prevent race condition (set flag that someone is currenting editing field or user? Need to pull before updating)
  const updateGuestData = (partialGuestData) => {
    let updatedGuestDataList = [...guestDataList];
    const updatedDataIdx = updatedGuestDataList.findIndex(
      (data) => data.Id === partialGuestData.Id
    );

    // Update data context
    updatedGuestDataList[updatedDataIdx] = {
      ...updatedGuestDataList[updatedDataIdx],
      ...partialGuestData,
    };
    setGuestDataList(updatedGuestDataList);

    // Update to cloud
    updateGuestCloudData(partialGuestData);
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
    sideFilter,
    setSideFilter,
  };

  return (
    <GuestDataContext.Provider value={value}>
      {children}
    </GuestDataContext.Provider>
  );
};
