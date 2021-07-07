import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { roomInit } from "./../../utils/room";
import { Layout } from "../../components/Layout";

import { auth } from "./../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default () => {
  const [user] = useAuthState(auth);
  const [game, setGame] = useState();

  const router = useRouter();
  const { id } = router.query;

  const fetchGame = async () => {
    setGame(await roomInit(id, user));
  };

  useEffect(() => {
    if (user) {
      fetchGame();
    }
  }, [user]);

  useEffect(() => {
    console.log(game);
  }, [game]);

  return <Layout> {user ? <div>{id}</div> : "pplease login"}</Layout>;
};
