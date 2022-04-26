import React from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'

export default function nft() {

  async function donation( )

  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();



  return (
    <div>
      <h1>Token</h1>
      <button>Buy Tokens</button>
      <span>Amount</span>
      <input type="text" />
      <span>Price: </span>
    </div>
  )
}
