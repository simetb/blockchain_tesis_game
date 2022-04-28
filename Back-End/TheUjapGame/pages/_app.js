// Needed components
import { Layout } from "../components";
// Styles
import "../styles/globals.scss";
// Moralis Dependencies
import { MoralisProvider } from "react-moralis";


export default function MyApp({ Component, pageProps }) {
  return (

    // This layout component receives <Component as a children>
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      appId={process.env.NEXT_PUBLIC_APP_ID}
    >  
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </MoralisProvider>

  );
}

