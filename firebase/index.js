// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAum40V1RbfH_Gu0HRe51DLuOqbhZ4z40c",
  authDomain: "real-time-chat-app-b9cff.firebaseapp.com",
  projectId: "real-time-chat-app-b9cff",
  storageBucket: "real-time-chat-app-b9cff.appspot.com",
  messagingSenderId: "18308909175",
  appId: "1:18308909175:web:575e2347faa85a032b1e72",
  measurementId: "G-7BR18704EF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);