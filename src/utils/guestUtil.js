import { defaultGuestData } from "../data/guestData";

export const findGuestById = (guestDataList, id) => {
  const guest = guestDataList.find((data) => data.Id === id);
  return !!guest ? { ...guest } : undefined;
};

export const isGuestEmpty = (guest) => {
  return !(!!guest && Object.keys(guest).length > 0);
};

export const assignGuestIfEmpty = (guest) => {
  const isNotEmptyGuest = !isGuestEmpty(guest);
  return isNotEmptyGuest ? guest : defaultGuestData;
};

/**
 * Determine if the guest need to receive cake
 * @param {*} side which party the guest belongs to
 * @returns true if guest is 共同 or 女方
 */
export const determineNeedCake = (side) => {
  return side === "共同" || side === "女方";
};

/**
 * Gift received checkbox (auto ID assignment when gift received A1, A2…)
 * @param {*} side which party the guest belongs to
 * @returns Envelop Id in the format of A1, A2,... B1, B2,... C1, C2, ...
 */
export const generateEnvelopId = (side, guestDataList, selectedGuest) => {
  const sidePrefix = generateEnvelopIdPrefix(side);
  const currentEnvIdList = guestDataList
    .filter((data) => data.Side === side)
    .map((data) => {
      return data.EnvelopId.replace(sidePrefix, "");
    });

  if (selectedGuest?.Side === side) {
    currentEnvIdList.push(selectedGuest.EnvelopId.replace(sidePrefix, ""));
  }

  const maxCurrentId = currentEnvIdList ? Math.max(...currentEnvIdList) : 0;

  return sidePrefix + (maxCurrentId + 1);
};

export const generateEnvelopIdPrefix = (side) => {
  switch (side) {
    case "共同":
      return "C";
    case "女方":
      return "B";
    case "男方":
      return "A";
    default:
      return "X";
  }
};
