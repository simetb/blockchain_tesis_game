import React from 'react';
// icons
import {IoGift, IoTrash, IoPricetags} from 'react-icons/io5';
//styles
import styles from "../styles/components/OptionsMenu.module.scss";

// This component triggers the actions of GIFT, BURN AND SELL NFT
export default function OptionsMenu({isInMarket}) {

  if( isInMarket){
    return (
      <div className={styles.option} >
        <IoGift /> 
        <IoTrash />
        <IoPricetags style={{color: '#F32424'}}/>
      </div>
    )
  }else{
    return (
      <div className={styles.option} >
        <IoGift /> 
        <IoTrash />
        <IoPricetags />
      </div>
    )
  }

}