import React from 'react'
//styles
import styles from "../styles/components/Stars.module.scss";
//Icons
import {IoStarOutline, IoStar} from 'react-icons/io5';

export default function Stars( rarity ) {
  return (
    <span className={styles.rarity}>
        {new Array(rarity).fill(null).map(() => (
          // eslint-disable-next-line react/jsx-key
          <IoStar/>
        ))}
        {new Array(3 - rarity).fill(null).map(() => (
          // eslint-disable-next-line react/jsx-key
          <IoStarOutline/>
        ))}
      </span>
  )
}
