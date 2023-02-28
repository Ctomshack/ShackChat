import React, { useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useUserContext } from "@/context/userContext";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
const firestore = firebase.firestore();

const ChatRoom = () => {
  const textValue = useRef();
  const messagesRef = firestore.collection("messages");
  const messagesQuery = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  // console.log(messages)
  // console.log(auth.currentUser)

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    const displayName = auth.currentUser._delegate.displayName.split(" ")[0];
    // console.log(displayName)

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });

    setFormValue("");
    textValue.current.scrollIntoView({ behavior: "smooth" });
  };

  // messages.map((msg => console.log(msg)))

  return (
    <>
      <main className="chat-room h-[80vh] overflow-y-scroll px-4 md:px-8 touch-pan-y">
        {messages &&
          messages.map((message) => (
            <ChatMessage key={message.createdAt} message={message} />
          ))}

        <span ref={textValue}></span>
      </main>

      <form
        onSubmit={sendMessage}
        className="h-[10vh] flex align-middle bg-header shadow-lg fixed bottom-0 w-full px-8 md:px-12"
      >
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type message here"
          className="mx-2 my-4 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-google focus:outline-none focus:ring-google sm:text-sm"
        />

        <button
          type="submit"
          disabled={!formValue}
          className="bg-iosBlue cursor-pointer text-white rounded-md my-4 sm:my-6 py-2 px-4 text-center align-middle"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
