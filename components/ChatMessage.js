import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useUserContext } from "@/context/userContext";

const auth = firebase.auth();

const ChatMessage = (props) => {
  const { text, uid, photoURL, displayName } = props.message;
  // console.log(props.message)

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass} `}>
        <div className={` ${messageClass} w-full message flex-row gap-0.5`}>
          <div
            className={`text-sm text-gray-600 self-middle ${messageClass} px-2`}
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
