import React from "react";
import Image from "next/image";
//components
import { Balance } from "../components/";
//images
import bank from "../public/img/bank.png";
//styles
import styles from "../styles/components/CurrencyCard.module.scss";

export default function CurrencyCard({ balance }) {
  // Test value
  return (
    <div className={styles.currencyCard}>
      <div className={styles.bank}>
        <Image src={bank} alt="bank" width={200} height={180} />
      </div>
      <div className={styles.balance}>
        <Balance balance={balance} />
      </div>
    </div>
  );
}
