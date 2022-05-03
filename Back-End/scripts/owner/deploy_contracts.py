from brownie import StudentsMain,TokenUJG, config, network
from scripts.helpful_scripts import *;
from scripts.texts import *;
import yaml
import json
import os
import shutil

# Default Contract Game Variables
NFT_PRICE = 100 * 10 ** 18
WEAR_MULTIPLICATOR = ATTACK_MULTIPLICATOR = REWARD_MULTIPLICATOR = 1
BURN_REWARD = 50 * 10 ** 18
TOKEN_POOL = 100000 * 10 ** 18
TRANSFER_PRICE = 20 * 10 ** 18

def custom_state_variables():
    nft_price =  NFT_PRICE
    wear_multiplicator =  WEAR_MULTIPLICATOR
    attack_multiplicator = ATTACK_MULTIPLICATOR
    reward_multiplicator =  REWARD_MULTIPLICATOR
    burn_reward =  BURN_REWARD
    token_pool = TOKEN_POOL
    transfer_price = TRANSFER_PRICE
    while True:
        try:
            line_space()
            answer = select_option(["yes","no"],"Custom NFT Price? - Default 100 UJG ")
            if answer == 0:
                nft_price = int(input("NFT PRICE: "))
            line_space()
            answer = select_option(["yes","no"],"Custom Burn Reward? - Default 50 UJG ")
            if answer == 0:
                burn_reward = int(input("BURN REWARD: "))
            line_space()
            answer = select_option(["yes","no"],"Custom Token Pool? - Default 100.000 UJG ")
            if answer == 0:
                token_pool = int(input("TOKEN POOL: "))
            line_space()
            answer = select_option(["yes","no"],"Custom Transfer Price? - Default 20 UJG ")
            if answer == 0:
                transfer_price = int(input("TRANSFER PRICE: "))
            line_space()
            answer = select_option(["yes","no"],"Custom wear multiplicator? - Default X1 ")
            if answer == 0:
                wear_multiplicator = int(input("WEAR MULTIPLICATOR: "))
            line_space()
            answer = select_option(["yes","no"],"Custom attack multiplicator? - Default X1 ")
            if answer == 0:
                attack_multiplicator = int(input("ATTACK MULTIPLICATOR: "))
            line_space()
            answer = select_option(["yes","no"],"Custom reward multiplicator? - Default X1 ")
            if answer == 0:
                reward_multiplicator = int(input("REWARD MULTIPLICATOR: "))
            print("\nCustom Values Setted!")
            return(nft_price,burn_reward,token_pool,transfer_price,wear_multiplicator,attack_multiplicator,reward_multiplicator)            
        except:
            print("Execution Error...")

def deploy_contracts(account):
    if account:
        # Default Values
        nft_price =  NFT_PRICE
        wear_multiplicator =  WEAR_MULTIPLICATOR
        attack_multiplicator = ATTACK_MULTIPLICATOR
        reward_multiplicator =  REWARD_MULTIPLICATOR
        burn_reward =  BURN_REWARD
        token_pool = TOKEN_POOL
        transfer_price = TRANSFER_PRICE

        line_space()
        option = select_option(["Last Contract","New Deploy"],"Select the last contract or deploy a new one")
        line_space()

        if option == 1:
            return "Selected Last Contrac Owner"
        else:
            option = select_option(["Yes","No"],"Enter Custom Deploy values?")
            
            if option == 1:
                nft_price,burn_reward,token_pool,transfer_price,wear_multiplicator,attack_multiplicator,reward_multiplicator = custom_state_variables()

            line_space()
            print(f"DEPLOYING CONTRACT IN {network.show_active()} network")
            line_space()
            # Token Contract - {ERC20} {Ownable}
            token_ERC20 = TokenUJG.deploy(
                {"from":account}
            )

            # Nft Main Contract - {StudentsNft}
            # {StudentsNft} - {ERC721} {VRFConsumerBase} {Ownable}
            """
                Constructor solidity ref:
                
                - address _VRFCoordinator 
                - address _linkToken 
                - bytes32 _keyhash 
                - address _tokenAddress
                - uint256 nftPrice
                - uint256 wearMultiplicator
                - uint256 attackMultiplicator
                - uint256 rewardPriceMultiplicator
                - uint256 tokenPool,
                - uint256 burnReward,
                - uint256 transferPrice

            """
            main_contract = StudentsMain.deploy(
                get_contract("vrf_coordinator",account).address,
                get_contract("link_token",account).address,
                config["networks"][network.show_active()]["keyhash"],
                token_ERC20.address,
                nft_price,
                wear_multiplicator,
                attack_multiplicator,
                reward_multiplicator,
                token_pool,
                burn_reward,
                transfer_price,
                {"from":account}
            )

            contract_owner = account

            fund_with_link(main_contract,account)

            deployment_values = {
                'contracts':{
                    'Main':{
                        'address': main_contract.address,
                        'owner': account
                    }
                }
            }

            line_space()
            print(f"Contracts Owner - {token_ERC20.GetOwner()}")
            
            print(f"You can see the Contract Token Address: {token_ERC20.address} in {network.show_active()}")

            print(f"You can see the Contract MainContract Address: {main_contract.address} in {network.show_active()}")

            print("- WARNING! - The actual main contract doesn't have any ETH funded, Please fund some ETH to get a initial token price")

            line_space()

            update_front_end(deployment_values)

            return contract_owner
    else:
        print("\nYOU NEED TO HAVE AN ACCOUNT SELECTED!")
        line_space()


def update_front_end(deployment_values):
    # Send the build folder
    copy_folders_to_front_end("./build", f"./TheUjapGame/src/{network.show_active()}")

    # Sending the front end our config in JSON format
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=   yaml.FullLoader)
        with open("./TheUjapGame/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end updated!")

    # Sending the deployments values
    with open("./TheUjapGame/src/contract-config.json", "w") as outfile:
        json.dump(deployment_values,outfile)



def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):   
        shutil.rmtree(dest)
    shutil.copytree(src, dest)