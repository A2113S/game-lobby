// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANq2fAzImTKx8rHD4OPGtfIuT-TZJB_y8",
  authDomain: "game-lobby-50375.firebaseapp.com",
  projectId: "game-lobby-50375",
  storageBucket: "game-lobby-50375.appspot.com",
  messagingSenderId: "788042719673",
  appId: "1:788042719673:web:5dfd008c6e8879eccb1668",
  measurementId: "G-FH0PYWJN59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
