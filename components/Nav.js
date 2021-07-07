import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

import { auth } from "./../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Nav = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
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
