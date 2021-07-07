import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

import { auth } from "./../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { userInit } from "./../utils/user";

export const Nav = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await auth.signInWithPopup(provider);

    if (res.additionalUserInfo.isNewUser) {
      const { user } = res;

      userInit(user);
    }
  };

  return (
    <div>
      <section>
        {user ? (
          <div>
            logged in as {user.displayName}
            <button
              onClick={() => {
                auth.signOut();
              }}
            >
              Signout
            </button>
          </div>
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
      </section>
    </div>
  );
};
