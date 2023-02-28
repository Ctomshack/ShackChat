import React from "react";
import firebase from "firebase/compat/app";

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_G_TAG,
});

const auth = firebase.auth();

const Logout = () => {
  return (
    auth.currentUser && (
      <button className="text-iosBlue block" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};

export default Logout;
