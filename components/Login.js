import React, { useRef } from "react";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { RiChatSmile3Fill } from 'react-icons/ri';

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

export default function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signInWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    auth.signInWithPopup(provider);
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const { signInUser, forgotPassword } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) signInUser(email, password);
  };

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email)
      forgotPassword(email).then(() => {
        emailRef.current.value = "";
      });
  };

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}

      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="m-auto bg-green p-3 rounded-full w-[75px]">
          <RiChatSmile3Fill size={50} className='text-headerText m-auto'/>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-headerText">
            Shack Chat
          </h2>
        </div>

        <div className=" sm:mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-background py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            <div className="">
              <div>
                <div>
                  <div className="flex justify-center">
                  <p className="text-sm font-medium text-slate-300 text-center">
                    Sign in with
                  </p>
                  </div>

                  <div className="mt-1 grid grid-cols-3 gap-3">
                    <div>
                      <button
                        type="button"
                        onClick={signInWithGoogle}
                        className="inline-flex w-full justify-center rounded-md border border-gray-500 bg-input py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-900"
                      >
                        <span className="sr-only">Sign in with Google</span>
                        <AiFillGoogleCircle size={20} className="text-green" />
                      </button>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={signInWithFacebook}
                        className="inline-flex w-full justify-center rounded-md border border-gray-500 bg-input py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-900"
                      >
                        <span className="sr-only">Sign in with Facebook</span>
                        <BsFacebook size={20} className="text-green" />
                      </button>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={signInWithGithub}
                        className="inline-flex w-full justify-center rounded-md border border-gray-500 bg-input py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-900"
                      >
                        <span className="sr-only">Sign in with GitHub</span>
                        <AiFillGithub size={20} className="text-green" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-500" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-2 text-slate-300">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        ref={emailRef}
                        autoComplete="email"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green focus:outline-none focus:ring-google sm:text-sm bg-input text-slate-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        ref={passwordRef}
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-500 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green focus:outline-none focus:ring-google sm:text-sm bg-input text-slate-300"
                      />
                    </div>
                  </div>

                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-500 text-google focus:ring-google"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <div
                        onClick={forgotPasswordHandler}
                        className="font-medium text-google hover:text-indigo-500"
                      >
                        Forgot your password?
                      </div>
                    </div>
                  </div> */}

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-green py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
