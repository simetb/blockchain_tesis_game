import React from "react";
import Image from "next/image";
//components
import { Stars, Button } from "../components/";
//styles
import styles from "../styles/components/MarketCard.module.scss";
//images
import platform from "../public/img/platform.png";

export default function FresherCard({ fresher, buyNft }) {
  let test = () =>{
    console.log("Imhere")
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>ESTUDIANTE</p>
      <div className={styles.buy}>
        <Button onClick={() => buyNft(fresher.idStudent)}>Comprar</Button>
      </div>
      <p className={styles.identity}>CARNET DE IDENTIDAD</p>
      <div className={styles.info}>
        <p>
          <b>UID:</b> {fresher.idStudent}
        </p>
        <p>
          <b>Nombre:</b> {fresher.name}
        </p>
        <p>
          <b>Iq:</b> {fresher.atributes.iq}
        </p>
        <p>
          <b>Trampas:</b> {fresher.atributes.cheat}
        </p>
        <p>
          <b>Precio:</b> {fresher.price} UJG
        </p>
      </div>
      <Stars rarity={fresher.atributes.level}></Stars>
      <div className={styles.platform}>
        <Image src={platform} alt="platform" width={100} height={20} />
      </div>
      <div className={styles.fresher}>
        <Image src={fresher.image} alt={fresher.id} width={100} height={100} />
      </div>
    </div>
  );
}
