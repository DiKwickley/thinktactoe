import Link from "next/link";
import { Layout } from "./../components/Layout";

export default function Home() {
  return (
    <Layout title="home">
      <Link href="/room">
        <button>Play</button>
      </Link>
    </Layout>
  );
}
