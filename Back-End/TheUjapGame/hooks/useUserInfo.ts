import { useState } from "react"
import ABI from '../src/ganache-local/contracts/StudentsMain.json';
import contract from '../src/contract-config.json';
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useBigNumber } from "./useBigNumber";

export const  useUserInfo = () =>{
    const [tokenBalance,setTokenBalance] = useState(-1);
    const [indexs,setIndexs] = useState([]);
    const [nfts,setNfts] = useState([]);
    const { account } = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();
    const { HexToDec } = useBigNumber();


    const loadUserInfo = () =>{
        let options_info = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'TokenBalance',
            abi: ABI.abi,
            params:{
                account:account
            }
        }
    
        // Sell the tokens on Success => (Do Something)
        contractProcessor.fetch({
            params:options_info,
            onSuccess: (value) =>{
                let data = HexToDec(value);
                setTokenBalance(Math.round(data/10**18));
            }
        })

    }
    // Amount Nft
    const loadIndexNft = () =>{
        let options_index = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'GetStudentsByOwner',
            abi: ABI.abi,
            params:{
                owner:account
            }
        }


        contractProcessor.fetch({
            params:options_index,
            onSuccess: (result:any) =>{
                
                let values = [];
                for(let entry of result){
                    let value = (HexToDec(entry));
                    values.push(value)
                }
                setIndexs(values)
                
            }
        })
        console.log(indexs)
    }

    const loadNfts = async ()  =>{
        let students = [];
        for(let index in indexs){
            let id_options ={
                contractAddress: contract.contracts.Main.address,
                functionName: 'GetStudentInfo',
                abi: ABI.abi,
                params:{
                    studentIndex:index
                }
            }
            
            await contractProcessor.fetch({
                params:id_options,
                onSuccess: async (result:any) =>{
                    const id = HexToDec(result[5])
                    const intelligence = HexToDec(result[1])
                    //console.log(intelligence)
                    let tokenURIOption ={
                        contractAddress: contract.contracts.Main.address,
                        functionName: 'GetTokenURI',
                        abi: ABI.abi,
                        params:{
                            studentId:id
                        }
                    }

                    contractProcessor.fetch({
                        params:tokenURIOption,
                        onSuccess: async (result:string) =>{
                            if(!result){
                                console.log("Nft does`nt have token URI!")
                            }else{
                                const res = await fetch(result);
                                const data = await res.json();
                                students.push({
                                    "type":data.type,
                                    "name":data.name,
                                    "atributes":{
                                        "iq":intelligence,
                                        "level":data.atributes[0].value,
                                        "cheat":data.atributes[2].value
                                    },
                                    "id":id,
                                    "indexId":index,
                                    "image":data.image
                                    
                                })
                                setNfts(students);
                                
                            }
                        }
                    })
                    
                }
            })
        
    }
}

    return {tokenBalance, loadUserInfo, loadIndexNft,indexs,loadNfts,nfts}
}