import React, { useState } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import ABI from '../src/ganache-local/contracts/StudentsMain.json'

export default function nft() {

  const [amount,setAmount] = useState(0);
  const [liquidity,setLiquidity] = useState(0);
  const [pool,setPool] = useState(0);
  const [price,setPrice] = useState(0);
  const [token,setToken] = useState(0);

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const contractAddress = "0xdE73727780e8697bB4e820260A57F9769cb6f26e";

  // Change the Amount
  const changeAmount = (e) =>{
    let fullAmount:number;
    if(e.target.value){
      fullAmount = e.target.value;
    }else{
      fullAmount = 0; 
    }
    setAmount(fullAmount)
  }

  // Function to Buy tokens Requirements - Signed Metamask User
  const buyTokens = async () =>{
    let options = {
      contractAddress: contractAddress,
      functionName: 'BuyToken',
      abi: ABI.abi,
      params:{
        amount: Moralis.Units.ETH(amount),
        price: Moralis.Units.ETH(price),
      },
        msgValue: Moralis.Units.ETH(price * amount)
     }

    await contractProcessor.fetch({
      params:options,
      onSuccess: () =>{
        console.log("Tokens Buyed - Do Something")
      }
    })
  }

  // Function to solve BigNumber Object
  const HexToDec = (val: any) =>{
    if(val?._isBigNumber){
      return parseInt(val._hex, 16)
    }else{
      return val
    }
  }

  // Function to Act / Get the Price Requirements - Signed Metamask User
  const getPrice = async () =>{

    console.log("Im here in ActPrice");
    let options = {
      contractAddress: contractAddress,
      functionName: 'GetTokenPool',
      abi : ABI.abi
    }

    contractProcessor.fetch({
      params:options,
      onSuccess: async(value) =>{
        let data = HexToDec(value);
        setPool(Math.round(data/10**18));
      }
    })

    options = {
      contractAddress: contractAddress,
      functionName: 'GetLiquidityPool',
      abi : ABI.abi
    }

    contractProcessor.fetch({
      params:options,
      onSuccess: async(value) =>{
        let data = HexToDec(value);
        setLiquidity(Math.round(data/10**18));
      }
    })
  }

  // Function to act the price
  const actPrice = () =>{
    console.log(liquidity);
    console.log(pool);
    let value = liquidity/pool;
    value = Number(value.toFixed(8));
    setPrice(value);
  }

  // Function to get the Total balance token Requirements - Signed metamask user 
  const getUserTokens = async () =>{
    let options = {
      contractAddress:contractAddress,
      functionName: 'TokenBalance',
      abi: ABI.abi,
      params:{
        account: account
      }
    }

    contractProcessor.fetch({
      params:options,
      onSuccess: async(value) =>{
        let data = HexToDec(value);
        setToken(Math.round(data/10**18));
      }
    })
  }

  // Function to sell the specified amount of tokens Requirements - Signed metamask user 
  // (estimate gas 0.0007ETH)
  const sellTokens = async () =>{
    let options = {
      contractAddress:contractAddress,
      functionName: 'SellToken',
      abi: ABI.abi,
      params:{
        amount: Moralis.Units.ETH(amount),
        price: Moralis.Units.ETH(price.toFixed(2)),
      }
    }

    contractProcessor.fetch({
      params:options,
      onSuccess: () =>{
        console.log("Tokens Selled");
      }
    })
  }
 
  return (
    <div>
      <h1>Token</h1>
      <button onClick={getUserTokens}>Tokens of this wallet</button>
      <span>{token}</span>
      <br />
      <span>Amount</span>
      <input type="number" onChange={(e) => changeAmount(e)}/>
      <button onClick={getPrice}>Get Data Tokens</button>
      <button onClick={actPrice}>Act Price of Token</button>
      <h2>Buy Token</h2>
      <span>Price c/u: {price} ETH</span>  
      <button onClick={buyTokens}>Buy Tokens</button>
      <span>Total Price{price * amount}</span>
      
      <br />
      <span>{account}</span>
      <h2>Sell Token</h2>
      <button onClick={sellTokens}>Sell Tokens</button>
      <span>Price c/u: {price} ETH</span>  
      <span>Total Price{price * amount}</span>
    </div>
  )
}
