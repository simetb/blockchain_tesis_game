import React, { useEffect, useState } from 'react';
//components
import { FresherCard, MintCard } from '../components';
// styles
import styles from "../styles/views/freshers.module.scss";
//
import { useUserInfo } from '../hooks';
  const Freshers = () => {
  const { loadIndexNft,loadNfts,nfts } = useUserInfo()

  return (
    <div className={styles.wrapper}>
      <h2>Freshers</h2>
      <section className={styles.cards}>
        <MintCard freshers={nfts.length}/>
        { nfts.map( nfts => (
          <FresherCard key={ nfts.id } fresher={ nfts } />
        ) ) }
      </section>
      <button onClick={() => loadIndexNft()}>TestIndex</button>
      <button onClick={() => loadNfts()}>Test</button>
    </div>
  );

}

export default Freshers;
