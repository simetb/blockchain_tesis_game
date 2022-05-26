// React
import { useState } from "react";
// Info Json
import ABI from "./../src/ganache-local/contracts/StudentsMain.json";
import contract from "./../src/contract-config.json";
// Moralis
import { useMoralis , useWeb3ExecuteFunction } from "react-moralis";
// Custom Hooks
import { useBigNumber } from "./useBigNumber";

// custom hook made for market manipulation using moralis, json and react hooks
// To interact with all these functions u need to have an signed metamask user
export const useMarket = () => {
  // Initialize hooks
  const contractProcessor = useWeb3ExecuteFunction();
  const { HexToDec } = useBigNumber();
  const { Moralis } = useMoralis();

  // Save Nfts in market an info
  const [infoNfts, setInfoNfts] = useState([]);

  // Modals
  const [successBuy,setSuccessBuy] = useState(false)
  const [successSell,setSuccessSell] = useState(false)
  const [successOut,setSuccessOut] = useState(false)
  const [errorMarket,setErrorMarket] = useState(false)

  // Function to put an nft in market
  //
  // - Requirements:
  //
  // index: Nft
  // price: Price of the nft of the owner need to be uint
  const putInMarket = (index, price) => {;

    // Options to put in market an nft
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "PutInMarket",
      abi: ABI.abi,
      params: {
        studentIndex: index,
        price: Moralis.Units.ETH(price),
      },
    };

    // Call contract function PutInMarket
    // OnSuccess  => (Do Something)
    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        setSuccessSell(true)
      },onError:(e)=>{
        setErrorMarket(true)
      }
    });
  };

  // Function to get out the owner nft from market
  // needs index from the nft
  //
  // - Requirements:
  //
  // Only the owner of the nft can execute this function
  const getOutMarket = async (index) => {

    // Options of get out
    let options = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetOutMarket",
      abi: ABI.abi,
      params: {
        studentIndex: index,
      },
    };

    // Call contract function GetOutMarket
    // OnSuccess => (Do Something!)
    contractProcessor.fetch({
      params: options,
      onSuccess: async () => {
        setSuccessOut(true)
      },
      onError: (e) => {
        setErrorMarket(true)
      },
    });
  };

  // Function to get the total number of nft in market
  // with that total number create an array to select one and return it
  const getTotalNftInMarket =() => {
    let info_nft = [];
    // options to get the number of nft and create array
    let options_number_nfts = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetStudentsInMarket",
      abi: ABI.abi,
    };

    // call function contract GetStudentsInMarket
    contractProcessor.fetch({
      params: options_number_nfts,
      onSuccess:(result:[]) => {
        const amount_nft = result.length
        console.log(amount_nft)
        for(let value of result){
          let id_nft = HexToDec(value)
          
          let options_info_nft = {
            contractAddress: contract.contracts.Main.address,
            functionName: "GetStudentInfo",
            abi: ABI.abi,
            params:{
              studentIndex: id_nft
            }
          };

          contractProcessor.fetch({
            params: options_info_nft,
            onSuccess:(result) =>{
              const iq = HexToDec(result[1]);
              const id = HexToDec(result[5]);
              const market = result[6];

              let nft_price = {
                contractAddress: contract.contracts.Main.address,
                functionName: "GetStudentPrice",
                abi: ABI.abi,
                params: {
                  studentIndex: id,
                },
              }

              contractProcessor.fetch({
                params:nft_price,
                onSuccess:(result)=>{
                  const price = HexToDec(result)/10**18

                // Get the token uri to get the image and the fix stats
                let tokenURIOption = {
                  contractAddress: contract.contracts.Main.address,
                  functionName: "GetTokenURI",
                  abi: ABI.abi,
                  params: {
                    studentId: id,
                  },
                };

                contractProcessor.fetch({
                  params:tokenURIOption,
                  onSuccess:async (result:any)=>{
                    if(result && market){
                      const res = await fetch(result);
                      const data = await res.json();

                      info_nft.push({
                        name: data.name,
                        atributes: {
                          iq: iq,
                          level: data.atributes[0].value,
                          cheat: data.atributes[2].value,
                        },
                        idStudent: id,
                        image: data.image,
                        price: price,
                      });
                      console.log(info_nft)
                      if(info_nft.length == amount_nft){
                        setInfoNfts(info_nft);
                      }
                    }
                  }
                })

                },onError:(e)=>{
                  console.log(e)
                }
              })
              
            },onError: (e) =>{
            }
          })
        }
      },
      onError: (e) => {
      },
    });
  };


  // Function to buy an nft in the marketplace
  // u need to have the full amount
  // and select the nft in the respecting view
  const buyNft = (index) => {
    
    let options_info = {
      contractAddress: contract.contracts.Main.address,
      functionName: "BuyMarket",
      abi: ABI.abi,
      params: {
        studentIndex: index,
      },
    }

    // Call contract function BuyMarket
    contractProcessor.fetch({
      params: options_info,
      onSuccess: () => {
        setSuccessBuy(true)
        getTotalNftInMarket()
      },
      onError: (e) => {
      setErrorMarket(true)
      },
    });
    
  };

  return {
    putInMarket,
    getOutMarket,
    getTotalNftInMarket,
    infoNfts,
    buyNft,
    successBuy,
    setSuccessBuy,
    successSell,
    setSuccessSell,
    errorMarket,
    setErrorMarket,
    successOut,
    setSuccessOut
  };
};
