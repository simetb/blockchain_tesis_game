import React from "react";
//Estilos scss
import styles from "../styles/components/Header.module.scss";
import { useMoralis } from "react-moralis";

const Header = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();
  if (!isAuthenticated) {
    return (
      <div className={styles.header}>
        <button className={styles.connect} onClick={() => authenticate()}>
          {/* icon */}
          <span>Conectar</span>
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.header}>
        <button className={styles.connect} disabled>
          {/* icon */}
          <span>{user.get("username")}</span>
        </button>
      </div>
    );
  }
};

export default Header;
