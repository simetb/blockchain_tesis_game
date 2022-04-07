// Needed components
import { Layout } from "../components";
// Styles
import "../styles/globals.scss";
// import { MoralisProvider } from "react-moralis";

export default function MyApp({ Component, pageProps }) {
  return (


    // <MoralisProvider
    //   appId="gg6ViGobuRiEcaIQCAwvq7Mc2OmC4087hHilpx9e"
    //   serverUrl="https://yufng00t8jg7.usemoralis.com:2053/server"
    // >


    // This layout component receives <Component as a children>
      <Layout>
        <Component {...pageProps} />
      </Layout>


    // </MoralisProvider>
  );
}

