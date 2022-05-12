import React from "react";
import Image from "next/image";
//styles
import styles from "../styles/components/MartCard.module.scss";
//images
import mart from "../public/img/mart.png";

export default function MintCard({ freshers }) {
  return (
    <div className={styles.card}>
      <div className={styles.school}>
        <Image src={mart} alt="school" height={180} />
      </div>
      <div className={styles.students}>
        <p>Total de Freshers en el mercado</p>
        <span>{freshers}</span>
      </div>
    </div>
  );
}
