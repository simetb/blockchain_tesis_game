import React, { useEffect, useState } from "react";
import Head from "next/head";
//components
import { MarketCard, MartCard } from "../components";
import { Title } from "../components";
// styles
import styles from "../styles/views/freshers.module.scss";

import { useMarket } from "../hooks";

import { useMoralis } from "react-moralis";

const Freshers = () => {
  const { isAuthenticated } = useMoralis();
  const { getTotalNftInMarket, loadInfoNfts, infoNfts } = useMarket();

  useEffect(() => {
    getTotalNftInMarket();
    loadInfoNfts();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getTotalNftInMarket();
      loadInfoNfts();
    }
  }, [isAuthenticated]);

  console.log(infoNfts);
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Mercado</title>
      </Head>
      <Title>Mercado</Title>
      <section className={styles.cards}>
        <MartCard freshers={infoNfts.length} />
        {infoNfts.map((infoNfts) => (
          <MarketCard key={infoNfts.id} fresher={infoNfts} />
        ))}
      </section>
    </div>
  );
};

export default Freshers;
