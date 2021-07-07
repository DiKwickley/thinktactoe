import Link from "next/link";
import { Layout } from "../components/Layout";

export default function Home() {
  return (
    <Layout title="home">
      <div className="text-red-700">Hello world</div>
      <Link href="/room">
        <button>Play</button>
      </Link>
    </Layout>
  );
}
