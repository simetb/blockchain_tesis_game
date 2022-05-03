import ABI from "./../src/ganache-local/contracts/StudentsMain.json"
import { useMoralis ,useWeb3ExecuteFunction} from "react-moralis";
import contract from "./../src/contract-config.json"
import { useBigNumber } from "./useBigNumber";
import images from "../src/img/img-url.json";
import { useUserInfo } from "./useUserInfo";

export const useNft = () =>{

    const contractProcessor = useWeb3ExecuteFunction();
    const {account, Moralis} = useMoralis();
    const {HexToDec} = useBigNumber();
    const {loadIndexNft,indexs} = useUserInfo()

    // Burn nft
    //
    // - Requirements:
    //
    // - Need StudentIndex
    const burnNft = (index:number) =>{
        // Options burnNft
        let options_burnNft = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'BurnNft',
            abi : ABI.abi,
            params:{
                studentIndex: index 
            }
        }
    
        // Burn the Nft
        contractProcessor.fetch({
            params:options_burnNft,
            onSuccess: async() =>{
                console.log("NFT BURNED!")
            }
        })
    }

    // Mint Nft
    const mintNft = () =>{
        
        loadIndexNft()

        // Options mintNft
        let options_mint = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'CreateNftStudent',
            abi : ABI.abi
        }
    
        // mint the Nft
        contractProcessor.fetch({
            params:options_mint,
            onSuccess: async() =>{
                console.log("NFT MINTED!")
                
                // Get Last Nft
                let lastIndex = (indexs.length - 1)
                let lastNft = indexs[lastIndex]

                // Get Stats of the Nft
                let option_info_nft = {
                    contractAddress: contract.contracts.Main.address,
                    functionName: 'GetStudentInfo',
                    abi : ABI.abi,
                    params:{
                        studentIndex: lastNft
                    }
                }

                contractProcessor.fetch({
                    params:option_info_nft,
                    onSuccess: async(result:any) =>{
                        
                        let level = HexToDec(result[0]);
                        let intelligence = HexToDec(result[1])
                        let cheat = HexToDec(result[2])
                        let name = result[3]
                        let id = HexToDec(result[5])
                        let file;
                        if(level == 1){
                            file = images.image.one;
                            console.log("Your Character is Level 1")
                        }else if(level == 2){
                            file = images.image.two;
                            console.log("Your character is level 2")
                        }else{
                            file = images.image.three;
                            console.log("Your character is level 3")
                        }
                        //Get Stats and Id
                        const metadata = {
                            "type": "Fresher",
                            "name": name,
                            "image":file,
                            "id":id,
                            "atributes":[
                                {
                                    "atribute_type": "level",
                                    "value":level
                                },
                                {
                                    "atribute_type": "intelligence",
                                    "value":intelligence
                                },
                                {
                                    "atribute_type": "cheat",
                                    "value":cheat
                                }
                            ]
                        }
                        setTokenUri(metadata,id);
                    }
    
                })
                
            }
        })
    }

    const setTokenUri = async (metadata,id) =>{
        const metadataFile:any = new Moralis.File("metadata.json",{base64: btoa(JSON.stringify(metadata))})
        await metadataFile.saveIPFS();
        console.log( metadataFile.ipfs())
        let option_token_uri = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'SetTokenURI',
            abi : ABI.abi,
            params:{
                studentId: id,
                tokenURI: metadataFile.ipfs()
            }
        }
        contractProcessor.fetch({
            params:option_token_uri,
            onSuccess: async() =>{
                console.log("Token Uri Setted")
            }
        })

    }
    const transferNft = (to,index) =>{
        let option_transfer = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'TransferNft',
            abi : ABI.abi,
            params:{
                from:account,
                to: to,
                studentIndex: index
            }
        }
        contractProcessor.fetch({
            params:option_transfer,
            onSuccess: async() =>{
                console.log("Nft Transfered")
            }
        })
    }

    
    return {burnNft,mintNft,transferNft}
}

    
