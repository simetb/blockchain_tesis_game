// Info Json
import contract from "./../src/contract-config.json";
import ABI from "./../src/ganache-local/contracts/StudentsMain.json";
// Moralis
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// React
import { useState } from "react";
// Custom Hooks
import { useBigNumber } from "./useBigNumber";

// In case to do an admin view, this contract function can only be call
// for the owner of the contract, be careful to no lost the wallet owner
export const useAdminContract = () => {
  // Initialize hooks
  const contractProcessor = useWeb3ExecuteFunction();
  // Reward Multiplicator
  const [rewardMultiplicator, setRewardMultiplicator] = useState(0);
  // Wear Multiplicator
  const [wearMultiplicator, setWearMultiplicator] = useState(0);
  // Attack Price Multiplicator
  const [attackPriceMultiplicator, setAttackPriceMultiplicator] = useState(0);
  // Cooldowntime Multiplicator
  const [coolDownTime, setCoolDownTime] = useState(0);
  // nft Price Multiplicator(The Mint)
  const [nftPrice, setNftPrice] = useState(0);
  // Contract Balance
  const [contractBalance, setContractBalance] = useState(0);
  // Total Nft in game
  const [nftInGame, setNftInGame] = useState(0);
  // Total Nft in market
  const [nftInMarket, setNftInMarket] = useState(0);
  // Moralis Instance and custom hook
  const { Moralis, account, isAuthenticated} = useMoralis();
  const { HexToDec } = useBigNumber();
  const adminAddress = contract.contracts.Main.owner.toLowerCase()
  
  //Detect if an admin is online
  let isAdmin = false;
  if (account == adminAddress && isAuthenticated){
    isAdmin = true;
  }else{
    isAdmin = false;
  }

  // Function that change reward multiplicator default x1
  const setNewRewardMultiplicator = (multiplicator) => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "SetRewardMultiplicator",
      abi: ABI.abi,
      params: {
        newRewardMultiplicator: multiplicator,
      },
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        console.log("New reward multiplicator setted");
        setRewardMultiplicator(multiplicator);
      },
    });
  };

  // Function that load the reward Multiplicator
  const loadRewardMultiplicator = () => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetRewardMultiplicator",
      abi: ABI.abi,
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async (result) => {
        const multiplicator = HexToDec(result);
        setRewardMultiplicator(multiplicator);
      },
    });
  };

  // Function that change the wear multiplicator default x1
  const setNewWearMultiplicator = (multiplicator) => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "SetWearMultiplicator",
      abi: ABI.abi,
      params: {
        newWearMultiplicator: multiplicator,
      },
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        console.log("New wear multiplicator setted");
        setWearMultiplicator(multiplicator);
      },
    });
  };

  // Function that load the wear Multiplicator
  const loadWearMultiplicator = () => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetWearMultiplicator",
      abi: ABI.abi,
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async (result) => {
        const multiplicator = HexToDec(result);
        setWearMultiplicator(multiplicator);
      },
    });
  };

  // Function that change the attack price multiplicator default x1
  const setNewAttackPriceMultiplicator = (multiplicator) => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "SetAttackPriceMultiplicator",
      abi: ABI.abi,
      params: {
        newAttackMultiplicator: multiplicator,
      },
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        console.log("New attack multiplicator setted");
        setAttackPriceMultiplicator(multiplicator);
      },
    });
  };

  // Function that load the attackPrice Multiplicator
  const loadAttackPriceMultiplicator = () => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetAttackPriceMultiplicator",
      abi: ABI.abi,
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async (result) => {
        const multiplicator = HexToDec(result);
        setAttackPriceMultiplicator(multiplicator);
      },
    });
  };

  // Function that change the nft price
  const setNewNftPrice = (nftPrice) => {
    nftPrice = Moralis.Units.ETH(nftPrice);
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "SetNftPrice",
      abi: ABI.abi,
      params: {
        newNftPrice: nftPrice,
      },
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        console.log("New nft price setted");
        setNftPrice(nftPrice/10**18);
      },
    });
  };

  // Function that load the nft price 
  const loadNftPrice = () => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetNftPrice",
      abi: ABI.abi,
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async (result) => {
        const price = HexToDec(result);
        setNftPrice(price/10**18);
      },
    });
  };

  // Function that change the cooldown attack time
  const setNewCoolDownTime = (hours) => {
    hours = hours * 3600;
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "SetCoolDownTime",
      abi: ABI.abi,
      params: {
        coolDownTime: hours,
      },
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        console.log("New cooldowntime setted");
        setCoolDownTime(hours);
      },
    });
  };

  // Function that load the actual cooldowntime
  const loadCoolDownTime = () => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetCoolDownTime",
      abi: ABI.abi,
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async (result) => {
        const seg = HexToDec(result);
        setNftPrice(seg);
      },
    });
  };

  // Function that burn tokens
  // this will increase the price of the token
  const burnTokens = (amount) => {
    amount = Moralis.Units.ETH(amount);
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "BurnTokens",
      abi: ABI.abi,
      params: {
        amount: amount,
      },
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        console.log("Tokens Burned");
      },
    });
  };

  // Function that mint tokens
  // this will decrease the price of the token
  const mintTokens = (amount) => {
    amount = Moralis.Units.ETH(amount);
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "MintTokens",
      abi: ABI.abi,
      params: {
        amount: amount,
      },
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        console.log("Tokens Minted");
      },
    });
  };

  // Function that load the contract balance
  const loadContractBalance = () => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetContractBalance",
      abi: ABI.abi,
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async (result) => {
        let data = HexToDec(result);
        setContractBalance(Math.round(data / 10 ** 18));
      },
    });
  };

  // Function that withdraw an amount from the contract
  // this will decrease the price of the token
  const withdraw = (amount, account) => {
    amount = Moralis.Units.ETH(amount);
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "Withdraw",
      abi: ABI.abi,
      params: {
        amount: amount,
        owner: account,
      },
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        console.log("Withdraw...!!");
      },
    });
  };

  // Function that transfer liquidity to the contract
  // this will increase the price of the token
  const transferLiquidity = (amount, account) => {
    amount = Moralis.Units.ETH(amount);
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "TransferLiquidity",
      abi: ABI.abi,
      msgValue: amount,
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        console.log("Liquidity Added to contract...!!");
      },
    });
  };

  // Function that load the  total nfts in game
  const loadTotalNftInGame = () => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetTotalNftInGame",
      abi: ABI.abi,
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async (result) => {
        let data = HexToDec(result);
        setNftInGame(Math.round(data / 10 ** 18));
      },
    });
  };

  // Function that load the total nfts in market
  const loadTotalNftInMarket = () => {
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetTotalNftInMarket",
      abi: ABI.abi,
    };

    contractProcessor.fetch({
      params: options,
      onSuccess: async (result) => {
        let data = HexToDec(result);
        setNftInMarket(Math.round(data / 10 ** 18));
      },
    });
  };

  return {
    rewardMultiplicator,
    wearMultiplicator,
    attackPriceMultiplicator,
    coolDownTime,
    nftPrice,
    contractBalance,
    nftInGame,
    nftInMarket,
    isAdmin,
    setNewRewardMultiplicator,
    loadRewardMultiplicator,
    setNewWearMultiplicator,
    loadWearMultiplicator,
    setNewAttackPriceMultiplicator,
    loadAttackPriceMultiplicator,
    setNewNftPrice,
    loadNftPrice,
    setNewCoolDownTime,
    loadCoolDownTime,
    burnTokens,
    mintTokens,
    loadContractBalance,
    withdraw,
    transferLiquidity,
    loadTotalNftInGame,
    loadTotalNftInMarket,
  };
};
