import GuestData from "./mockData/GuestData.json";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const GUEST_DATA_DB_NAME = "GuestData";

/**
 *
 * @returns
 */
export const getFullGuestList = async () => {
  try {
    const fullGuestData = await getDocs(
      collection(db, GUEST_DATA_DB_NAME)
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        Id: doc.id,
        Status: "",
      }));

      return newData;
    });

    return fullGuestData;
  } catch (e) {
    console.error("Error fetching document: ", e);
  }
};

/**
 * Adding new record to cloud DB
 * @param {*} guestData
 */
export const addGuestData = async (guestData) => {
  try {
    let { Status: _, ...saveGuestData } = guestData;
    const docRef = await addDoc(
      collection(db, GUEST_DATA_DB_NAME),
      saveGuestData
    );

    console.info("Document written with ID: ", docRef.id);

    // TODO: need to assign this Id back to the guestData
    return { ...guestData, Id: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/**
 * Updating existing data to cloud DB
 * @param {*} partialGuestData must contain Id
 */
export const updateGuestData = async (partialGuestData) => {
  let { Status: _, ...saveGuestData } = partialGuestData;
  try {
    await updateDoc(
      doc(db, GUEST_DATA_DB_NAME, partialGuestData.Id),
      saveGuestData
    );
    console.info("Document update with ID: ", partialGuestData.Id);
  } catch (e) {
    console.error("Error updating document: ", e);

    // TODO: if there's error, set flag to retry updating localStorage to DB every 5 min.
    return { ...partialGuestData, Status: "Retry" };
  }
};
