import { firestore } from "./firebase";
import "firebase/firestore";

export const roomInit = async (roomid, user) => {
  console.log({ user });

  let roomRef = await firestore.collection("rooms");
  let userRef = await firestore.collection("users");

  let room = await roomRef
    .doc(roomid)
    .get()
    .then((doc) => doc);

  if (room.exists) {
    let roomData = await room.data();

    if (user.uid != roomData.player1) {
      roomRef.doc(roomid).set(
        {
          player2: user.uid,
        },
        {
          merge: true,
        }
      );
    }

    room = await roomRef
      .doc(roomid)
      .get()
      .then((doc) => doc);

    roomData = await room.data();

    if (roomData.player1 !== "") {
      let p1 = await userRef
        .doc(roomData.player1)
        .get()
        .then((doc) => doc);

      roomData.player1 = await p1.data();
    }

    if (roomData.player2 !== "") {
      let p2 = await userRef
        .doc(roomData.player2)
        .get()
        .then((doc) => doc);

      roomData.player2 = await p2.data();
    }

    return roomData;
  } else {
    roomRef.doc(roomid).set({
      board: [],
      player1: user.uid,
      player2: "",
    });
    room = await roomRef
      .doc(roomid)
      .get()
      .then((doc) => doc);

    roomData = await room.data();

    if (roomData.player1 !== "") {
      let p1 = await userRef
        .doc(roomData.player1)
        .get()
        .then((doc) => doc);

      roomData.player1 = await p1.data();
    }
  }
};
