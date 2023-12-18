import { determineNeedCake } from "../utils/guestUtil";

export const defaultGuestData = {
  Id: 0,
  Name: ["TBD"],
  Alias: [""],
  NoOfRegular: 1,
  NoOfVegetarian: 0,
  NoOfChildren: 0,
  Relationship: ["男女方共同友人"],
  Table: 2,
  Side: "共同", // "女方", "男方"
  NeedCake: true,
  IsCheckedIn: false,
  IsCakeGiven: false,
  EnvelopId: "",
  GeneralNote: "",
  CheckinNote: "",
  CakeNote: "",
};

export const generateNewGuestData = (
  name,
  alias,
  noOfRegular,
  relationship,
  side
) => {
  return {
    ...defaultGuestData,
    Name: name,
    Alias: alias,
    NoOfRegular: noOfRegular, // TODO: put as regular first, modify if need vegetarian or have children
    Relationship: relationship,
    Table: 2, // TODO: auto generated based on the rule?
    Side: side,
    NeedCake: determineNeedCake(side),
  };
};
