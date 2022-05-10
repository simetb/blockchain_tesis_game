import React, { useState, useEffect } from "react";
import Image from "next/image";
//components
import { Button } from "./";
//styles
import styles from "../styles/components/InputModal.module.scss";
//icons
import { IoClose } from "react-icons/io5";
//images
import store from "../public/img/store.png"

export default function CornerModal({
  showing,
  message = "default",
  closeModal,
}) {
  const [animation, setAnimation] = useState(styles.card)
  
  const hide = async (ms) => {
    setAnimation(styles.out);
    await new Promise((r) => setTimeout(r, ms));
    closeModal(!showing);
  };
  
  return (
        <div className={styles.container}>
          <div className={`${animation}`}>
              <p className={styles.title}>Set Price</p>
              <div className={styles.store}>
                <Image src={store} alt="ads" width={180} height={180}/> 
              </div>
              <p className={styles.message}>{message}</p>
              <input type="number" name="price" id="price" />
              <div className={styles.button}>
                <Button>Set Price</Button>
              </div>
              <IoClose className={styles.close} onClick={() => hide(500)} />
          </div>
        </div>
      ) 
  ;
}
