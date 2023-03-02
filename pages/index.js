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
import SideBar from "@/components/SideBar";

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
        <title>ShackChat</title>
        <meta
          name="description"
          content="A real-time chat app built with next.js, firebase, and tailwindcss. Bootstrapped with create-next-app."
          />
        <link rel="icon" href="/shackchat.png" />
      </Head>
      <div className="App relative h-[100vh]">
      {user ? 
      <>
      {/* <SideBar /> */}
        <header className="flex justify-between px-8 py-6 bg-sidebar border-b border-gray-700 text-gray-700 shadow-lg fixed w-full top-0 z-20">
          <Welcome /> 
          <Logout /> 
        </header>

        <section id="chat-room-section" className=" my-4 mt-20 bg-background">
        {error && <p className="error font-red-500">{error}</p>}
        <ChatRoom /> 
        </section>
        </>
        : 
        <section id="chat-room-section" className=" my-4 mt-[10vh] bg-background">
          {error && <p className="error font-red-500">{error}</p>} <Auth />
          </section>}
      </div>
    </>
  );
}

function Logout() {
  return (
    auth.currentUser && (
      <button className="text-green underline hover:text-slate-300 " onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
};

function Welcome() {
  let username = auth.currentUser._delegate.displayName.split(' ')[0];
  return (
    auth.currentUser && (
      <h3 className="text-slate-300 bg-sidebar ">{`Welcome to ShackChat, ${username}`}</h3>
    )
  )
}
