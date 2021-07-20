import Link from "next/link";
import React, { useState } from "react";
import { roomInit } from "../../../utils/room";
import { Layout } from "../../components/Layout";

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

export default function Room() {
  const [roomID, setRoomID] = useState("");

  return (
    <Layout title={"Room"}>
      <div className="flex flex-col items-center justify-center min-h-full">
        <div>
          <Link href={`/room/${createRoomID()}`}>
            <div className="text-5xl font-extrabold text-center text-transparent cursor-pointer md:text-9xl bg-clip-text bg-gradient-to-br from-green-400 to-blue-500">
              Create room
            </div>
          </Link>
        </div>
        <div className="my-1 text-2xl font-extrabold text-transparent md:my-3 md:text-6xl bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 ">
          or
        </div>
        <div>
          <div className="text-5xl font-extrabold text-center text-transparent md:text-9xl bg-clip-text bg-gradient-to-br from-green-400 to-blue-500">
            Join room
          </div>
          <div className="flex flex-col items-center">
            <input
              className="px-4 mt-3 text-center border-2 border-black rounded-full outline-none"
              value={roomID}
              onChange={(e) => {
                setRoomID(e.target.value);
              }}
              type="text"
              placeholder="room id"
            />
            {roomID && roomID.length === 20 ? (
              <Link href={`/room/${roomID}`}>
                <img
                  className="h-[30px] m-3 cursor-pointer"
                  src="http://www.clker.com/cliparts/3/W/W/N/T/e/right-black-arrow-md.png"
                />
              </Link>
            ) : (
              roomID && <div className="text-red-700">*invaild room id</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
