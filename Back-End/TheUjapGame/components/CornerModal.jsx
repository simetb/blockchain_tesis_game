import React, { useState, useEffect } from "react";
import Image from "next/image";
//styles
import styles from "../styles/components/CornerModal.module.scss";
//icons
import { IoClose } from "react-icons/io5";
//images
// import mart from "../public/img/mart.png"
import succeed from "../public/img/succeed.gif";
import defeat from "../public/img/defeat.gif";

export default function CornerModal({
  showing,
  image,
  title = "alert",
  message = "default",
  closeModal,
}) {
  const [animation, setAnimation] = useState(styles.card)
  
  const hide = async (ms) => {
    setAnimation(styles.out);
    await new Promise((r) => setTimeout(r, ms));
    closeModal(!showing);
  };

  useEffect(() => setTimeout(() => hide(500), 5000) ,[])
  
  return (
        <div className={`${animation}`}>
            <div className={styles.info}>
                <p className={styles.title}>{title}</p>
                <div className={styles.bar}></div>
                <p className={styles.message}>{message}</p>
            </div>
            <IoClose className={styles.buy} onClick={() => hide(500)} />
            <div className={styles.fresher}>
                {image === 1 ? <Image src={succeed} alt="ads" width={50} height={50}/> : <Image src={defeat} alt="ads" width={50} height={50}/>}
            </div>
        </div>
      ) 
  ;
}
