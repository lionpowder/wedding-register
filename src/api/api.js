import { getApp, initializeApp } from "firebase/app";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
} from "firebase/functions";
import GuestData from "../mockData/GuestData.json";

export const callFirebaseFunction = (event) => {
  // const app = initializeApp({
  //   projectId: "### CLOUD FUNCTIONS PROJECT ID ###",
  //   apiKey: "### FIREBASE API KEY ###",
  //   authDomain: "### FIREBASE AUTH DOMAIN ###",
  // });
  const functions = getFunctions(getApp());
  connectFunctionsEmulator(functions, "127.0.0.1", 5001); // http://127.0.0.1:5001/wedding-register-web/us-central1/helloWorld
  // const functions = getFunctions(app);
  const callableReturnMessage = httpsCallable(functions, "helloWorld");

  callableReturnMessage()
    .then((result) => {
      console.log(result.data.output);
    })
    .catch((error) => {
      console.log(`error: ${JSON.stringify(error)}`);
    });
};

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
