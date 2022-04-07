import React, { useState } from 'react';
// icons
import {IoGiftOutline, IoGift, IoTrashOutline, IoTrash, IoPricetagsOutline, IoPricetags} from 'react-icons/io5';
//styles
import styles from "../styles/components/OptionsMenu.module.scss";

// This component triggers the actions of GIFT, BURN AND SELL NFT
export default function OptionsMenu() {
  
  const [isHoveringGift, setIsHoveringGift] = useState(false);
  
  const handleMouseOverGift = () => {
    setIsHoveringGift(true);
  };
  
  const handleMouseOutGift = () => {
    setIsHoveringGift(false);
  };

  const [isHoveringTrash, setIsHoveringTrash] = useState(false);

  const handleMouseOverTrash = () => {
    setIsHoveringTrash(true);
  };

  const handleMouseOutTrash = () => {
    setIsHoveringTrash(false);
  };

  const [isHoveringSell, setIsHoveringSell] = useState(false);

  const handleMouseOverSell = () => {
    setIsHoveringSell(true);
  };

  const handleMouseOutSell = () => {
    setIsHoveringSell(false);
  };

  return (
    <div className={styles.option} >
        <span onMouseOver={handleMouseOverGift} onMouseOut={handleMouseOutGift}>
          {isHoveringGift ? <IoGift /> : <IoGiftOutline />}
        </span>
        <span onMouseOver={handleMouseOverTrash} onMouseOut={handleMouseOutTrash}>
          {isHoveringTrash ? <IoTrash /> : <IoTrashOutline />}
        </span>
        <span onMouseOver={handleMouseOverSell} onMouseOut={handleMouseOutSell}>
          {isHoveringSell ? <IoPricetags /> : <IoPricetagsOutline />}
        </span>
      </div>
  )
}