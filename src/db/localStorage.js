/**
 * TBD
 */
import React from "react";

const GUESTLIST_STORE_KEY = "guestDataList";
const LASTGUEST_STORE_KEY = "lastGuest";
const CONFIRM_GUEST_STORE = "confirm-guest-store";

// TODO: cleaning up localstorage (?) https://blog.logrocket.com/localstorage-javascript-complete-guide/

const useLocalStorage = (storageKey, fallbackState) => {
  const setDataStore = (guestDataList) => {
    // console.log("Saving local storage with data: ", guestDataList);
    const storageData = JSON.stringify(guestDataList);
    window.localStorage.setItem(storageKey, storageData);
    // On localStoage.setItem, the storage event is only triggered on other tabs and windows.
    // So we manually dispatch a storage event to trigger the subscribe function on the current window as well.
    window.dispatchEvent(
      new StorageEvent("storage", { key: storageKey, storageData })
    );
  };

  const getSnapshot = () => {
    return localStorage.getItem(storageKey) || JSON.stringify(fallbackState);
  };

  const subscribe = (listener) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  };

  const store = React.useSyncExternalStore(subscribe, getSnapshot);

  return [store, setDataStore];
};

export const useGuestDataStore = (fallbackState) => {
  const [guestStore, setGuestDataStore] = useLocalStorage(
    GUESTLIST_STORE_KEY,
    fallbackState
  );

  return [JSON.parse(guestStore || "{}"), setGuestDataStore];
};

export const useLastGuestStore = (fallbackState) => {
  const [lastGuestStore, setLastGuestStore] = useLocalStorage(
    LASTGUEST_STORE_KEY,
    fallbackState
  );

  return [JSON.parse(lastGuestStore || "{}"), setLastGuestStore];
};

export const useConfirmGuestStore = (fallbackState) => {
  const [lastGuestStore, setLastGuestStore] = useLocalStorage(
    CONFIRM_GUEST_STORE,
    fallbackState
  );

  return [JSON.parse(lastGuestStore || "{}"), setLastGuestStore];
};
