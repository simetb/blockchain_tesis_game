# Importing contract, config and the network
from brownie import StudentsMain,TokenUJG, config, network
# Importing helpful scripts
from scripts.helpful_scripts import *;\
# Importing the texts
from scripts.texts import *;
# Importing yaml server
import yaml
# Importing Json functions
import json
# Importing Os functions
import os
# Importing shutil functions
import shutil


# Default Contract Game Variables
NFT_PRICE = 100 * 10 ** 18

WEAR_MULTIPLICATOR = ATTACK_MULTIPLICATOR = REWARD_MULTIPLICATOR = 1

BURN_REWARD = 50 * 10 ** 18

TOKEN_POOL = 100000 * 10 ** 18

TRANSFER_PRICE = 20 * 10 ** 18

# Function that change the value of the default variables
def custom_state_variables():
    # Getting the default values
    nft_price =  NFT_PRICE

    wear_multiplicator =  WEAR_MULTIPLICATOR

    attack_multiplicator = ATTACK_MULTIPLICATOR

    reward_multiplicator =  REWARD_MULTIPLICATOR

    burn_reward =  BURN_REWARD

    token_pool = TOKEN_POOL

    transfer_price = TRANSFER_PRICE

    # Avoiding an user input error
    while True:
        try:
            # New Nft Price
            line_space()
            answer = select_option(["Si","No"],"Nuevo Precio Nft? - Default 100 UJG ")
            if answer == 0:
                nft_price = int(input("PRECIO NFT: "))
                nft_price = nft_price * 10 ** 18
            line_space()
            
            # New Burn Reward
            answer = select_option(["Si","No"],"Nueva recompensa de quemado ? - Default 50 UJG ")
            if answer == 0:
                burn_reward = int(input("RECOMPENSA DE QUEMADO: "))
                burn_reward =  burn_reward * 10 ** 18
            line_space()

            # New Initial Token Pool
            answer = select_option(["Si","No"],"Nueva Token Pool? - Default 100.000 UJG ")
            if answer == 0:
                token_pool = int(input("TOKEN POOL: "))
                token_pool = token_pool * 10**18
            line_space()

            # New Transfer Price
            answer = select_option(["Si","No"],"Nuevo Precio de Transferencia? - Default 20 UJG ")
            if answer == 0:
                transfer_price = int(input("PRECIO DE TRANSFERENCIA: "))
                transfer_price = transfer_price * 10**18
            line_space()
            
            # New wear multiplicator
            answer = select_option(["Si","No"],"Nuevo Multiplicador de Desgaste? - Default X1 ")
            if answer == 0:
                wear_multiplicator = int(input("Multiplicador de Desgaste: "))
            line_space()

            # New attack price multiplicator
            answer = select_option(["Si","No"],"Nuevo Multiplicador de Ataque? - Default X1 ")
            if answer == 0:
                attack_multiplicator = int(input("MULTIPLICADOR DE ATAQUE: "))
            line_space()

            # New reward multiplicator
            answer = select_option(["Si","No"],"Nuevo Multiplicador de Recompensa? - Default X1 ")
            if answer == 0:
                reward_multiplicator = int(input("MULTIPLICADOR DE RECOMPENSA: "))
            
            print("\n NUEVOS VALORES DE DESPLIEGUE COLOCADOS!")
            return(nft_price,burn_reward,token_pool,transfer_price,wear_multiplicator,attack_multiplicator,reward_multiplicator)            
        except:
            print("Error de Ejecucion...")

# Function that deploy
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

        # Select the last contract in the blockchain
        line_space()
        option = select_option(["Ultimo Contrato","Nuevo Contrato"],"Seleccionar el ultimo contrato o desplegar un contrato nuevo")
        line_space()
        
        if option == 1:
            return "Ultimo admin contrato seleccionado..."
        
        else:
            # Enter custom values
            option = select_option(["Si","No"],"Valores de Despliegue customizados?")
            
            if option == 1:
                # Functions that get the custom values
                nft_price,burn_reward,token_pool,transfer_price,wear_multiplicator,attack_multiplicator,reward_multiplicator = custom_state_variables()

            # Deploying the contract
            line_space()
            print(f"DESPLEGANDO CONTRATO EN LA RED {network.show_active()}")
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
            
            # Owner of the deployed contract
            contract_owner = account

            # Funding the contract with link to get random values y Testnets and Mainnet
            fund_with_link(main_contract,account)

            # Dicctionary that save the MainContract Features
            deployment_values = {
                'contracts':{
                    'Main':{
                        'address': main_contract.address,
                        'owner': str(contract_owner)
                    }
                }
            }

            line_space()
            print(f"Admin Contrato - {token_ERC20.GetOwner()}")
            
            print(f"Direccion del Contrato del Token: {token_ERC20.address} in {network.show_active()}")

            print(f"Direccion del Contrato Principal: {main_contract.address} in {network.show_active()}")

            print("- CUIDADO! - El contrato principal actualmente no tiene ninguna cantidad de ETH, transfiere un poco de ETH en las opciones de Administrador")

            line_space()
            
            # Update all the Features to the front 
            update_front_end(deployment_values)

            return contract_owner
    else:
        print("\nNECESITAS TENER UNA CUENTA SELECCIONADA!")
        line_space()


def update_front_end(deployment_values):
    # Send the build folder
    copy_folders_to_front_end("./build", f"./TheUjapGame/src/{network.show_active()}")

    # Sending the front end our config in JSON format
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=   yaml.FullLoader)
        with open("./TheUjapGame/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end Actualizado!")

    # Sending the deployments values
    with open("./TheUjapGame/src/contract-config.json", "w") as outfile:
        json.dump(deployment_values,outfile)



def copy_folders_to_front_end(src, dest):
    # Copy the folders to front
    if os.path.exists(dest):   
        shutil.rmtree(dest)
    shutil.copytree(src, dest)