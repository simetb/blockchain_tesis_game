import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
//Styles
import styles from "../styles/components/Header.module.scss";
//components
import { Button } from "../components/";
//Icons
import { IoWalletOutline } from "react-icons/io5";
import { ImMenu3, ImMenu4 } from "react-icons/im";
//assets
import logo from "../public/img/logo.png";

import { useMoralis } from "react-moralis";

const Header = ({ setActive, active }) => {
  
  // Moralis Hooks
  const { authenticate, isAuthenticated, logout } = useMoralis();

  // Login with Moralis
  const login = () => {
    if (!isAuthenticated) {
      authenticate("Linking with the app");
      Router.push("/")
    }
  };

  const exit = () =>{
    logout()
    Router.push("/")
  }

  // Mapp the user status
  useState(() => {
    authenticate("Linking with the app")
  }, []);

  if (!isAuthenticated) {
    return (
      <div className={styles.header}>
        {active ? (
          <ImMenu4 onClick={() => setActive(!active)} className={styles.menu} />
        ) : (
          <ImMenu3 onClick={() => setActive(!active)} className={styles.menu} />
        )}
        <div className={styles.logo}>
          <Link href="/" passHref>
            <a>
              <Image src={logo} alt="Dapp Logo" width={160} height={65} />
            </a>
          </Link>
        </div>
        <Button onClick={login}>
          <IoWalletOutline className={styles.icon} />
          <span>Conectar</span>
        </Button>
      </div>
    );
  } else {
    return (
      <div className={styles.header}>
        {active ? (
          <ImMenu4 onClick={() => setActive(!active)} className={styles.menu} />
        ) : (
          <ImMenu3 onClick={() => setActive(!active)} className={styles.menu} />
        )}
        <div className={styles.logo}>
          <Link href="/" passHref>
            <a>
              <Image src={logo} alt="Dapp Logo" width={160} height={65} />
            </a>
          </Link>
        </div>
        <Button onClick={exit}>
          <IoWalletOutline className={styles.icon} />
          <span>Desconectar</span>
        </Button>
      </div>
    );
  }
};

export default Header;
