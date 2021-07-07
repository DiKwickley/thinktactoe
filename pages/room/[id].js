import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { roomInit } from "./../../utils/room";
import { Layout } from "../../components/Layout";

import { auth } from "./../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default () => {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user) {
      roomInit(id, user);
    }
  }, [user]);

  return <Layout> {user ? <div>{id}</div> : "pplease login"}</Layout>;
};
