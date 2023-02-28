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
import RegisterUser from '@/components/RegisterUser';
import Auth from '@/components/Auth';

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_G_TAG
})

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { loading, error, user } = useUserContext()
  // const [user] = useAuthState(auth);

  return (
    <>
     <Head>
        <title>RealChat-demo</title>
        <meta name="description" content="A real-time chat app built with next.js, firebase, and tailwindcss. Bootstrapped with create-next-app." />
        <link rel="icon" href="/bubble.ico" />
      </Head>
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
    </>
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
  const query = messagesRef.orderBy('createdAt');

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  // console.log(messages)

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

  // messages.map((msg => console.log(msg)))
  return (<>
    <main className='chat-room h-[80vh] overflow-y-scroll px-4 md:px-8 touch-pan-y'>

      {messages && messages.map(msg => <ChatMessage key={msg.createdAt} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage} className='h-[10vh] flex align-middle bg-header shadow-lg fixed bottom-0 w-full px-8 md:px-12'>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type message here" className='mx-2 my-4 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-google focus:outline-none focus:ring-google sm:text-sm' />

      <button type="submit" disabled={!formValue} className='bg-iosBlue cursor-pointer text-white my-4 rounded-md py-2 px-4 text-center align-middle'>Send</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  // console.log(props.message)

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass} flex-wrap break-all`}>
      {/* <p className=''>{props.message.name[0]}</p> */}
      <p>{text}</p>
    </div>
  </>)
}