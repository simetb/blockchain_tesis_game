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
  const [nftsMarket, setNftsMarket] = useState([]);
  const [infoNfts, setInfoNfts] = useState([]);

  // Function to put an nft in market
  //
  // - Requirements:
  //
  // index: Nft
  // price: Price of the nft of the owner need to be uint
  const putInMarket = (index, price) => {
    console.log(index);

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
        alert("Nft In marketPlace");
      },
    });
  };

  // Function to get out the owner nft from market
  // needs index from the nft
  //
  // - Requirements:
  //
  // Only the owner of the nft can execute this function
  const getOutMarket = async (index) => {
    console.log(index);

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
        alert("nft outside the marketplace");
      },
      onError: (e) => {
        //console.log(e)
      },
    });
  };

  // Function to get the total number of nft in market
  // with that total number create an array to select one and return it
  const getTotalNftInMarket = async () => {
    let TotalNft = []; // select array

    // options to get the number of nft and create array
    let options_number_nfts = {
      contractAddress: contract.contracts.Main.address,
      functionName: "GetTotalNftInMarket",
      abi: ABI.abi,
    };

    // call function contract GetTotalNftInMarket
    contractProcessor.fetch({
      params: options_number_nfts,
      onSuccess: async (result) => {
        const amount = HexToDec(result);

        for (let index = 0; index < amount; index++) {
          TotalNft.push(index);
        }
      },
      onError: (e) => {
        console.log(e);
      },
    });
    // Select result array
    setNftsMarket(TotalNft);
  };

  // function that load all the info of the nfts
  const loadInfoNfts = async () => {
    let totalInfo = [];// array object
    // Get all the info
    for (let index = 0; index < nftsMarket.length; index++) {
      
      // options forg get the stats with the market index
      let options_info = {
        contractAddress: contract.contracts.Main.address,
        functionName: "GetNftInMarket",
        abi: ABI.abi,
        params: {
          marketIndex: index,
        },
      };

      // call contract function GetNftInMarket
      await contractProcessor.fetch({
        params: options_info,
        onSuccess: async (result) => {
          const idMarket = HexToDec(result[0]);
          const price = HexToDec(result[1]);

          // optionf of the info of the nft in market
          let options_nft = {
            contractAddress: contract.contracts.Main.address,
            functionName: "GetStudentInfo",
            abi: ABI.abi,
            params: {
              studentIndex: idMarket,
            },
          };

          // call contract function GetStudentInfo
          contractProcessor.fetch({
            params: options_nft,
            onSuccess: async (result) => {
              const iq = HexToDec(result[1]);
              const id = HexToDec(result[5]);

              // Get the token uri to get the image and the fix stats
              let tokenURIOption = {
                contractAddress: contract.contracts.Main.address,
                functionName: "GetTokenURI",
                abi: ABI.abi,
                params: {
                  studentId: id,
                },
              };

              // call contract function GetTokenURI
              // only the nfts that got a token uri can be show in the market
              await contractProcessor.fetch({
                params: tokenURIOption,
                onSuccess: async (result: string) => {
                  if (!result) {
                    console.log("Nft does`nt have token URI!");
                  } else {
                    const res = await fetch(result);
                    const data = await res.json();
                    totalInfo.push({
                      name: data.name,
                      atributes: {
                        iq: iq,
                        level: data.atributes[0].value,
                        cheat: data.atributes[2].value,
                      },
                      idStudent: id,
                      idMarket: idMarket,
                      image: data.image,
                      price: price/10**18,
                    });

                    setInfoNfts(totalInfo);
                  }
                },
                onError: (e) => {
                  console.log(e);
                },
              });
            },
            onError: (e) => {
              console.log(e);
            },
          });
        },
        onError: (e) => {
          console.log(e);
        },
      });
    }
    console.log(totalInfo);
  };

  // Function to buy an nft in the marketplace
  // u need to have the full amount
  // and select the nft in the respecting view
  const buyNft = (index) => {
    // options buy in market 
    let options_info = {
      contractAddress: contract.contracts.Main.address,
      functionName: "BuyMarket",
      abi: ABI.abi,
      params: {
        marketIndex: index,
      },
    };

    // Call contract function BuyMarket
    contractProcessor.fetch({
      params: options_info,
      onSuccess: () => {
        alert("Nft Buyed");
      },
      onError: (e) => {
        alert(e);
      },
    });
    console.log("Buying Nft");
  };

  return {
    putInMarket,
    getOutMarket,
    getTotalNftInMarket,
    nftsMarket,
    loadInfoNfts,
    infoNfts,
    buyNft,
  };
};
