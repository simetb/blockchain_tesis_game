import React from 'react'
import Image from 'next/image'
//components
import { Stars } from '../components/';
//styles
import styles from "../styles/components/FresherPreview.module.scss"
//images
import platform from "../public/img/platform.png";
import baseFresher from "../public/img/fresher.png";

export default function FresherPreview( { fresher } ) {
  return (
    <div className={styles.preview} >
        <div className={styles.info}>
            <p>
                <b>UID:</b> {fresher.id ? fresher.id : '?'}
            </p>
            <p>
                <b>Name:</b> {fresher.name ? fresher.name : '?'}
            </p>
            <p>
                <b>Iq:</b> {fresher.iq ? fresher.iq : '?'}
            </p>
            <p>
                <b>Cheats:</b> {fresher.cheats ? fresher.cheats : '?'}
            </p>
      </div>
      <div className={styles.rarity}>
        <Stars rarity={fresher.rarity ? fresher.rarity : 0}></Stars>
      </div>
      <div className={styles.platform}>
        <Image src={platform} alt='platform' width={100} height={20}/>
      </div>
      <div className={styles.fresher}>
        <Image src={fresher.img ? fresher.img : baseFresher} alt={fresher.id} width={100} height={100}/>
      </div>
    </div>
  )
}
