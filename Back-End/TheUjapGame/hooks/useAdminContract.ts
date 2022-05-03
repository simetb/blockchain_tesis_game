import contract from "./../src/contract-config.json"
import ABI from "./../src/ganache-local/contracts/StudentsMain.json"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import { useState } from "react";
import { useBigNumber } from "./useBigNumber";


export const useAdminContract = () =>{
    const contractProcessor = useWeb3ExecuteFunction();
    const [rewardMultiplicator,setRewardMultiplicator] = useState(0);
    const [wearMultiplicator, setWearMultiplicator] = useState(0)
    const [attackPriceMultiplicator,setAttackPriceMultiplicator] = useState(0)
    const [coolDownTime,setCoolDownTime] = useState(0)
    const [nftPrice,setNftPrice] = useState(0)
    const [contractBalance,setContractBalance] = useState(0)
    const [nftInGame,setNftInGame] = useState(0)
    const [nftInMarket,setNftInMarket] = useState(0)
    const { Moralis } = useMoralis()
    
    const {HexToDec} = useBigNumber();

    const setNewRewardMultiplicator = (multiplicator) =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'SetRewardMultiplicator',
            abi : ABI.abi,
            params:{
                newRewardMultiplicator:multiplicator
            }
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async()=>{
                console.log("New reward multiplicator setted")
                setRewardMultiplicator(multiplicator)
            }
        })
    }

    const loadRewardMultiplicator = () =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'GetRewardMultiplicator',
            abi : ABI.abi,
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async(result)=>{
                const multiplicator = HexToDec(result);
                setRewardMultiplicator(multiplicator)
            }
        })
    }

    const setNewWearMultiplicator = (multiplicator) =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'SetWearMultiplicator',
            abi : ABI.abi,
            params:{
                newWearMultiplicator:multiplicator
            }
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async()=>{
                console.log("New wear multiplicator setted")
                setWearMultiplicator(multiplicator)
            }
        })
    }

    const loadWearMultiplicator = () =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'GetWearMultiplicator',
            abi : ABI.abi,
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async(result)=>{
                const multiplicator = HexToDec(result);
                setWearMultiplicator(multiplicator)
            }
        })
    }

    const setNewAttackPriceMultiplicator = (multiplicator) =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'SetAttackPriceMultiplicator',
            abi : ABI.abi,
            params:{
                newAttackMultiplicator:multiplicator
            }
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async()=>{
                console.log("New attack multiplicator setted")
                setAttackPriceMultiplicator(multiplicator)
            }
        })
    }

    const loadAttackPriceMultiplicator = () =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'GetAttackPriceMultiplicator',
            abi : ABI.abi,
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async(result)=>{
                const multiplicator = HexToDec(result);
                setAttackPriceMultiplicator(multiplicator)
            }
        })
    }

    const setNewNftPrice = (nftPrice) =>{
        nftPrice = Moralis.Units.ETH(nftPrice);
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'SetNftPrice',
            abi : ABI.abi,
            params:{
                newNftPrice:nftPrice
            }
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async()=>{
                console.log("New nft price setted")
                setNftPrice(nftPrice)
            }
        })
    }

    const loadNftPrice = () =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'GetNftPrice',
            abi : ABI.abi,
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async(result)=>{
                const price = HexToDec(result);
                setNftPrice(price)
            }
        })
    }

    const setNewCoolDownTime = (hours) =>{
        hours = hours * 3600
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'SetCoolDownTime',
            abi : ABI.abi,
            params:{
                coolDownTime:hours
            }
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async()=>{
                console.log("New cooldowntime setted")
                setCoolDownTime(hours)
            }
        })
    }

    const loadCoolDownTime = () =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'GetCoolDownTime',
            abi : ABI.abi,
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async(result)=>{
                const seg = HexToDec(result);
                setNftPrice(seg)
            }
        })
    }

    const burnTokens = (amount) =>{
        amount = Moralis.Units.ETH(amount)
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'BurnTokens',
            abi : ABI.abi,
            params:{
                amount:amount
            }
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async()=>{
                console.log("Tokens Burned")
            }
        })
    }

    const mintTokens = (amount) =>{
        amount = Moralis.Units.ETH(amount)
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'MintTokens',
            abi : ABI.abi,
            params:{
                amount:amount
            }
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async()=>{
                console.log("Tokens Minted")
            }
        })
    }

    const loadContractBalance = () =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'GetContractBalance',
            abi : ABI.abi,
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async(result)=>{
                let data = HexToDec(result);
                setContractBalance(Math.round(data/10**18))
            }
        })
    }

    const withdraw = (amount,account) =>{
        amount = Moralis.Units.ETH(amount)
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'Withdraw',
            abi : ABI.abi,
            params:{
                amount:amount,
                owner:account
            }
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async()=>{
                console.log("Withdraw...!!")
            }
        })
    }

    const transferLiquidity = (amount,account) =>{
        amount = Moralis.Units.ETH(amount)
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'TransferLiquidity',
            abi : ABI.abi,
            msgValue: amount
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async()=>{
                console.log("Liquidity Added to contract...!!")
            }
        })
    }

    const loadTotalNftInGame = () =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'GetTotalNftInGame',
            abi : ABI.abi,
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async(result)=>{
                let data = HexToDec(result);
                setNftInGame(Math.round(data/10**18))
            }
        })
    }

    const loadTotalNftInMarket = () =>{
        let options = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'GetTotalNftInMarket',
            abi : ABI.abi,
        }

        contractProcessor.fetch({
            params:options,
            onSuccess: async(result)=>{
                let data = HexToDec(result);
                setNftInMarket(Math.round(data/10**18))
            }
        })
    }

    return{rewardMultiplicator,wearMultiplicator,attackPriceMultiplicator,coolDownTime,nftPrice,contractBalance,setNewRewardMultiplicator,loadRewardMultiplicator,setNewWearMultiplicator,loadWearMultiplicator,setNewAttackPriceMultiplicator,loadAttackPriceMultiplicator,setNewNftPrice,loadNftPrice,setNewCoolDownTime,loadCoolDownTime,burnTokens,mintTokens,loadContractBalance,withdraw,transferLiquidity,loadTotalNftInGame,loadTotalNftInMarket}
}



