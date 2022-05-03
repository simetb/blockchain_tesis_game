import Head from "next/head";
//components
import { Title, SwapCard, CurrencyCard } from '../components';
// styles
import styles from "../styles/views/token.module.scss";

export default function nft() {
  return (
    <div className="wrapper">
      <Head>
        <title>Freshers - Swap Tokens</title>
      </Head>
      <Title>Token</Title>
      <div className="container">
        <CurrencyCard/>
        <SwapCard price={5} action="buy"/>
        <SwapCard price={5} action="sell"/>
      </div>
    </div>
  )
}
