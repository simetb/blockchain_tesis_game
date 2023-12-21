import React from "react";
import { Header } from "./";
import { Sidebar } from "./";
// Styles
import styles from "../styles/components/Layout.module.scss";
import { useState } from "react";

const Layout = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.layout}>
      <Header className={styles.header} setActive={setActive} active={active} />
      <Sidebar setActive={setActive} active={active} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
