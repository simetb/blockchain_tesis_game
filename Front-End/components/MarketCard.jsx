import React from 'react';
import Image from 'next/image'
//components
import { Stars, Button } from '../components/';
//styles
import styles from "../styles/components/MarketCard.module.scss";
//images
import platform from "../public/img/platform.png";


export default function FresherCard( { fresher } ) {

  return (
    <div className={styles.card}>
      <p className={styles.title}>
        STUDENT
      </p>
      <div className={styles.buy}>
        <Button>Buy</Button>
      </div>
      <p className={styles.identity}>IDENTITY CARD</p>
      <div className={styles.info}>
        <p>
          <b>UID:</b> {fresher.id}
        </p>
        <p>
          <b>Name:</b> {fresher.name}
        </p>
        <p>
          <b>Iq:</b> {fresher.iq}
        </p>
        <p>
          <b>Cheats:</b> {fresher.cheats}
        </p>
        <p>
          <b>Price:</b> {fresher.value} UJG
        </p>
      </div>
      <Stars rarity={fresher.rarity}></Stars>
      <div className={styles.platform}>
        <Image src={platform} alt='platform' width={100} height={20}/>
      </div>
      <div className={styles.fresher}>
        <Image src={fresher.img} alt={fresher.id} width={100} height={100}/>
      </div>
    </div>
  )
}
