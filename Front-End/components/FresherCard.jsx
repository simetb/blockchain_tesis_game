import React from 'react';
import Image from 'next/image'
//components
import { OptionsMenu } from '../components/';
//styles
import styles from "../styles/components/FresherCard.module.scss";
//images
import platform from "../public/img/platform.png";
//Icons
import {IoStarOutline, IoStar} from 'react-icons/io5';

export default function FresherCard( { fresher } ) {

  return (
    <div className={styles.card}>
      <p className={styles.title}>
        STUDENT
      </p>
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
      </div>
      <span className={styles.rarity}>
        {new Array(fresher.rarity).fill(null).map(() => (
          // eslint-disable-next-line react/jsx-key
          <IoStar/>
        ))}
        {new Array(3 - fresher.rarity).fill(null).map(() => (
          // eslint-disable-next-line react/jsx-key
          <IoStarOutline/>
        ))}
      </span>
      <div className={styles.platform}>
        <Image src={platform} alt='platform' width={100} height={20}/>
      </div>
      <div className={styles.fresher}>
        <Image src={fresher.img} alt={fresher.id} width={100} height={100}/>
      </div>
      {/* This component triggers the GIFT, BURN AND SELL ACTIONS */}
      <OptionsMenu/>
    </div>
  )
}
