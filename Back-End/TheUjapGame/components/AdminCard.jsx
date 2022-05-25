import React, {useState} from 'react'
import Image from 'next/image'
//images
import townHall from "../public/img/town hall.png"
//styles
import styles from "../styles/components/AdminCard.module.scss"

export default function AdminCard({nftGame, nftMarketPlace}) {

  return (
    <div className={styles.adminCard}>
      <div className={styles.hall}>
        <Image src={townHall} alt="academy" width={200} height={180}/>
      </div>
      <div className={styles.game}>
        <p>Total de Freshers en el Juego</p>
        <span>
          {nftGame}
        </span>
      </div>  
      <div className={styles.market}>
        <p>Total de Freshers en el Market</p>
        <span>
          {nftMarketPlace}
        </span>
      </div>  
    </div>
  )
}