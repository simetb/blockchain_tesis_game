import React from "react";
import Image from "next/image";
import Link from "next/link";
//Styles
import styles from "../styles/components/Header.module.scss";
//components
import { Button } from '../components/'
//Icons
import { IoWalletOutline } from 'react-icons/io5';
//assets
import logo from '../public/img/logo.png';

const Header = () => {
    return (
      <div className={styles.header}>
        <Link href='/' passHref>
          <a>
            <Image className={styles.logo} src={logo} alt="Dapp Logo" width={160} height={65}/>
          </a>
        </Link>
        <Button>
          <IoWalletOutline className={styles.icon} />
          <span>Connect</span>
        </Button>
      </div>
    );
};

export default Header;
