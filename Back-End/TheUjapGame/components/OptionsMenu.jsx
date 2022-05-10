import React from "react";
// icons
import { IoGift, IoTrash, IoPricetags } from "react-icons/io5";
//styles
import styles from "../styles/components/OptionsMenu.module.scss";

import { useNft, useMarket } from "../hooks";

// This component triggers the actions of GIFT, BURN AND SELL NFT
export default function OptionsMenu({ fresher, isInMarket }) {
  const { transferNft, burnNft } = useNft();
  const { putInMarket, getOutMarket } = useMarket();

  const burn = () => {
    let decision = confirm("are you sure you want to burn the nft?");
    if (decision) {
      burnNft(Number(fresher.id));
    }
  };

  const transfer = () => {
    let address = prompt("Address of the lucky wallet");
    if (address != "") {
      transferNft(address, Number(fresher.id));
    }
  };

  const marketOption = () => {
    if (fresher.market) {
      let value = fresher.id;
      getOutMarket(value);
    } else {
      let price = Number(prompt("Price in UJG"));
      if (price != NaN && price > 0) {
        putInMarket(fresher.id, price);
      } else {
        alert("Price Invalid");
      }
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
