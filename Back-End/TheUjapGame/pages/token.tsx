import React, { useState } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'

export default function nft() {

  
  const [amount,setAmount] = useState(0);
  const [price,setPrice] = useState(0);

  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const changeAmount = (e) =>{
    let fullAmount:number;
    if(e.target.value){
      fullAmount = Number(Moralis.Units.ETH(e.target.value))
    }else{
      fullAmount = 0; 
    }
    setAmount(fullAmount)
    console.log(fullAmount)
  }



  return (
    <div>
      <h1>Token</h1>
      <span>Amount</span>
      <input type="number" onChange={(e) => changeAmount(e)}/>
      <span>Price: {price} ETH</span>
      <button>Buy Tokens</button>
      <button>Get Price</button>
    </div>
  )
}
