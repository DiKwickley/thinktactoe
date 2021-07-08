import Link from "next/link";
import { Layout } from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Home">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="text-5xl font-extrabold text-transparent lg:text-9xl bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
          ThinkTacToe
        </div>
        <Link href="/room">
          <button className="text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-[200px] py-1 font-bold mt-5 md:mt-12">
            Play
          </button>
        </Link>
      </div>
    </Layout>
  );
}
