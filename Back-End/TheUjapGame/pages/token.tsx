import Head from "next/head";
//components
import { Title, SwapCard, CurrencyCard, CornerModal} from "../components";
// styles
import styles from "../styles/views/token.module.scss";
// custom hook
import { useToken, useUserInfo } from "../hooks";
import { useEffect } from "react";
// moralis
import { useMoralis } from "react-moralis";


export default function nft() {
  // Custom Hook {useUserInfo}
  const { tokenBalance, loadUserInfo } = useUserInfo();
  // Custom Hook {useToken}
  const { loadTokenInfo, tokenPrice,setSuccessSell, successSell,setSuccessBuy,successBuy, buyTokens, sellTokens, error, setError} = useToken();
  // Moralis Hook
  const { isAuthenticated } = useMoralis();

  // Mapping and getting the info from the token
  // Liquidity, TokenPool, Price, User Balance
  useEffect(() => {
    if (isAuthenticated) {
      loadTokenInfo();
      loadUserInfo();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Cambiar Tokens</title>
      </Head>
      <Title>Token</Title>
      <div className={styles.container}>
        <CurrencyCard balance={tokenBalance} />
        <SwapCard price={tokenPrice} action="buy" buyTokens={buyTokens} sellTokens={sellTokens} />
        <SwapCard price={tokenPrice} action="sell" sellTokens={sellTokens} buyTokens={buyTokens} />
      </div>
      {successBuy ? <CornerModal image={1} closeModal={setSuccessBuy} showing={successBuy} title="Token" message="Tokens Comprados"/> : null}
      {successSell ? <CornerModal image={1} closeModal={setSuccessSell} showing={successSell} title="Token" message="Tokens Vendidos"/> : null}
      {error ? <CornerModal image={2} closeModal={setError} showing={error} title="Token" message="Error en la transaccion"/> : null}
    </div>
  );
}
