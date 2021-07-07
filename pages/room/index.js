import Link from "next/link";
import React, { useState } from "react";
import { roomInit } from "../../utils/room";
import { Layout } from "./../../components/Layout";

function createRoomID(length = 20) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default () => {
  const [roomID, setRoomID] = useState(null);

  return (
    <Layout title={"room"}>
      <div>
        Join room
        <input
          value={roomID}
          onChange={(e) => {
            setRoomID(e.target.value);
          }}
          type="text"
          placeholder="room id"
        />
        {roomID && roomID.length === 20 ? (
          <Link href={`/room/${roomID}`}>
            <button>join</button>
          </Link>
        ) : (
          "invaild room id"
        )}
      </div>
      <br /> <br />
      <div>
        <Link href={`/room/${createRoomID()}`}>
          <button>Generate Random Room</button>
        </Link>
      </div>
    </Layout>
  );
};
