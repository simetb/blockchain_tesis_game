import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
//components
import { MarketCard, MartCard,CornerModal } from "../components";
import { Title } from "../components";
// styles
import styles from "../styles/views/freshers.module.scss";
// Custom Hooks
import { useMarket, useAdminContract } from "../hooks";
// Moralis
import { useMoralis } from "react-moralis";

const Freshers = () => {
  // custom hook {useMarket}
  const { getTotalNftInMarket, infoNfts, successBuy,setSuccessBuy, errorMarket,setErrorMarket, buyNft} = useMarket();

  // Moralis
  const { isAuthenticated } = useMoralis();
  

  const {isAdmin} = useAdminContract()

  // Load Nft in Market
  useEffect(() => {
    getTotalNftInMarket();
  }, []);

  // if the isAdmin value is true, it will be pushed to the main page every single time the component
    // tries to mount
    useEffect(() => {
      isAdmin && Router.push("/"); 
  },[])

  // Load user Nft
  useEffect(() => {
    if (isAuthenticated) {
      getTotalNftInMarket();
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
