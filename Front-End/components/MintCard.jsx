import React from 'react'
import Image from 'next/image'
//components
import { Button } from '../components/'
//styles
import styles from "../styles/components/MintCard.module.scss"
//images
import school from "../public/img/school.png"
//icons
import { IoSchoolOutline } from 'react-icons/io5'

export default function MintCard({freshers, mintPrice = 0}) {
  return (
    <div className={styles.card}>
      <div className={styles.school}>
        <Image src={school} alt="school" width={200} height={180}/>
      </div>
      <div className={styles.mint}>
        <p className={styles.price}> <b>Mint Price</b>: <br /> <span className={styles.price_number}>{mintPrice}</span> UJG</p>
        <Button>
          <IoSchoolOutline className={styles.icon} />
          <span>Mint</span>
        </Button>
      </div>
      <div className={styles.students}>
        <p>Current Students</p>
        <span>
          {freshers}
        </span>
      </div>     
    </div>
  )
}