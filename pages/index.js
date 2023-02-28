import React, { useRef, useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

import Login from "@/components/Login";
import { useUserContext } from "@/context/userContext";
import Auth from "@/components/Auth";
import ChatRoom from "@/components/ChatRoom";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

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
// const analytics = firebase.analytics();

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { loading, error, user } = useUserContext();
  // const [user] = useAuthState(auth);

    // let username = user.displayName.split(' ')[0];

    
    return (
      <>
      <Head>
        <title>RealChat-demo</title>
        <meta
          name="description"
          content="A real-time chat app built with next.js, firebase, and tailwindcss. Bootstrapped with create-next-app."
          />
        <link rel="icon" href="/bubble.ico" />
      </Head>
      <div className="App flex h-[100vh] flex-col">
        <header className="flex flex-row justify-between px-8 py-6 bg-header text-gray-700 shadow-lg fixed w-full top-0 z-20">
          {user ? <Welcome /> : 
          <h3 className="text-gray">
          {"< "}
          <span className="text-iosBlue font-bold">{"/"}</span>
          <span className="text-gray-700">{" ChatroomDemo "}</span>
          <span>{" >"}</span>
          </h3>
          }
          <Logout />
        </header>

        <section id="chat-room-section" className=" my-4 mt-[10vh]">
          {error && <p className="error font-red-500">{error}</p>}
          {user ? <ChatRoom /> : <Auth />}
        </section>
      </div>
    </>
  );
}

function Logout() {
  return (
    auth.currentUser && (
      <button className="text-iosBlue block" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};

function Welcome() {
  let username = auth.currentUser._delegate.displayName.split(' ')[0];
  return (
    auth.currentUser && (
      <h3 className="text-gray">{`Welcome, ${username}`}</h3>
    )
  )
}
