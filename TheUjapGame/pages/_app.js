// Needed components
import { Layout } from "../components";
// Styles
import "../styles/globals.scss";
// Moralis Dependencies
import { MoralisProvider } from "react-moralis";

export default function MyApp({ Component, pageProps }) {
  return (

    // This layout component receives <Component as a children>
      <Layout>
        <MoralisProvider
        serverUrl=""
        appId=""
        >
          <Component {...pageProps} />
        </MoralisProvider>
      </Layout>

  );
}

