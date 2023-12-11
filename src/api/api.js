import GuestData from "../mockData/GuestData.json";

export const getFullGuestList = () => {
  return GuestData;
};

export const getGuestGroomGuestList = () => {
  return GuestData.filter((data) => data.Side === "男方");
};

export const getGuestBrideGuestList = () => {
  return GuestData.filter(
    (data) => data.Side === "共同" || data.Side === "女方"
  );
};

export const saveGuestData = (guestData) => {
  // TODO
};
