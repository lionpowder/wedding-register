import React from "react";
import { defaultGuestData } from "../data/guestData";
import {
  useCloudDB,
  getFullGuestList,
  updateGuestData as updateGuestCloudData,
} from "../db/cloudDb";
import { useGuestDataStore, useLastGuestStore } from "../db/localStorage";
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
  const guestCloud = useCloudDB();
  const [guestStore, setGuestDataStore] = useGuestDataStore();
  // last guest data stored in local storage
  const [lastGuestStore, setLastGuestStore] =
    useLastGuestStore(defaultGuestData);
  // Full list of data based on cloud db, local storage, & current state
  const [fullGuestDataList, setFullGuestDataList] = React.useState(
    guestCloud || [defaultGuestData]
  );
  // Filtered guest data used to show on every page
  const [guestDataList, setGuestDataList] = React.useState([defaultGuestData]);
  // Guest's side filtering criteria
  const [sideFilter, setSideFilter] = React.useState(sides);

  /**
   * This function will trigger every time there's an update in Local Storage
   */
  React.useEffect(() => {
    console.log("Changes in guestStore: ", guestStore);
  }, [guestStore]);

  /**
   * This function will trigger every time there's an update in cloudDB
   * Fetch the full list of data on page load from cloudDB
   */
  // TODO: need to combine list from both cloud & localStorage
  React.useEffect(() => {
    console.log("Changes in guestCloud: ", guestCloud);
    guestCloud && setFullGuestDataList(guestCloud);

    if (!guestStore) setGuestDataStore(guestCloud);
  }, [guestCloud, guestStore]);

  /**
   * Filtered data based on guest's side
   */
  React.useEffect(() => {
    const filteredGuestDataList = fullGuestDataList.filter((guestData) =>
      sideFilter.includes(guestData.Side)
    );
    setGuestDataList(filteredGuestDataList);
  }, [fullGuestDataList, sideFilter]);

  /**
   * Update Guest data in context, localStorage, & cloud
   * This guest data is used throughout the website within single tab
   * @param {*} guestData
   */
  // Use partial guest data here to minimize chances of race condition for write op
  // TODO: prevent race condition (set flag that someone is currenting editing field or user? Need to pull before updating)
  const updateGuestData = (partialGuestData) => {
    // Update full list within data context
    let updatedGuestDataList = [...fullGuestDataList];
    const updatedDataIdx = updatedGuestDataList.findIndex(
      (data) => data.Id === partialGuestData.Id
    );

    updatedGuestDataList[updatedDataIdx] = {
      ...updatedGuestDataList[updatedDataIdx],
      ...partialGuestData,
    };
    setFullGuestDataList(updatedGuestDataList);

    // Update to cloud
    // TODO: if Status = "retry", need to retry updating localStorage or context data to DB every 5 min.
    const updatedGuestDataFromCloud = updateGuestCloudData(partialGuestData);

    // Update to LocalStorage
    setGuestDataStore(updatedGuestDataList);
    setLastGuestStore(partialGuestData); // TODO: should only save the last guest if checked in is change from false to true (?)
  };

  const value = {
    guestData: guestDataList,
    updateGuestData,
    lastCheckinGuest: lastGuestStore,
    sideFilter,
    setSideFilter,
  };

  return (
    <GuestDataContext.Provider value={value}>
      {children}
    </GuestDataContext.Provider>
  );
};
