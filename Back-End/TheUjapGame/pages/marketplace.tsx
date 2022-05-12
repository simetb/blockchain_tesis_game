import React, { useEffect } from "react";
import Head from "next/head";
//components
import { MarketCard, MartCard,CornerModal } from "../components";
import { Title } from "../components";
// styles
import styles from "../styles/views/freshers.module.scss";
// Custom Hooks
import { useMarket } from "../hooks";
// Moralis
import { useMoralis } from "react-moralis";

const Freshers = () => {
  // Hook Moralis
  const { isAuthenticated } = useMoralis();
  // custom hook {useMarket}
  const { getTotalNftInMarket, loadInfoNfts, infoNfts, successBuy,setSuccessBuy, errorMarket,setErrorMarket, buyNft} = useMarket();

  // Load Nft in Market
  useEffect(() => {
    getTotalNftInMarket();
    loadInfoNfts();
  }, []);

  // Load Nft In Market 
  useEffect(() => {
    if (isAuthenticated) {
      getTotalNftInMarket();
      loadInfoNfts();
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Mercado</title>
      </Head>
      <Title>Mercado</Title>
      <section className={styles.cards}>
        <MartCard freshers={infoNfts.length} />
        {infoNfts.map((infoNfts) => (
          <MarketCard key={infoNfts.id} fresher={infoNfts} buyNft={buyNft}/>
        ))}
      </section>

      {successBuy ? <CornerModal image={1} closeModal={setSuccessBuy} showing={successBuy} title="Mercado" message="Nft Comprado"/> : null}
      {errorMarket ? <CornerModal image={2} closeModal={setErrorMarket} showing={errorMarket} title="Mercado" message="Error en la transaccion"/> : null}
    </div>
  );
};

export default Freshers;
