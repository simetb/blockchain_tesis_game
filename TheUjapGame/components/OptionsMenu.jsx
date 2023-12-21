import React from "react";
// icons
import { IoGift, IoTrash, IoPricetags } from "react-icons/io5";
//styles
import styles from "../styles/components/OptionsMenu.module.scss";

import { useMarket } from "../hooks";

// This component triggers the actions of GIFT, BURN AND SELL NFT
export default function OptionsMenu({ fresher, isInMarket, transferModal, setNftId, burnModal,marketModal}) {

  // Funtion to get out the nft
  // - Requirement
  // - Only the nft owner can execute this function
  const {getOutMarket} = useMarket()

  // Active the burn modal
  const burn = () => {
    burnModal(true)
    setNftId(Number(fresher.id))
  };

  // Active the ransfer modal
  const transfer = () => {
    transferModal(true)
    setNftId(Number(fresher.id))
  };

  // Active the market modal && Get out of market my nft
  const marketOption = () => {
    let value = fresher.id;
    if (fresher.market) {
      getOutMarket(value);
      marketModal(false)
    } else {
      marketModal(true)
      setNftId(value)
    }
  };

  if (isInMarket) {
    return (
      <div className={styles.option}>
        <IoGift onClick={transfer} />
        <IoTrash onClick={burn} />
        <IoPricetags onClick={marketOption} style={{ color: "#F32424" }} />
      </div>
    );
  } else {
    return (
      <div className={styles.option}>
        <IoGift onClick={transfer} />
        <IoTrash onClick={burn} />
        <IoPricetags onClick={marketOption} />
      </div>
    );
  }
}
