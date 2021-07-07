import { firestore } from "./firebase";
import "firebase/firestore";

export const roomInit = async (roomid, user) => {
  let roomRef = await firestore.collection("rooms");

  let room = await roomRef
    .doc(roomid)
    .get()
    .then((doc) => doc);

  if (room.exists) {
    let roomData = await room.data();

    if (user.uid !== roomData.player1.uid) {
      roomRef.doc(roomid).set(
        {
          player2: {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          },
        },
        {
          merge: true,
        }
      );
    }

    return { sucess: true, msg: "joined a room" };
  } else {
    try {
      roomRef.doc(roomid).set({
        board: ["", "", "", "", "", "", "", "", ""],
        player1: {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        player2: null,
        turn: true,
      });
      return { sucess: true, msg: "created a room" };
    } catch (err) {
      return { sucess: false, msg: "some error occured", error: err };
    }
  }
};
