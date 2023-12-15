import GuestData from "../mockData/GuestData.json";
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
  // return GuestData;
  const fullGuestData = await getDocs(collection(db, GUEST_DATA_DB_NAME)).then(
    (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return newData;
    }
  );

  return fullGuestData;
};

export const getGuestGroomGuestList = () => {
  return GuestData.filter((data) => data.Side === "男方");
};

export const getGuestBrideGuestList = () => {
  return GuestData.filter(
    (data) => data.Side === "共同" || data.Side === "女方"
  );
};

export const addGuestData = async (e, guestData) => {
  e.preventDefault();

  try {
    const docRef = await addDoc(collection(db, GUEST_DATA_DB_NAME), {
      guestData,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateGuestData = async (e, guestData) => {
  e.preventDefault();

  try {
    const docRef = await updateDoc(doc(db, GUEST_DATA_DB_NAME, guestData.id), {
      guestData,
    });
    console.log("Document update with ID: ", docRef.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
