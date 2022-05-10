import React, { useEffect, useState } from "react";
import Head from "next/head";
//components
import { FresherCard, MintCard } from "../components";
import { Title } from "../components";
// styles
import styles from "../styles/views/freshers.module.scss";

import { useMoralis } from "react-moralis";
import { useUserInfo } from "../hooks";

const Freshers = () => {
  const { loadNfts, nfts, loadIndexNft, indexs } = useUserInfo();
  const { isAuthenticated } = useMoralis();

  useEffect(() => {
    loadIndexNft();
    loadNfts();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadIndexNft();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadNfts();
  }, [indexs]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Mi NFT's</title>
      </Head>
      <Title>Freshers</Title>
      <section className={styles.cards}>
        <MintCard freshers={nfts.length} />
        {nfts.map((nfts) => (
          <FresherCard key={nfts.id} fresher={nfts} />
        ))}
      </section>
    </div>
  );
};

export default Freshers;
