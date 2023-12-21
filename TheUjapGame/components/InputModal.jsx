import React, { useState } from "react";
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
  title = "Title",
  closeModal,
  action,
  type="text"
}) {
  const [animation, setAnimation] = useState(styles.card)
  const [inputValue,setInputValue] = useState("")
  
  const hide = async (ms) => {
    setAnimation(styles.out);
    await new Promise((r) => setTimeout(r, ms));
    closeModal(!showing);
  };
  
  return (
        <div className={styles.container}>
          <div className={`${animation}`}>
              <p className={styles.title}>{title}</p>
              <div className={styles.store}>
                <Image src={store} alt="ads" width={180} height={180}/> 
              </div>
              <p className={styles.message}>{message}</p>
              <input spellCheck="false" autoComplete="off" type={type} name="price" id="price" onChange={(e) =>setInputValue(e.target.value)} />
              <div className={styles.button}>
                <Button onClick={()=> {
                  action(inputValue)
                  hide(500)
                  }}>Aceptar</Button>
              </div>
              <IoClose className={styles.close} onClick={() => hide(500)} />
          </div>
        </div>
      ) 
  ;
}
