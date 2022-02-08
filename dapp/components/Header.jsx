import React from "react";
//Estilos scss
import styles from "../styles/components/Header.module.scss";
//Iconos FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useMoralis } from "react-moralis";

const Header = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();
  if (!isAuthenticated) {
    return (
      <div className={styles.header}>
        <button className={styles.connect} onClick={() => authenticate()}>
          <FontAwesomeIcon icon={faWallet} />
          <span>Conectar</span>
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.header}>
        <button className={styles.connect} disabled>
          <FontAwesomeIcon icon={faWallet} />
          <span>{user.get("username")}</span>
        </button>
      </div>
    );
  }
};

export default Header;
