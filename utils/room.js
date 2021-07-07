import { firestore } from "./firebase";
import "firebase/firestore";

export const roomInit = async (roomid, user) => {
  console.log({ user });

  let roomRef = await firestore.collection("rooms").doc(roomid);
  let room = await roomRef.get().then((doc) => doc);

  if (room.exists) {
    let roomData = await room.data();

    if (roomData.player1 === user.uid) return roomData;
    if (roomData.player2 === "") {
      roomRef.set(
        {
          player2: user.uid,
        },
        {
          merge: true,
        }
      );
    }

    return roomData;
  } else {
    roomRef.set({
      board: [],
      player1: user.uid,
      player2: "",
    });
    return null;
  }
};
