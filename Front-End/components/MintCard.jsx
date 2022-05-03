import React from 'react'
import Image from 'next/image'
//components
import { Counter } from '../components/';
import { Button } from '../components/'
//styles
import styles from "../styles/components/MintCard.module.scss"
//images
import school from "../public/img/school.png"
//icons
import { IoSchoolOutline } from 'react-icons/io5'

export default function MintCard({freshers}) {
  return (
    <div className={styles.card}>
      <div className={styles.school}>
        <Image src={school} alt="school" width={200} height={180}/>
      </div>
      <div className={styles.mint}>
        <Counter/>
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