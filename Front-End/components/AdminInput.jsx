import React, { useState} from 'react';
import { Button } from './'
//styles
import styles from "../styles/components/AdminInput.module.scss"

export default function AdminInput ( { name } ) {
  const [value, setValue] = useState(0)
  return (
    <div className={styles.container}>
        <label htmlFor={name}>{name}</label>
        <input type="number" value={value} placeholder='0' name={name} id={name} onChange={(e) => setValue(e.target.value)}/>
        <div className={styles.button}>
            <Button>{name}</Button>
        </div>
    </div>
  )
}
