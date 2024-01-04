import React from "react";
import { defaultGuestData } from "../data/guestData";
import {
  useGuestData,
  updateGuestData as updateGuestCloudData,
  dateToTimestamp,
} from "../db/cloudDb";
import { useGuestDataStore, useConfirmGuestStore } from "../db/localStorage";
import { sides } from "../data/sideData";
import { isGuestEmpty } from "../utils/guestUtil";

export const GuestDataContext = React.createContext({
  guestData: [],
  updateGuestData: null,
  setConfirmGuest: null,
  confirmGuestStore: null,
  setConfirmGuestStore: null,
  sideFilter: sides,
  setSideFilter: null,
});

export const GuestDataProvider = ({ children }) => {
  const guestCloud = useGuestData();
  const [guestStore, setGuestDataStore] = useGuestDataStore();
  // current confirming guest data stored in local storage
  const [confirmGuestStore, setConfirmGuestStore] =
    useConfirmGuestStore(defaultGuestData);
  // Full list of data based on cloud db, local storage, & current state
  const [fullGuestDataList, setFullGuestDataList] = React.useState(
    guestCloud || []
  );
  // Filtered guest data used to show on every page
  const [guestDataList, setGuestDataList] = React.useState([]);
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
    console.log("Changes in guestCloud: ", guestCloud, guestStore);
    guestCloud && setFullGuestDataList(guestCloud);

    if (isGuestEmpty(guestStore) && guestCloud) setGuestDataStore(guestCloud);
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
      LastModifiedTime: dateToTimestamp(new Date()),
    };
    setFullGuestDataList(updatedGuestDataList);

    // Update to cloud
    // TODO: if Status = "retry", need to retry updating localStorage or context data to DB every 5 min.
    const updatedGuestDataFromCloud = updateGuestCloudData(
      updatedGuestDataList[updatedDataIdx]
    );

    // Update to LocalStorage
    setGuestDataStore(updatedGuestDataList);
  };

  const value = {
    guestData: guestDataList,
    updateGuestData,
    confirmGuestStore: confirmGuestStore,
    setConfirmGuestStore,
    sideFilter,
    setSideFilter,
  };

  return (
    <GuestDataContext.Provider value={value}>
      {children}
    </GuestDataContext.Provider>
  );
};
