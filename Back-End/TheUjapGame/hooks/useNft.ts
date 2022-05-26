// Moralis
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// Info Json
import ABI from "./../src/ganache-local/contracts/StudentsMain.json";
import contract from "./../src/contract-config.json";
import images from "../src/freshers-img.json";
// Custom Hooks
import { useBigNumber } from "./useBigNumber";
import { useGetRandom } from "./useGetRandom";
import { useState } from "react";

// custom hook made for nft manipulation using moralis, json and react hooks
// To interact with all these functions u need to have an signed metamask user
export const useNft = () => {
  // Hooks Initializer
  const contractProcessor = useWeb3ExecuteFunction();
  const { account, Moralis } = useMoralis();
  const { HexToDec } = useBigNumber();
  const { random } = useGetRandom()
  // Modals
  const [successMint, setSuccessMint] = useState(false)
  const [successTransfer, setSuccessTransfer] = useState(false)
  const [successBurn, setSuccessBurn] = useState(false)
  const [error, setError] = useState(false)

  // Function to burn an existing nft
  //
  // - Requirements:
  //
  // - Need StudentIndex
  const burnNft = (index: number) => {
    // Options burnNft
    let options_burnNft = {
      contractAddress: contract.contracts.Main.address,
      functionName: "BurnNft",
      abi: ABI.abi,
      params: {
        studentIndex: index,
      },
    };

    // Burn the Nft
    contractProcessor.fetch({
      params: options_burnNft,
      onSuccess: async () => {
        setSuccessBurn(true)
      },
      onError: (e) => {
        console.log(e);
        setError(true)
      }
    });
  };

  // Function to Mint Nft
  // The Mint is completly randomness
  // The ramdoness it`s got by radom hook function, when the nfts is minted to be valid in the game
  // you need to accept the token uri set transaction
  const mintNft = async () => {
    // Only 1 per 1
    let amount = 1;
    
    for (let index = 0; index < amount; index++) {
      
      // Generate Random Value
      const randomValue = Number(random().toFixed())
      
      // Options mintNft, with the generated random value
      let options_mint = {
        contractAddress: contract.contracts.Main.address,
        functionName: "CreateNftStudent",
        abi: ABI.abi,
        params:{
          random: randomValue
        }
      };

      // call the contract function CreateNftStudent
      await contractProcessor.fetch({
        params: options_mint,
        onSuccess: async () => {
          console.log("NFT MINTED!");

          // Option Index
          let options_index = {
            contractAddress: contract.contracts.Main.address,
            functionName: "GetStudentsByOwner",
            abi: ABI.abi,
            params: {
              owner: account,
            },
          };

          // Call the contract function GetStudentsByOwner
          contractProcessor.fetch({
            params: options_index,
            onSuccess: async (result: any) => {
              let index = result.length - 1;
              const lastNft = HexToDec(result[index]);

              // Get Stats of the Nft
              let option_info_nft = {
                contractAddress: contract.contracts.Main.address,
                functionName: "GetStudentInfo",
                abi: ABI.abi,
                params: {
                  studentIndex: lastNft,
                },
              };

              // Call the contract function GetStudentInfo
              contractProcessor.fetch({
                params: option_info_nft,
                onSuccess: async (result: any) => {
                  let level = HexToDec(result[0]);
                  let intelligence = HexToDec(result[1]);
                  let cheat = HexToDec(result[2]);
                  let name = result[3];
                  let id = HexToDec(result[5]);
                  let market = result[6];
                  let file;
                  if (level == 1) {
                    file = images.image.one;
                    console.log("Your Character is Level 1");
                  } else if (level == 2) {
                    file = images.image.two;
                    console.log("Your character is level 2");
                  } else {
                    file = images.image.three;
                    console.log("Your character is level 3");
                  }
                  //Get Stats and Id
                  const metadata = {
                    type: "Fresher",
                    name: name,
                    image: file,
                    id: id,
                    atributes: [
                      {
                        atribute_type: "level",
                        value: level,
                      },
                      {
                        atribute_type: "intelligence",
                        value: intelligence,
                      },
                      {
                        atribute_type: "cheat",
                        value: cheat,
                      },
                    ],
                    market: market,
                  };
                  // Create the metadata and token uri
                  setTokenUri(metadata, id);
                },
                onError: async (e) => {
                  console.log(e);
                },
              });
            },
          });
        },onError: async(e) =>{
          console.log(e)
        },
      });
    }
  };

  // Function to save the token Uri
  const setTokenUri = async (metadata, id) => {
    // Transform the metadata in JSON
    const metadataFile: any = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });
    // Save the file in Ipf
    await metadataFile.saveIPFS();
    console.log(metadataFile.ipfs());

    // Option of token uri
    let option_token_uri = {
      contractAddress: contract.contracts.Main.address,
      functionName: "SetTokenURI",
      abi: ABI.abi,
      params: {
        studentId: id,
        tokenURI: metadataFile.ipfs(),
      },
    };

    // Call the contract function SetTokenURI
    contractProcessor.fetch({
      params: option_token_uri,
      onSuccess: async () => {
        console.log("Token Uri Setted");
        setSuccessMint(true)
      },onError: async () =>{
        setError(true)
      }
    });
  };

  // Function to transfer an NFT
  //
  // - Requirements:
  //
  // to: secundary address
  // index: Index of the nft
  const transferNft = (to, index) => {

    // Options to transfer nft
    let option_transfer = {
      contractAddress: contract.contracts.Main.address,
      functionName: "TransferNft",
      abi: ABI.abi,
      params: {
        from: account,
        to: to,
        studentIndex: index,
      },
    };

    // Contract call Function TransferNft
    contractProcessor.fetch({
      params: option_transfer,
      onSuccess: async () => {
        setSuccessTransfer(true)
      },onError: async() =>{
        setError(true)
      }
    });
  };

  return { burnNft, mintNft, transferNft,  setSuccessMint,setSuccessTransfer,setSuccessBurn, setError, successMint,successTransfer,successBurn, error};
};
