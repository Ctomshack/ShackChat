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
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className='flex flex-row justify-between px-8 py-6 bg-black text-white'>
        <h2>Logo</h2>
        <div>
        <SignOut />
        </div>
      </header>

      <section>
        {user ? <ChatRoom /> : <Login />}
      </section>

    </div>
  );
}

<Login />


function SignOut() {
  return auth.currentUser && (
    <button className="sign-out block" onClick={() => auth.signOut()}>Sign Out</button>
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
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
      <p>{text}</p>
    </div>
  </>)
}