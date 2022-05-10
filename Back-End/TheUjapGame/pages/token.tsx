import Head from "next/head";
//components
import { Title, SwapCard, CurrencyCard } from "../components";
// styles
import styles from "../styles/views/token.module.scss";
// custom hook
import { useToken, useUserInfo } from "../hooks";
import { useEffect } from "react";
// moralis
import { useMoralis } from "react-moralis";

export default function nft() {
  const { tokenBalance, loadUserInfo } = useUserInfo();
  const { loadTokenInfo, tokenPrice, buyTokens } = useToken();
  const { isAuthenticated } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      loadTokenInfo();
      loadUserInfo();
    }
  }, []);

  console.log(tokenBalance);
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Cambiar Tokens</title>
      </Head>
      <Title>Token</Title>
      <div className={styles.container}>
        <CurrencyCard balance={tokenBalance} />
        <SwapCard price={tokenPrice} action="buy" />
        <SwapCard price={tokenPrice} action="sell" />
      </div>
    </div>
  );
}
