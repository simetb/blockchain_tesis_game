import React, { useState } from 'react';
//styles
import styles from "../styles/components/Counter.module.scss";
// icons
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

export default function Counter() {

  const [count, setCount] = useState(1);

  const increase = () => {
    setCount(c => c + 1);
  };
  const decrease = () => {
    setCount(c => Math.max(c - 1, 1));
  };

  return (
    <div className={styles.container}>
      <p>Minting {count} Students</p>
      <div className={styles.select}>
        <button onClick={decrease}>
          <BiLeftArrow className={styles.icons} />
        </button>
        <span id='numberCounter'>
          {count}
        </span>
        <button onClick={increase}>
          <BiRightArrow className={styles.icons} />
        </button>
      </div>
    </div>
  )
}
