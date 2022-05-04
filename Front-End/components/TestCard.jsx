import React, {useState} from 'react'
import Image from 'next/image'
//components
import { SelectFresher } from '../components/';
import { FresherPreview } from '../components/'
//images
import academy from "../public/img/academy.png"
//styles
import styles from "../styles/components/TestCard.module.scss"

export default function TestCard( { freshers } ) {

  const [fresher, setFresher] = useState(null);

  return (
    <div className={styles.testCard}>
      <div className={styles.academy}>
        <Image src={academy} alt="academy" width={200} height={180}/>
      </div>
      <SelectFresher freshers={freshers} handleClick={setFresher} />
      <FresherPreview fresher={fresher ? JSON.parse(fresher) : {}} />
    </div>
  )
}