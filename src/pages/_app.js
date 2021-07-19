import "../styles/globals.css";
if (typeof global.navigator === "undefined") global.navigator = {};
// const navigator = {};

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
