import React from 'react'
//styles
import styles from "../styles/components/Stars.module.scss";
//Icons
import {IoStarOutline, IoStar} from 'react-icons/io5';

export default function Stars( {rarity} ) {
  if( rarity === 1) {
    return (
      <span className={styles.rarity}>
        <IoStar/>
        <IoStarOutline/>
        <IoStarOutline/>
      </span>
    )
 }else if ( rarity === 2 ) {
   return(
    <span className={styles.rarity}>
        <IoStar/>
        <IoStar/>
        <IoStarOutline/>
      </span>
   )
  } else if (rarity === 3){
    return(
      <span className={styles.rarity}>
          <IoStar/>
          <IoStar/>
          <IoStar/>
        </span>
     )
  } else{
    return(
      <span className={styles.rarity}>
          <IoStarOutline/>
          <IoStarOutline/>
          <IoStarOutline/>
        </span>
    )
  }
  
}
