// React
import { useState } from "react";
// Info Json
import ABI from "./../src/ganache-local/contracts/StudentsMain.json";
import contract from "./../src/contract-config.json";
// Moralis
import { useWeb3ExecuteFunction } from "react-moralis";
// Custom Hooks
import { useBigNumber } from "./useBigNumber";
import { useGetRandom } from "./useGetRandom";

// custom hook made for game info manipulation using moralis, json and react hooks
// To interact with all these functions u need to have an signed metamask user
export const useAttack = () => {
  // Initialize hooks
  const contractProcessor = useWeb3ExecuteFunction();
  // Value of level
  const [levelInfo, setLevelInfo] = useState([]);
  // Custom Hooks
  const { HexToDec } = useBigNumber();
  const { random } = useGetRandom()

  // function to play or attack a level
  const attackNft = (levelId, index) => {
    // Get a random value
    const randomValue  = random()
    // Options of attack
    let option_attack = {
      contractAddress: contract.contracts.Main.address,
      functionName: "Attack",
      abi: ABI.abi,
      params: {
        studentIndex: index,
        levelNumber: levelId,
        random: randomValue
      },
    };
    // call contract function Attack
    // onSuccess => (Do Something)
    contractProcessor.fetch({
      params: option_attack,
      onSuccess: async () => {
        console.log("Nft Transfered");
      },
    });
  };

  // function to load the info from the level
  const loadLevelInfo = async () => {

    let levels = []; // Array to save all the info
    
    for (let level = 1; level < 11; level++) {
      // Get Total attack price
      let option_attackPrice = {
        contractAddress: contract.contracts.Main.address,
        functionName: "GetTotalAttackPrice",
        abi: ABI.abi,
        params: {
          level: level,
        },
      };
      // Call contract function GetTotalAttackPrice
      await contractProcessor.fetch({
        params: option_attackPrice,
        onSuccess: async (result) => {
          let data = HexToDec(result);
          const attackPrice = Math.round(data / 10 ** 18);

          // Get Total Power Level
          let option_powerLevel = {
            contractAddress: contract.contracts.Main.address,
            functionName: "GetPowerLevel",
            abi: ABI.abi,
            params: {
              level: level,
            },
          };
          // Call contract function GetPowerLevel
          await contractProcessor.fetch({
            params: option_powerLevel,
            onSuccess: async (result) => {
              const powerLevel = HexToDec(result);

              // Get Reward
              let option_reward = {
                contractAddress: contract.contracts.Main.address,
                functionName: "Reward",
                abi: ABI.abi,
                params: {
                  level: level,
                },
              };
              // Call contract function Reward
              await contractProcessor.fetch({
                params: option_reward,
                onSuccess: async (result) => {
                  let data = HexToDec(result);
                  const reward = Math.round(data / 10 ** 18);
                  levels.push({
                    attackPrice: attackPrice,
                    powerLevel: powerLevel,
                    reward: reward - 20,
                  });
                },
              });
            },
          });
        },
      });
    }
    // set the array levels to useState Variable
    setLevelInfo(levels);
  };

  return { attackNft, loadLevelInfo, levelInfo };
};
