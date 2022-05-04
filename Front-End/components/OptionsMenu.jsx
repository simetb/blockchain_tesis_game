import React from 'react';
// icons
import {IoGift, IoTrash, IoPricetags} from 'react-icons/io5';
//styles
import styles from "../styles/components/OptionsMenu.module.scss";

// This component triggers the actions of GIFT, BURN AND SELL NFT
export default function OptionsMenu() {
  
  return (
    <div className={styles.option} >
      <IoGift /> 
      <IoTrash />
      <IoPricetags />
    </div>
  )
}