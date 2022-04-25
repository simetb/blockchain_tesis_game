import React from 'react';

import { Header } from './'
import { Sidebar } from './'
// Styles
import styles from "../styles/components/Layout.module.scss";

const Layout = ({ children }) => {
  return (
  
    <div className={styles.layout}>
        <Header className={styles.header}/>
        <Sidebar/>
        <main>
          {children}
        </main>

    </div>

  );
};

export default Layout;