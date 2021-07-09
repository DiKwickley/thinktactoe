import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { roomInit } from "./../../../utils/room";
import { roomReset } from "./../../../utils/room";
import { Layout } from "../../components/Layout";
import { firestore } from "./../../../utils/firebase";
import { findWinner } from "./../../../utils/winner";
import { auth } from "./../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

import { Board } from "../../components/Board";
import { PlayeCard } from "../../components/PlayerCard";

export default function PlayRoom(props) {
  console.log(props.children);

  const [user] = useAuthState(auth);
  const [peer, setPeer] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const callInstance = useRef(null);

  const [game, setGame] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [call, setCall] = useState(false);

  const [value, loading, error] = useDocument(
    firestore.collection("rooms").doc(id)
  );

  useEffect(() => {
    const fn = async () => {
      const PeerJs = (await import("peerjs")).default;
    };
    fn();
  }, []);

  useEffect(() => {
    if (user) {
      const peer = new Peer(user.uid);
      setPeer(peer);

      peer.on("open", (id) => {
        console.log({ id });
      });

      peer.on("call", (call) => {
        setCall(true);
        var getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, async (mediaStream) => {
          currentUserVideoRef.current.srcObject = await mediaStream;
          currentUserVideoRef.current.play();

          call.on("close", () => {
            console.log("Close fired");
            setCall(false);
            call.close();
          });

          call.on("error", (err) => {
            console.log({ err });
          });

          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        });
      });
      peerInstance.current = peer;
    }
  }, [user]);

  useEffect(() => {
    if (value) {
      setGame(value.data());
    }
  }, [value]);

  useEffect(() => {
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
    }
  }, [game]);

  useEffect(() => {
    if (user) {
      roomInit(id, user);
    }
  }, [user]);

  const connectCall = (remotePeerId) => {
    setCall(true);
    console.log(remotePeerId);
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, async (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = await peerInstance.current.call(remotePeerId, mediaStream);

      callInstance.current = call;

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

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
                  call={call}
                  ref={currentUserVideoRef}
                />
              </div>
              <div className="my-4 text-center">
                <Board
                  board={game.board}
                  turn={game.turn}
                  player={user.uid === game.player1.uid ? true : false}
                  boardOnChange={boardOnChange}
                  gameOver={gameOver}
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

                {game?.player1 && game?.player2 && !call && (
                  <button
                    onClick={() => {
                      connectCall(
                        user.uid === game.player1.uid
                          ? game.player2.uid
                          : game.player1.uid
                      );
                    }}
                    className="px-3 py-1 mb-3 font-bold text-white rounded-full bg-gradient-to-r  from-[#008d8c] to-[#95dd7d]"
                  >
                    Start Video Call
                  </button>
                )}

                {/* {game?.player1 && game?.player2 && call && (
                  <button
                    onClick={() => {
                      disconnectCall();
                    }}
                    className="px-3 py-1 mb-3 font-bold text-white rounded-full bg-gradient-to-r  from-[#dc1c13] to-[#f1959b]"
                  >
                    Disconnect
                  </button>
                )} */}
              </div>
              <div className="self-start">
                <PlayeCard
                  user={
                    user.uid !== game.player1.uid ? game.player1 : game.player2
                  }
                  number={user.uid === game.player1.uid ? 2 : 1}
                  call={call}
                  ref={remoteVideoRef}
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
