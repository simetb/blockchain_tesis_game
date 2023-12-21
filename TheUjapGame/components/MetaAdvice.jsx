import React, {useState} from 'react'
//icons
import { IoClose } from 'react-icons/io5'
//styles
import styles from "../styles/components/MetaAdvice.module.scss"

export default function MetaAdvice({closeAdvice}) {
  const [animation, setAnimation] = useState(styles.advice)
  function hide () {
    setAnimation(styles.out);
    closeAdvice(false);
  };
  return (
    <div className={animation}>
        Parece que no tienes <a href="https://metamask.io/download/" target="blank">Metamask</a> instalado, haz click en el vínculo y sigue los pasos antes de usar la aplicación
        <span className={styles.close}>
            <IoClose onClick={() => hide()}/>    
        </span>
    </div>
  )
}
