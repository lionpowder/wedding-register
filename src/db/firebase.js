// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1NFuyauqFW5qhDQwD7-bGVV_VQEJMnV8",
  authDomain: "wedding-register-web.firebaseapp.com",
  databaseURL:
    "https://wedding-register-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wedding-register-web",
  storageBucket: "wedding-register-web.appspot.com",
  messagingSenderId: "217985993407",
  appId: "1:217985993407:web:bdfb2fc9b141ce6eefd40a",
};
// Initialize Firebase
// TODO: should only need to initialize Firebase once (double check)
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
