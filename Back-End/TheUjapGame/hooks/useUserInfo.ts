// React
import { useState } from "react";
// Json Info
import ABI from "../src/ganache-local/contracts/StudentsMain.json";
import contract from "../src/contract-config.json";
// Moralis
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// Custom Hooks
import { useBigNumber } from "./useBigNumber";

// custom hook made for user info manipulation using moralis, json and react hooks
// To interact with all these functions u need to have an signed metamask user
export const useUserInfo = () => {
  // Hooks initializer
  const { account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const { HexToDec } = useBigNumber();

  // Token user balance 
  const [tokenBalance, setTokenBalance] = useState(-1);
  // Index Nfts and Nfts objects
  const [indexs, setIndexs] = useState([]);
  const [nfts, setNfts] = useState([]);

  // Function to load the info of the user
  // Token Balance
  const loadUserInfo = () => {
    // Token Balance Contract Option
    let options_info = {
      contractAddress: contract.contracts.Main.address,
      functionName: "TokenBalance",
      abi: ABI.abi,
      params: {
        account: account,
      },
    };

    // Sell the tokens on Success => (Do Something)
    contractProcessor.fetch({
      params: options_info,
      onSuccess: (value) => {
        let data = HexToDec(value);
        setTokenBalance(Math.round(data / 10 ** 18));
      },
    });
  };

  // Function to load and act, the Index of nfts
  const loadIndexNft = () => {
    // Options of the indexs
    let options_index = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetStudentsByOwner",
      abi: ABI.abi,
      params: {
        owner: account,
      },
    };

    // Calling the contract function GetStudentsByOwner
    contractProcessor.fetch({
      params: options_index,
      onSuccess: async (result: any) => {
        let values = [];
        for (let entry of result) {
          let value = HexToDec(entry);
          values.push(value);
        }
        await setIndexs(values);
      },
    });
  };

  // Function that load all the objects of nfts
  // Get the TokenUri and make a Fetch
  // If the nfts doesn`t have token uri, it doesn`t count for the game...
  // Make sure to accept the token uri set transaction
  const loadNfts = async () => {
    // Array to save the nftss
    let students = [];
    for (let index = 0; index < indexs.length; index++) {
      let indexKey = indexs[index];
      
      // Options of students info
      let id_options = {
        contractAddress: contract.contracts.Main.address,
        functionName: "GetStudentInfo",
        abi: ABI.abi,
        params: {
          studentIndex: indexKey,
        },
      };

      // Calling the contract function GetStudentInfo
      await contractProcessor.fetch({
        params: id_options,
        onSuccess: async (result: any) => {
          const id = HexToDec(result[5]);
          const intelligence:number = HexToDec(result[1]);
          const market = result[6];

          // Search The Index By Id
          let optionIndex = {
            contractAddress: contract.contracts.Main.address,
            functionName: "GetStudentIndexById",
            abi: ABI.abi,
            params: {
              id: id,
            },
          };

          // Calling the contract function GetStudentIndexById
          await contractProcessor.fetch({
            params: optionIndex,
            onSuccess: async (result) => {
              const index = HexToDec(result);

              // Option to get the token Uri
              let tokenURIOption = {
                contractAddress: contract.contracts.Main.address,
                functionName: "GetTokenURI",
                abi: ABI.abi,
                params: {
                  studentId: id,
                },
              };

              // Getting the Token Uri
              await contractProcessor.fetch({
                params: tokenURIOption,
                onSuccess: async (result: string) => {
                  if (!result) {
                  } else {
                    // Fetch to the token uri and getting the data
                    const res = await fetch(result);
                    const data = await res.json(); // Data from Uri
                    // Saving the Data
                    students.push({
                      type: data.type,
                      name: data.name,
                      atributes: {
                        iq: intelligence ,
                        level: data.atributes[0].value,
                        cheat: data.atributes[2].value,
                      },
                      id: id,
                      indexId: index,
                      image: data.image,
                      market: market,
                    });
                    // Push the data array object
                    setNfts(students);
                  }
                },
                onError: (e) => {
                },
              });
            },
          });
        },
        onError: (e) => {
        },
      });
    }
  };

  return { tokenBalance, loadUserInfo, loadIndexNft, indexs, loadNfts, nfts };
};
