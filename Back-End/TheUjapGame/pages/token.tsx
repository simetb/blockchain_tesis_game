import { useState, useEffect} from 'react';
import { useToken }  from '../hooks';
import { useUserInfo } from '../hooks';
import { useMoralis } from 'react-moralis';

export default function nft() {
  const { 
    loadTokenInfo,
    buyTokens,
    sellTokens,
    tokenPool, 
    liquidityPool, 
    tokenPrice,

  }   = useToken();

  const { tokenBalance, loadUserInfo} = useUserInfo();
  const [amount,setAmount] = useState(0);
  const {isAuthenticated} = useMoralis();

  // If the user is Auth the info token will show
  // If the user isen`t Auth the amount will be -1
  // -1 Means(Error)

  useEffect(() =>{
    if(isAuthenticated){
      loadTokenInfo()
      loadUserInfo()
    }else{
      console.log("Wallet is not auth")
    }
  },[])


 
  return (
    <div>
      <h1>Token</h1>
      <h2>Info Token</h2>
      <span>TokenPool: {tokenPool} UJG</span>
      <br />
      <span>LiquidityPool: {liquidityPool} ETH</span>
      <br />
      <span>Price: {tokenPrice} ETH</span>
      <br />
      <span>Token User Balance: {tokenBalance} UJG</span>
      <h2>Amount</h2>
      <input type="number" onChange={(e) => setAmount(Number(e.target.value))}/>
      <br />
      <span>Price {amount * tokenPrice}</span>
      <br />
      <h2>Action</h2>
      <button onClick={() =>{buyTokens(amount)}}>Buy</button>
      <span>    -   </span>
      <button onClick={() =>{sellTokens(amount)}}>Sell</button>
    </div>
  )
}