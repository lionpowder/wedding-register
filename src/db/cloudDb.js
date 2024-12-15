import React from "react";
import GuestData from "./mockData/MockGuestData.json";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const GUEST_DATA_DB_NAME = "GuestData_Jess";
const SEATING_DATA_DB_NAME = "SeatData_Jess";
const isUseMock = false;

export const dateToTimestamp = (date) => {
  return Timestamp.fromDate(date);
};

export const timestampToDate = (timeStamp) => {
  return timeStamp.toDate();
};

const useCloudDB = (path) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    if (isUseMock || process.env.REACT_APP_ENVIRONMENT === "Mock") {
      setData(GuestData);
      return;
    }

    try {
      const unsubscribe = onSnapshot(collection(db, path), (snapshot) => {
        if (snapshot.size) {
          let myDataArray = [];
          snapshot.forEach((doc) => {
            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            // console.log(source, " data: ", doc.data());

            myDataArray.push({
              ...doc.data(),
              Id: doc.id,
              Status: "",
            });
          });

          // snapshot.docChanges().forEach((change) => {
          //   if (change.type === "added") {
          //     console.log("New city: ", change.doc.data());
          //   }
          //   if (change.type === "modified") {
          //     console.log("Modified city: ", change.doc.data());
          //   }
          //   if (change.type === "removed") {
          //     console.log("Removed city: ", change.doc.data());
          //   }
          // });
          setData(myDataArray);
          console.log("updated snapshot", myDataArray);
        } else {
          // it's empty
        }
      });

      return () => {
        unsubscribe();
      };
    } catch (e) {
      console.error("Error fetching document: ", e);
    }
  }, []);

  return data;
};

export const useGuestData = () => {
  return useCloudDB(GUEST_DATA_DB_NAME);
};

/**
 * Adding new record to cloud DB
 * @param {*} guestData
 */
export const addGuestData = async (guestData) => {
  try {
    let { Status: _, Id: __, ...saveGuestData } = guestData;
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
  let { Status: _, Id: __, ...saveGuestData } = partialGuestData;
  try {
    await updateDoc(
      doc(db, GUEST_DATA_DB_NAME, partialGuestData.Id),
      saveGuestData
    );
    console.info("Document update with ID: ", partialGuestData.Id);
    return { ...partialGuestData, Status: "" };
  } catch (e) {
    console.error("Error updating document: ", e);

    return { ...partialGuestData, Status: "Retry" };
  }
};

export const useSeatingData = () => {
  return useCloudDB(SEATING_DATA_DB_NAME);
};
