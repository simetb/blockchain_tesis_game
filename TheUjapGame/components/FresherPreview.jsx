import React from "react";
import Image from "next/image";
//components
import { Stars } from "../components/";
//styles
import styles from "../styles/components/FresherPreview.module.scss";
//images
import platform from "../public/img/platform.png";
import baseFresher from "../public/img/fresher.png";

export default function FresherPreview({ fresher }) {

  // Values to show
  let id;
  let name;
  let iq;
  let cheat;
  let level;
  let image;

  // Preventing Null Fresher Error
  try {
    id = fresher.id;
    name = fresher.name;
    iq = fresher.atributes.iq;
    cheat = fresher.atributes.cheat;
    level = fresher.atributes.level;
    image = fresher.image;
  } catch {
    id = "???";
    name = "???";
    iq = "???";
    cheat = "???";
    level = 0;
    image = baseFresher;
  }

  return (
    <div className={styles.preview}>
      <div className={styles.info}>
        <p>
          <b>UID:</b> {id}
        </p>
        <p>
          <b>Nombre:</b> {name}
        </p>
        <p className={styles.intelligence}>
          <b>Iq:</b> {iq}
        </p>
        <p>
          <b>Trampas:</b> {cheat}
        </p>
      </div>
      <div className={styles.rarity}>
        <Stars rarity={level}></Stars>
      </div>
      <div className={styles.platform}>
        <Image src={platform} alt="platform" width={100} height={20} />
      </div>
      <div className={styles.fresher}>
        <Image src={image} alt={fresher.id} width={100} height={100} />
      </div>
    </div>
  );
}
