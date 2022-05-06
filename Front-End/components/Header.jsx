import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
//Styles
import styles from "../styles/components/Header.module.scss";
//components
import { Button } from '../components/'
//Icons
import { IoWalletOutline } from 'react-icons/io5';
import { ImMenu3, ImMenu4 } from 'react-icons/im';
//assets
import logo from '../public/img/logo.png';

const Header = ( {setActive, active} ) => {    

    return (
      <div className={styles.header}>

        {active ? <ImMenu4 onClick={() => setActive(!active)} className={styles.menu} /> : <ImMenu3 onClick={() => setActive(!active)} className={styles.menu} />}

        <div className={styles.logo}>
          <Link href='/' passHref>
            <a>
              <Image src={logo} alt="Dapp Logo" width={160} height={65}/>
            </a>
          </Link>
        </div>
        <Button>
          <IoWalletOutline className={styles.icon} />
          <span>Connect</span>
        </Button>
      </div>
    );
};

export default Header;
