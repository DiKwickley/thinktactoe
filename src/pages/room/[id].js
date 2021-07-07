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
import { PlayeCard } from "../../components/PlayerCard";

export default function PlayRoom() {
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

  useEffect(() => {
    if (user) {
      roomInit(id, user);
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
      <div className="flex flex-col items-center justify-center min-h-full">
        {user ? (
          game ? (
            <div className="flex flex-row items-center justify-center">
              <div className="self-start">
                <PlayeCard user={game.player1} number={1} />
              </div>
              <div>
                <Board
                  board={game.board}
                  turn={game.turn}
                  player={user.uid === game.player1.uid ? true : false}
                  boardOnChange={boardOnChange}
                />
                <div className="text-center">
                  {user.uid === game.player1.uid
                    ? game.turn
                      ? "your turn"
                      : "opponent's turn"
                    : !game.turn
                    ? "your turn"
                    : "opponent's turn"}
                </div>
              </div>
              <div className="self-start">
                <PlayeCard user={game.player2} number={2} />
              </div>
            </div>
          ) : (
            <div className=" h-[300px] flex items-center justify-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 ">
              loading...
            </div>
          )
        ) : (
          <div className=" h-[300px] flex items-center justify-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 ">
            please login...
          </div>
        )}
      </div>
    </Layout>
  );
}
