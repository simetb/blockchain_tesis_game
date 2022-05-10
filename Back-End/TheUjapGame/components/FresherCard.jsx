import React from "react";
import Image from "next/image";
//components
import { OptionsMenu } from "../components/";
import { Stars } from "../components/";
//styles
import styles from "../styles/components/FresherCard.module.scss";
//images
import platform from "../public/img/platform.png";

export default function FresherCard({ fresher }) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>ESTUDIANTE</p>
      <p className={styles.identity}>CARNET DE IDENTIDAD</p>
      <div className={styles.info}>
        <p>
          <b>UID:</b> {fresher.id}
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
      </div>
      <Stars rarity={fresher.atributes.level}></Stars>
      <div className={styles.platform}>
        <Image src={platform} alt="platform" width={100} height={20} />
      </div>
      <div className={styles.fresher}>
        <Image src={fresher.image} alt={fresher.id} width={100} height={100} />
      </div>
      {/* This component triggers the GIFT, BURN AND SELL ACTIONS */}
      <OptionsMenu fresher={fresher} isInMarket={fresher.market} />
    </div>
  );
}
