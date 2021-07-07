import Link from "next/link";
import { Layout } from "../components/Layout";

export default function Home() {
  return (
    <Layout title="home">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="font-extrabold text-transparent text-9xl bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
          ThinkTacToe
        </div>
        <Link href="/room">
          <button className="text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full w-[200px] py-1 font-bold mt-12">
            Play
          </button>
        </Link>
      </div>
    </Layout>
  );
}
