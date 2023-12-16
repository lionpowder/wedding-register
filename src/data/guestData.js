export const defaultGuestData = {
  Name: ["TBD"],
  Alias: [""],
  NoOfRegular: 1,
  NoOfVegetarian: 0,
  NoOfChildren: 0,
  Relationship: [
    "男女方共同友人",
    "男方親戚／父母友人",
    "男方友人",
    "男方同學",
    "女方親戚／父母友人",
    "女方友人",
    "女方同學",
    "女方長官/同事",
    "女方律訓同組同學",
  ], // TODO: 需可新增(?)
  Table: 2,
  Side: "共同", // "女方", "男方"
  NeedCake: true,
  IsCheckedin: false,
  IsCakeGiven: false,
  EnvelopId: "A1",
  GeneralNote: "Test",
  CheckinNote: "Check in note",
  CakeNote: "Cake note",
};

const determineNeedCake = (side) => {
  return side === "共同" || side === "女方";
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
    NoOfRegular: noOfRegular, // put as regular first, modify if need vegetarian or have children
    Relationship: relationship,
    Table: 2, // TODO: auto generated based on the rule?
    Side: side,
    NeedCake: determineNeedCake(side),
  };
};
