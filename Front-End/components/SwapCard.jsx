import React, { useState } from 'react';
//components
import { Button} from '../components/';
//styles
import styles from "../styles/components/SwapCard.module.scss"
//icons
import { MdOutlinePublishedWithChanges} from 'react-icons/md'
import { FaEthereum } from 'react-icons/fa'

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
        <h3 className={styles.title}> <MdOutlinePublishedWithChanges/> Buy UJG</h3>
        <label htmlFor="from"><FaEthereum/> Eth</label>
        <input type="number" value={amount} onChange={changeTotal} name="from" id="from" placeholder='0.0'/>
        <label htmlFor="to">UJAP GOLD</label>
        <input type="number" value={total} onChange={changeAmount} name="to" id="to" />
        <span>Price: {price} Eth <FaEthereum/></span>
        <div className={styles.button}>
          <Button>Buy UJG</Button>
        </div>
      </form>
    )
  }else{
    return (
      <form className={styles.swapCard}>
        <h3 className={styles.title}> <MdOutlinePublishedWithChanges/> Sell UJG</h3>
        <label htmlFor="from">UJAP GOLD</label>
        <input type="number" value={amount} onChange={changeTotal} name="from" id="from" placeholder='0.0'/>
        <label htmlFor="to"><FaEthereum/> Eth</label>
        <input type="number" value={total} onChange={changeAmount} name="to" id="to" />
        <span>Price: {price} Eth <FaEthereum/></span>
        <div className={styles.button}>
          <Button>Sell UJG</Button>
        </div>
      </form>
    )
  }
  
}
