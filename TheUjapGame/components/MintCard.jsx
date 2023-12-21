import React, { useEffect } from "react";
import Image from "next/image";
//components
import { Button } from "../components/";
//styles
import styles from "../styles/components/MintCard.module.scss";
//images
import school from "../public/img/school.png";
//icons
import { IoSchoolOutline } from "react-icons/io5";

import { useAdminContract } from "../hooks";

export default function MintCard({ freshers, mintNft }) {
  const  {loadNftPrice,nftPrice} = useAdminContract()
  // Default Mint price
  useEffect(()=>{
    loadNftPrice()
  },[nftPrice])

  return (
    <div className={styles.card}>
      <div className={styles.school}>
        <Image src={school} alt="school" width={200} height={180} />
      </div>
      <div className={styles.mint}>
      <p className={styles.price}> <b>Precio de Minteo</b>: <br /> <span className={styles.price_number}>{nftPrice}</span> UJG</p>
        <Button onClick={() => mintNft()}>
          <IoSchoolOutline className={styles.icon} />
          <span>Mint</span>
        </Button>
      </div>
      <div className={styles.students}>
        <p>Estudiantes Actuales</p>
        <span>{freshers}</span>
      </div>
    </div>
  );
}
