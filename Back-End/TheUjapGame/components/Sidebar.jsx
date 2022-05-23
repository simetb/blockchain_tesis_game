import React from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import styles from "../styles/components/Sidebar.module.scss";
import {IoIdCardOutline, IoStorefrontOutline, IoHomeOutline} from 'react-icons/io5';
import {MdOutlineQuiz, MdAdminPanelSettings} from 'react-icons/md';
import {RiCoinsLine} from 'react-icons/ri';
import { useAdminContract } from '../hooks';

export default function Sidebar( {setActive, active} ) {
  const router = useRouter();
  const {isAdmin} = useAdminContract();
  // test var
  return (
    <aside className={active ? styles.activeSidebar : styles.sidebar}>
      <nav>
        <ul>
          <Link href='/' passHref>
            <li onClick={() => setActive(!active)} className={router.pathname == "/" ? styles.active : ""}>
              <IoHomeOutline className={styles.icon}/>
              <span>
                Home
              </span>
            </li>
          </Link>
          {/* The admin view only showing when isAdmin is true */}
          { isAdmin && <Link href='/admin' passHref>
            <li onClick={() => setActive(!active)} className={router.pathname == "/admin" ? styles.active: ""}>
              <MdAdminPanelSettings className={styles.icon}/>
              <span>
                administrador
              </span>
            </li>
          </Link>}
          <Link href='/freshers' passHref>
            <li onClick={() => setActive(!active)} className={router.pathname == "/freshers" ? styles.active: ""}>
              <IoIdCardOutline className={styles.icon}/>
              <span>
                freshers
              </span>
            </li>
          </Link>
          <Link href='/marketplace' passHref>
            <li onClick={() => setActive(!active)} className={router.pathname == "/marketplace" ? styles.active: ""}>
              <IoStorefrontOutline className={styles.icon}/>
              <span>
                Marketplace
              </span>
            </li>
          </Link>
          <Link href='/play' passHref>
            <li onClick={() => setActive(!active)} className={router.pathname == "/play" ? styles.active: ""}>
              <MdOutlineQuiz className={styles.icon}/>
              <span>
                Take a Test
              </span>
            </li>
          </Link>
          <Link href='/token' passHref>
            <li onClick={() => setActive(!active)} className={router.pathname == "/token" ? styles.active: ""}>
              <RiCoinsLine className={styles.icon}/>
              <span>
                Token
              </span>
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  )
}