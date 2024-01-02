// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIBW6U3KerV9hFPEQdFrT1tWTI3-CE2CY",
  authDomain: "otp-phone-18ce3.firebaseapp.com",
  projectId: "otp-phone-18ce3",
  storageBucket: "otp-phone-18ce3.appspot.com",
  messagingSenderId: "886126932593",
  appId: "1:886126932593:web:316732dc32de972cfda1d0",
  measurementId: "G-0V1W79YL3R"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);