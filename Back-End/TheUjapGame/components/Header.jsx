import React, { useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
//Styles
import styles from "../styles/components/Header.module.scss";
//Icons
import { IoWalletOutline } from 'react-icons/io5';
//assets
import logo from '../public/img/logo.png';
// Moralis
import { useMoralis } from "react-moralis";

const Header =  () => {

  const { authenticate, isAuthenticated, logout, account} = useMoralis();
 
  const login = () =>{
    if(!isAuthenticated){
      authenticate({ signingMessage: "Authorize linking of your wallet" })
    }
  }

  const logOut = () =>{
    if(isAuthenticated){
      logout();
    }
  }

  if(!isAuthenticated){
    return (
      <div className={styles.header}>
        <Link href='/' passHref>
          <Image className={styles.logo} src={logo} alt="Dapp Logo" width={160} height={65}/>
        </Link>
        <button onClick={login} className={styles.connect}>
          <IoWalletOutline className={styles.icon} />
          <span>Connect</span>
        </button>
      </div>
    );
  }
  else{
    return (
      <div className={styles.header}>
        <Link href='/' passHref>
          <Image className={styles.logo} src={logo} alt="Dapp Logo" width={160} height={65}/>
        </Link>
        <button onClick={logOut} className={styles.connect}>
          <IoWalletOutline className={styles.icon} />
          <span>Working</span>
        </button>
      </div>
    );
  }


};

export default Header;
