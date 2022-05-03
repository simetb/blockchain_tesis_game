import ABI from "./../src/ganache-local/contracts/StudentsMain.json"
import { useMoralis ,useWeb3ExecuteFunction} from "react-moralis";
import contract from "./../src/contract-config.json"
import { useBigNumber } from "./useBigNumber";
import images from "../src/img/img-url.json";
import { useUserInfo } from "./useUserInfo";

export const useAttack = () =>{

    const contractProcessor = useWeb3ExecuteFunction()

    const attackNft = (levelId,index) =>{
        let option_transfer = {
            contractAddress: contract.contracts.Main.address,
            functionName: 'Attack',
            abi : ABI.abi,
            params:{
                studentIndex:index,
                levelNumber:levelId
            }
        }
        contractProcessor.fetch({
            params:option_transfer,
            onSuccess: async() =>{
                console.log("Nft Transfered")
            }
        })
    }

}

//GetTotalAttackPrice
//GetPowerLevel
//Attack