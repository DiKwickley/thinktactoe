import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "./../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { userInit } from "./../../utils/user";

export const Nav = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider);

    if (res.additionalUserInfo.isNewUser) {
      const { user } = res;

      userInit(user);
    }
  };

  return (
    <div
      className={`flex flex-row justify-end ${
        router.route !== "/" && "justify-between"
      } m-3`}
    >
      {router.route !== "/" && (
        <Link href="/">
          <div className="text-4xl font-extrabold text-transparent cursor-pointer bg-clip-text bg-gradient-to-br from-[#ffe98a] to-[#ff8c8c]">
            ThinkTacToe
          </div>
        </Link>
      )}
      {user ? (
        <div
          onClick={() => {
            var res = confirm("Do you want to sign out?");
            if (res) {
              auth.signOut();
            }
          }}
          className="flex flex-row items-center justify-center px-3 m-3 border-2 border-black rounded-lg cursor-pointer"
        >
          <img
            className="h-[40px] py-1 rounded-full  mr-2"
            src={user.photoURL}
          />
          {user.displayName}
        </div>
      ) : (
        <div
          onClick={signInWithGoogle}
          className="flex flex-row items-center justify-center pr-3 m-3 border-2 border-black rounded-lg cursor-pointer"
        >
          <img
            className="h-[40px]"
            src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/google/google.png"
          />
          Google
        </div>
      )}
    </div>
  );
};
