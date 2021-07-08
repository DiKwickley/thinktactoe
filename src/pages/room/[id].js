import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { roomInit } from "./../../../utils/room";
import { roomReset } from "./../../../utils/room";
import { Layout } from "../../components/Layout";
import { firestore } from "./../../../utils/firebase";
import { findWinner } from "./../../../utils/winner";
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
  const [gameOver, setGameOver] = useState(false);

  const [value, loading, error] = useDocument(
    firestore.collection("rooms").doc(id)
  );

  useEffect(() => {
    if (value) {
      // console.log(value.data());
      setGame(value.data());
    }
  }, [value]);

  useEffect(() => {
    // console.log(game);
    if (game) {
      var splitBoard = [
        game.board.slice(0, 3),
        game.board.slice(3, 6),
        game.board.slice(6, 9),
      ];
      var result = findWinner(splitBoard, 3);
      if (result.winnerDetected) {
        setGameOver(result);
      }
      clearScore(game);
      // console.log(result);
    }
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

  const clearGame = async () => {
    let res = await roomReset(id);
  };

  const clearScore = async (game) => {
    if (game.board.join("") === "") {
      setGameOver(false);
    }
  };

  return (
    <Layout title={`Room | ${id}`}>
      <div className="flex flex-col items-center justify-center min-h-full">
        {user ? (
          game ? (
            <div className="flex flex-col items-center justify-center mt-14 md:flex-row">
              <div className="self-start">
                <PlayeCard
                  user={
                    user.uid === game.player1.uid ? game.player1 : game.player2
                  }
                  number={user.uid === game.player1.uid ? 1 : 2}
                />
              </div>
              <div className="my-4">
                <Board
                  board={game.board}
                  turn={game.turn}
                  player={user.uid === game.player1.uid ? true : false}
                  boardOnChange={boardOnChange}
                />
                <div className="text-center">
                  {gameOver === false ? (
                    user.uid === game.player1.uid ? (
                      game.turn ? (
                        "your turn"
                      ) : (
                        "opponent's turn"
                      )
                    ) : !game.turn ? (
                      "your turn"
                    ) : (
                      "opponent's turn"
                    )
                  ) : (
                    <div>
                      <div>
                        {gameOver.type === "draw game" ? (
                          <div>Game was Draw </div>
                        ) : gameOver.winnerSymbol === "x" ? (
                          <div>{game.player1.name} won </div>
                        ) : (
                          <div>{game.player2.name} won </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center py-2">
                  {gameOver !== false && user.uid === game.player1.uid && (
                    <button
                      onClick={clearGame}
                      className="px-3 py-1 font-bold text-white rounded-full bg-gradient-to-r  from-[#ffe98a] to-[#ff8c8c]"
                    >
                      Clear Board
                    </button>
                  )}
                </div>
              </div>
              <div className="self-start">
                <PlayeCard
                  user={
                    user.uid === game.player2.uid ? game.player1 : game.player2
                  }
                  number={user.uid === game.player2.uid ? 1 : 2}
                />
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
