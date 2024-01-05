import { determineNeedCake } from "../utils/guestUtil";
import { dateToTimestamp } from "../db/cloudDb";

export const defaultGuestData = {
  Name: [],
  Alias: [],
  NoOfRegular: 0,
  NoOfVegetarian: 0,
  NoOfChildren: 0,
  Relationship: [],
  TableNo: [],
  Side: "共同", // "女方", "男方"
  NeedCake: false,
  IsCheckedIn: false,
  IsCakeGiven: false,
  IsEnvelopeReceived: false,
  EnvelopId: "",
  GeneralNote: "",
  CheckinNote: "",
  CakeNote: "",
  Status: "", // "", "New", "Update", "Retry"
  SubstituteFor: [],
  LastModifiedTime: dateToTimestamp(new Date()),
};

export const generateNewGuestData = (partialGuestData) => {
  const newGuestData = { ...partialGuestData };
  Object.keys(defaultGuestData).forEach((key) => {
    if (partialGuestData[key] === undefined) {
      switch (key) {
        case "NeedCake":
          newGuestData[key] = determineNeedCake(partialGuestData.Side);
          return;
        case "LastModifiedTime":
          newGuestData[key] = dateToTimestamp(new Date());
          return;
        default:
      }
      newGuestData[key] = defaultGuestData[key];
    }
  });
  return newGuestData;
};

export const calculateNewGuestValue = (partialGuestData) => {
  const newGuestData = { ...partialGuestData };

  newGuestData.NeedCake = determineNeedCake(partialGuestData.Side);
  newGuestData.LastModifiedTime = dateToTimestamp(new Date());

  return newGuestData;
};
