import React, { useState, useEffect } from "react";
//components
import { Button, CornerModal} from "../components/";
//styles
import styles from "../styles/components/SwapCard.module.scss";
//icons
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
// Moralis
import { useToken } from "../hooks";

export default function SwapCard({ action, price, buyTokens, sellTokens }) {
  // Mapp States
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);

  // Buy option, prevenDefault no reload
  const Buy = (e) => {
    e.preventDefault();
    buyTokens(amount);
  };

  // Sell option, prevenDefault no reload
  const Sell = (e) => {
    e.preventDefault();
    sellTokens(amount);
  };

  // Mapping the total value (Depend TokenPrice)
  const changeTotal = (e) => {
    setAmount(e.target.value);
    setTotal(e.target.value * price);
  };

  // Mapping changeamount (Depend TokenPrice)
  const changeAmount = (e) => {
    setTotal(e.target.value);
    setAmount(e.target.value / price);
  };

  if (action === "buy") {
    return (
      <form className={styles.swapCard}>
        <h3 className={styles.title}>
          {" "}
          <MdOutlinePublishedWithChanges /> Comprar UJG
        </h3>
        <label htmlFor="from">
          {" "}
          <FaEthereum />
          Eth
        </label>
        <input
          type="number"
          value={total}
          onChange={changeAmount}
          name="from"
          id="from"
          placeholder="0.0"
        />
        <label htmlFor="to">UJAP GOLD</label>
        <input
          type="number"
          value={amount}
          onChange={changeTotal}
          name="to"
          id="to"
        />
        <span>
          Precio: {price} Eth
          <FaEthereum />{" "}
        </span>
        <div className={styles.button}>
          <Button onClick={Buy}>Comprar UJG</Button>
        </div>
      </form>
    );
  } else {
    return (
      <form className={styles.swapCard}>
        <h3 className={styles.title}>
          {" "}
          <MdOutlinePublishedWithChanges /> Vender UJG
        </h3>
        <label htmlFor="from"> UJAP GOLD</label>
        <input
          type="number"
          value={amount}
          onChange={changeTotal}
          name="from"
          id="from"
          placeholder="0.0"
        />
        <label htmlFor="to">
          <FaEthereum /> Eth
        </label>
        <input
          type="number"
          value={total}
          onChange={changeAmount}
          name="to"
          id="to"
        />
        <span>
        Precio: {price} Eth <FaEthereum />
        </span>
        <div className={styles.button}>
          <Button onClick={Sell}>Vender UJG</Button>
        </div>
      </form>
    );
  }
}
