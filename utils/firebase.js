import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

var config = {
  apiKey: "AIzaSyABfFEQX9xN972lD4yfD-3-VF-eNn2UL00",
  authDomain: "thinktactoe-7b6fe.firebaseapp.com",
  projectId: "thinktactoe-7b6fe",
  storageBucket: "thinktactoe-7b6fe.appspot.com",
  messagingSenderId: "30320578734",
  appId: "1:30320578734:web:aba2d15d292c94b87a5d3f",
  measurementId: "G-ZRQD3NT9BM",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
