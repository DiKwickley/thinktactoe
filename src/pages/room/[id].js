import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { roomInit } from "./../../../utils/room";
import { Layout } from "../../components/Layout";
import { firestore } from "./../../../utils/firebase";

import { auth } from "./../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
  useDocument,
} from "react-firebase-hooks/firestore";

import { Board } from "../../components/Board";

export default () => {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const { id } = router.query;

  const [game, setGame] = useState(null);

  const [value, loading, error] = useDocument(
    firestore.collection("rooms").doc(id)
  );

  useEffect(() => {
    if (value) {
      console.log(value.data());
      setGame(value.data());
    }
  }, [value]);

  useEffect(() => {
    console.log(game);
  }, [game]);

  useEffect(async () => {
    if (user) {
      let res = await roomInit(id, user);
      console.log(res);
    }
  }, [user]);

  const boardOnChange = async (index) => {
    const tempBoard = [...game.board];
    tempBoard[index] = game.turn ? "x" : "o";

    let roomRef = await firestore.collection("rooms");

    await roomRef.doc(id).set({ ...game, board: tempBoard, turn: !game.turn });
  };

  return (
    <Layout title={`Room | ${id}`}>
      {user ? (
        game ? (
          <div>
            email: {user.email}
            <div>id: {id}</div>
            <Board
              board={game.board}
              turn={game.turn}
              player={user.uid === game.player1.uid ? true : false}
              boardOnChange={boardOnChange}
            />
          </div>
        ) : (
          "loading"
        )
      ) : (
        <div>Please login</div>
      )}
    </Layout>
  );
};
