import React from 'react';
//Estilos scss
import styles from '../styles/components/Header.module.scss';
//Iconos FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
    return (
        <div className={styles.header}>
            <button className={styles.connect}>
                <FontAwesomeIcon icon={faWallet}/>
                <span>Conectar</span>
            </button>
        </div>
    )
}

export default Header;
