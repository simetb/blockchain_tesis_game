import React from 'react'
//styles
import styles from "../styles/components/Balance.module.scss"

export default function Balance( {balance} ) {
  return (
    <div className={styles.module}>
      <span> My UJG </span>
      <span className={styles.balance} >{Number(balance).toFixed(4)}</span>
    </div>
  )
}
