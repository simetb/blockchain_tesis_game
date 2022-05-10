// Moralis
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// Json info
import ABI from "../src/ganache-local/contracts/StudentsMain.json";
import contract from "../src/contract-config.json";
// React
import { useState } from "react";
// Custom Hooks
import { useBigNumber } from "./useBigNumber";

// custom hook made for token manipulation using moralis, json and react hooks
// To interact with all these functions u need to have an signed metamask user
export const useToken = () => {
  // hooks initializer
  const contractProcessor = useWeb3ExecuteFunction(); // To use the contract
  const { Moralis } = useMoralis(); // To use Moralis functionality
  const { HexToDec } = useBigNumber(); // To conver BigNumber object

  // Token
  const [tokenPool, setTokenPool] = useState(-1); // Save the actual token pool
  const [liquidityPool, setLiquidityPool] = useState(-1); // Save the actual liquidity pool

  // function that loads the information of the token in the contract
  const loadTokenInfo = () => {
    // Get The Token Pool
    // Options from contract function GetTokenPool
    let options_token_pools = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetTokenPool",
      abi: ABI.abi,
    };
    // call to contract
    contractProcessor.fetch({
      params: options_token_pools,
      onSuccess: async (value) => {
        let data = HexToDec(value);
        setTokenPool(data / 10 ** 18);
      },
      onError: (error) => {
        console.error(error);
      },
    });

    // Get the liquidity Pool
    // Options from contract function GetLiquidityPool
    let options_liquidity_pool = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetLiquidityPool",
      abi: ABI.abi,
    };
    // call to contract
    contractProcessor.fetch({
      params: options_liquidity_pool,
      onSuccess: async (value) => {
        let data = HexToDec(value);
        setLiquidityPool(data / 10 ** 18);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  // this piece of code gets the price of the token (approximately),
  // because you have to avoid an overflow by adjusting the decimals of the price
  let tokenPrice;
  if (liquidityPool == -1) {
    tokenPrice = -1;
  } else {
    tokenPrice = liquidityPool / tokenPool;
    tokenPrice = Number(tokenPrice.toFixed(8));
  }

  // Function that buys tokens and transfers them to the user's account,
  // the prices between the contract and the interface are worked out in
  // WEI, that's why Moralis units have to be used.
  // Moralis Units => Value*10**18
  const buyTokens = async (amount: number) => {
    // Options of the contract function
    // Amount(WEI)
    // Price(WEI)
    loadTokenInfo(); // Act the price of token to the last price
    const price = Number((liquidityPool / tokenPool).toFixed(8));
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "BuyToken",
      abi: ABI.abi,
      params: {
        amount: Moralis.Units.ETH(amount),
        price: Moralis.Units.ETH(price),
      },
      msgValue: Moralis.Units.ETH(price * amount),
    };
    // call to contract
    contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        //On Success the Operation => Do Someting?
        console.log("Tokens Buyed - Do Something");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  //Function that sells a number of user tokens and transfers them
  //to their wallet in ETH (estimate gas 0.0007ETH) for use these function
  const sellTokens = async (amount: number) => {
    // Options to the contract function SellToken
    loadTokenInfo(); // Act the price of token to the last price
    const price = Number((liquidityPool / tokenPool).toFixed(8));
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "SellToken",
      abi: ABI.abi,
      params: {
        amount: Moralis.Units.ETH(amount),
        price: Moralis.Units.ETH(price),
      },
    };
    // call to contract
    contractProcessor.fetch({
      params: options,
      //On Success the Operation => Do Someting?
      onSuccess: () => {
        console.log("Tokens Selled - Do Something");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return {
    loadTokenInfo,
    buyTokens,
    sellTokens,
    tokenPool,
    liquidityPool,
    tokenPrice,
  };
};
