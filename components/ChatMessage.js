import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useUserContext } from "@/context/userContext";

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

const ChatMessage = (props) => {
  const { text, uid, photoURL, displayName } = props.message;
  // console.log(props.message)

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass} my-2`}>
        <div className={` ${messageClass} w-full message flex-row gap-0.5`}>
          <div
            className={`text-sm text-displayName self-middle ${messageClass} px-2`}
          >
            {displayName}
          </div>
          <p className="dropshadow-lg shadow-md">{text}</p>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
