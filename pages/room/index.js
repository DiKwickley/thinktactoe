import Link from "next/link";
import React from "react";
import { Layout } from "./../../components/Layout";

export default () => {
  return (
    <Layout title={"room"}>
      <div>
        Join room
        <input type="text" placeholder="room id" />
      </div>
      <br /> <br />
      <div>
        <Link href="/room">
          <button>Generate Random Room</button>
        </Link>
      </div>
    </Layout>
  );
};
