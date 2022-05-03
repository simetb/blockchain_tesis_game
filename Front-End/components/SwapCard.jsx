import React, { useState } from 'react';
//styles
import styles from "../styles/components/SwapCard.module.scss"

export default function SwapCard( {action, price} ) {
  const [total, setTotal] = useState(0)
  const [amount, setAmount] = useState(0)

  const changeTotal = (e) => {
    setAmount(e.target.value);
    setTotal(e.target.value * price);
  }

  const changeAmount = (e) => {
      setTotal(e.target.value);
      setAmount(e.target.value / price);
  }

  if(action === "buy") {
    return (
      <form className={styles.swapCard}>
        <h3>Buy Token</h3>
        <label htmlFor="from">Eth</label>
        <input type="number" value={amount} onChange={changeTotal} name="from" id="from" placeholder='0.0'/>
        <label htmlFor="to">Token</label>
        <input type="number" value={total} onChange={changeAmount} name="to" id="to" />
        <span>Price: {price} Eth</span>
        <input type="button" value="Buy Token" />
      </form>
    )
  }else{
    return (
      <form className={styles.swapCard}>
        <h3>Sell Token</h3>
        <label htmlFor="from">Token</label>
        <input type="number" value={amount} onChange={changeTotal} name="from" id="from" placeholder='0.0'/>
        <label htmlFor="to">Eth</label>
        <input type="number" value={total} onChange={changeAmount} name="to" id="to" />
        <span>Price: {price} Eth</span>
        <input type="button" value="Sell Token" />
      </form>
    )
  }
  
}
