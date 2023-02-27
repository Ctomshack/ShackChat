import Head from 'next/head'
import { Inter } from 'next/font/google'



import React, { useRef, useState } from 'react';
// import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Login from '@/components/Login';
import { useUserContext } from '@/context/userContext';
import RegisterUser from '@/components/registerUser';
import Auth from '@/components/Auth';

firebase.initializeApp({
  apiKey: "AIzaSyAum40V1RbfH_Gu0HRe51DLuOqbhZ4z40c",
  authDomain: "real-time-chat-app-b9cff.firebaseapp.com",
  projectId: "real-time-chat-app-b9cff",
  storageBucket: "real-time-chat-app-b9cff.appspot.com",
  messagingSenderId: "18308909175",
  appId: "1:18308909175:web:575e2347faa85a032b1e72",
  measurementId: "G-7BR18704EF"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { loading, error, user } = useUserContext()
  // const [user] = useAuthState(auth);

  return (
    <div className="App flex h-[100vh] flex-col">
      <header className='flex flex-row justify-between px-8 py-6 bg-header text-gray-700 shadow-lg fixed w-full top-0 z-20'>
      <h3 className="text-gray">
                {"< "}
                <span className="text-iosBlue font-bold">{"/"}</span>
                <span className="text-gray-700">
                  {" Chris.dev "}
                </span>
                <span>{" >"}</span>
              </h3>
        <h1 className='font-semibold'>Chatroom App </h1>
        <SignOut />
      </header>

      <section id='chat-room-section' className=' my-4 mt-[10vh]'>
      {error && <p className="error font-red-500">{error}</p>}
        {user ? <ChatRoom /> : <Auth />}
      </section>

    </div>
  );
}

<Login />


function SignOut() {
  return auth.currentUser && (
    <button className="text-iosBlue block" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main className='h-[80vh] overflow-y-scroll px-4 md:px-8'>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage} className='h-[10vh] flex align-middle bg-header shadow-lg'>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type message here" className='mx-4 md:mx-12 my-4 block overflow-x-hidden w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-google focus:outline-none focus:ring-google sm:text-sm' />

      {/* <button type="submit" disabled={!formValue} className='invisible'></button> */}

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  // console.log(props)

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass} flex-wrap break-all`}>
      <p>{text}</p>
    </div>
  </>)
}