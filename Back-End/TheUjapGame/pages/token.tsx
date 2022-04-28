import React, { useState } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import ABI from '../src/ganache-local/contracts/StudentsMain.json'

export default function nft() {
  // Const Hooks that are used for get the token info
  //
  // amount, check the amount of tokens that you going to sell or buy
  // liquidity, save the liquidity of the contract in ETH (18 decimals)
  // tokenPool, save the amount of token in the tokenPool in ETH(18 decimals)
  // price, act the real price of token and avoid any BigNumber error
  // userTokens, get the amount of tokens in the user wallet
  const [amount,setAmount] = useState(0);
  const [liquidity,setLiquidity] = useState(0);
  const [tokenPool,setTokenPool] = useState(0);
  const [price,setPrice] = useState(0);
  const [userTokens,setUserToken] = useState(0);

  // Const Hooks Moralis
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  // Contract address...(Replace for and .env variable)
  const contractAddress = "0x65F677E297564CBBB86A65171792a442F17a63B5";

  // Change the Amount of total tokens to buy or sell
  const changeAmount = (e) =>{
    let fullAmount:number;
    if(e.target.value){
      fullAmount = e.target.value;
    }else{
      fullAmount = 0; 
    }
    setAmount(fullAmount)
  }

  // Function to Buy tokens (Payable Function)
  //
  // Requirements: 
  //
  //- Signed Metamask User
  const buyTokens = async () =>{
    // Options of the contract function
    // Amount(In WEI)
    // Price(In Wei)
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

    // Call the function from the Blockchain
    await contractProcessor.fetch({
      params:options,
      onSuccess: () =>{
        // On Success the Operation => Do Someting?
        console.log("Tokens Buyed - Do Something")
      }
    })
  }

  // Function to solve BigNumber Object and avoid Errors in contract
  // If the value is not an BigNumber Object return the entry value
  const HexToDec = (val: any) =>{
    if(val?._isBigNumber){
      return parseInt(val._hex, 16)
    }else{
      return val
    }
  }

  // Function to Act / Get the Price, to get the price is liquidityPool/tokenPool
  // 
  // Requirements 
  //
  // - Signed Metamask User
  const getPrice = async () =>{

    // Options from contract function GetTokenPool
    let options = {
      contractAddress: contractAddress,
      functionName: 'GetTokenPool',
      abi : ABI.abi
    }

    // Get the tokenPool
    contractProcessor.fetch({
      params:options,
      onSuccess: async(value) =>{
        let data = HexToDec(value);
        setTokenPool(Math.round(data/10**18));
      }
    })

    // Options from contract function GetLiquidityPool
    options = {
      contractAddress: contractAddress,
      functionName: 'GetLiquidityPool',
      abi : ABI.abi
    }

    // Get the liquidityPool
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
    console.log(tokenPool);
    let value = liquidity/tokenPool;
    value = Number(value.toFixed(8));
    setPrice(value);
  }

  // Function to get the Total balance token 
  //
  // Requirements 
  //
  // - Signed metamask user 
  const getUserTokens = async () =>{

    // Options to the contract function TokenBalance
    let options = {
      contractAddress:contractAddress,
      functionName: 'TokenBalance',
      abi: ABI.abi,
      params:{
        account: account
      }
    }

    // Get the Balance
    contractProcessor.fetch({
      params:options,
      onSuccess: async(value) =>{
        let data = HexToDec(value);
        setUserToken(Math.round(data/10**18));
      }
    })
  }

  // Function to sell the specified amount of tokens 
  // Requirements 
  //
  // - Signed metamask user 
  // (estimate gas 0.0007ETH)
  const sellTokens = async () =>{
    // Options to the contract function SellToken
    let options = {
      contractAddress:contractAddress,
      functionName: 'SellToken',
      abi: ABI.abi,
      params:{
        amount: Moralis.Units.ETH(amount),
        price: Moralis.Units.ETH(price.toFixed(2)),
      }
    }

    // Sell the tokens on Success => (Do Something)
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
      <span>{userTokens}</span>
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
      <button onClick={getPrice}>PRUEBA</button>
    </div>
  )
}