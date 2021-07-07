import { firestore } from "./firebase";
import "firebase/firestore";

export const userInit = async (user) => {
  let userRef = await firestore.collection("users").doc(user.uid);

  const res = await userRef.set({
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });

  console.log(res);
};
