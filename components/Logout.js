import React from "react";
import firebase from "firebase/compat/app";

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
