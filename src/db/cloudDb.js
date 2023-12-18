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

export const getFullGuestList = async () => {
  try {
    const fullGuestData = await getDocs(
      collection(db, GUEST_DATA_DB_NAME)
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return newData;
    });
    // console.log(fullGuestData);
    return fullGuestData;
  } catch (e) {
    console.error("Error fetching document: ", e);
  }
};

export const addGuestData = async (e, guestData) => {
  e.preventDefault();

  try {
    const docRef = await addDoc(collection(db, GUEST_DATA_DB_NAME), {
      guestData,
    });
    console.info("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/**
 *
 * @param {*} e
 * @param {*} partialGuestData must contain id
 */
export const updateGuestData = async (e, partialGuestData) => {
  e.preventDefault();

  try {
    const docRef = await updateDoc(
      doc(db, GUEST_DATA_DB_NAME, partialGuestData.id),
      {
        partialGuestData,
      }
    );
    console.info("Document update with ID: ", docRef.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
