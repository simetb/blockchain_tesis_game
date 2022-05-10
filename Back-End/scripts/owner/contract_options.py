# Helpful scripts functions
from scripts.helpful_scripts import *

# Contract
from brownie import StudentsMain

# Option of the contract
def contract_options(owner_account):
    
    # Looking for an existing contract
    contract = None
    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        # Selec an option in console
        line_space()
        option = select_option(["Informacion de Contrato","Nuevo Precio de Transferencia","Nueva Recompensa de Quema","Nuevo Token ERC20","Nuevo Multiplicador de Recompensa","Nuevo Multiplicador de Desgaste ","Nuevo Multiplicador de Precio de Ataque","Nuevo Precio de Nft","Nueva Tiempo de Cola de Pelea","Volver"],"Estas en las opciones de contrato, recuerda solo el admin del contrato puede interactuar con el contrato")
        line_space()


        if option == 1:
            # Getting all the info of the contract
            contract_info(contract)

        elif option == 2:
            # Set a new transfer price for the Nftss
            set_transfer_price(contract,owner_account)

        elif option == 3:
            # Set a new burn reward
            set_burn_reward(contract,owner_account)

        elif option == 4:
            # Set a new address for the token in the game
            # 
            # Warning:
            #
            # if you set a new token address you need to Mint new tokens for the contract
            # the old tokens will be unusable
            set_token_erc20_address(contract,owner_account)

        elif option == 5:
            # Set a new reward multiplicator
            set_reward_multiplicator(contract,owner_account)

        elif option == 6:
            # Set a new wear multiplicator
            set_wear_multiplicator(contract,owner_account)

        elif option == 7:
            # Set a new attack price multiplicator
            set_attack_price_multiplicator(contract,owner_account)

        elif option == 8:
            # Set a new Nft Mint Price
            set_nft_price(contract,owner_account)

        elif option == 9:
            # Set a new Nft Cooldown price
            set_cooldown_time(contract,owner_account)
    else:
        print("No hemos encontrado un contrato inteligente desplegado")

# Function that get all the info of the contract
def contract_info(contract):
    # Address of the contract (MAIN CONTRACT)
    print(f"DIRECCION DE CONTRATO - {contract.address}")
    # Nft Mint price
    print(f"PRECIO NFT - {contract.GetNftPrice()/10**18}UJG")
    # Nft Cooldown time 
    print(f"TIEMPO DE COOLDOWN - {contract.GetCoolDownTime()} TIME")
    # Number of nft in the game
    print(f"NFTS EN EL JUEGO - {contract.GetTotalNftInGame()} NFTS")
    # Number of nft in the marketplace
    print(f"NFTS EN EL MARKETPLACE - {contract.GetTotalNftInMarket()} NFTS")
    # The reward for burn an Nft
    print(f"RECOMPENSA DE QUEMA - {contract.GetBurnReward()/10**18} UJG")
    # The price for transfer an Nft
    print(f"PRECIO DE TRANSFERENCIA - {contract.GetTransferPrice()/10**18} UJG")
    # Reward multiplicator (This reward is just if you win a battle)
    print(f"MULTIPLICADOR DE RECOMPENSA - X{contract.GetRewardMultiplicator()}")
    # Wear multiplicator (This will be aplicated after an battle)
    print(f"MULTIPLICADOR DE DESGASTE - X{contract.GetWearMultiplicator()}")
    # Attack Price Multiplicator
    print(f"MUTLIPLICADOR DE PRECIO POR ATACAR - X{contract.GetAttackPriceMultiplicator()}")

# Function that set a new transfer nft price
# Amount: The amount of the new transfer price
def set_transfer_price(contract,owner):
    # Get the amount (avoiding mistake)
    while True:
        try:
            amount = float(input("Cantidad UJG:"))
            amount = amount * 10 ** 18
            break
        except:
            print("Entrada Invalida")
    # Calling the function of the contract
    contract.SetTransferPrice(amount,{"from":owner})
    print("Nuevo precio de transferencia seleccionado")

# Function that set a new burn reward
# Amount: new burn  reward
def set_burn_reward(contract,owner):
    # Get the amount (avoiding mistake)
    while True:
        try:
            amount = float(input("Cantidad UJG:"))
            amount = amount * 10 ** 18
            break
        except:
            print("Entrada Invalida")
    # Calling the function of the contract
    contract.SetBurnReward(amount,{"from":owner})
    print("Nueva Recompensa de Quemado")

# Function that set the new token ERC20
# Address: Address of the new Token ERC20 contract
def set_token_erc20_address(contract,owner):
    # Ref 0x0....
    address = str(input("Nueva Token Address:"))
    # Calling the function to set a new ERC20 Token
    contract.SetTokenERC20Address(address,{"from":owner})
    print("Nuevo Token Puesto,\nAdvertencia: El contrato probablemente no tenga Tokens Creados, ve a las opciones de contrato a obtener unos tokens")

# Function that set a new reward multiplicator
# Amount: Reward Multiplicator Int
def set_reward_multiplicator(contract,owner):
    # Get the amount (avoiding mistake)
    while True:
        try:
            amount = int(input("Multiplicador X: "))
            break
        except:
            print("Entrada Invalida")
    # Calling the contract
    contract.SetRewardMultiplicator(amount,{"from":owner})
    print("Nuevo Multiplicador de Recompensa")

# Function that set a new wear Multiplicator
# Amount: Wear Multiplicator Int
def set_wear_multiplicator(contract,owner):
    # Get the amount (avoiding mistake)
    while True:
        try:
            amount = int(input("Multiplicador X: "))
            break
        except:
            print("Entrada Invalida")
    # Calling the contract
    contract.SetWearMultiplicator(amount,{"from":owner})
    print("Nuevo Multiplicador de Desgaste")

# Function that set a new attack price multiplicator
# Amount: Attack price multiplicator int
def set_attack_price_multiplicator(contract,owner):
    # Get the amount (avoiding mistake)
    while True:
        try:
            amount = int(input("Multiplicador X: "))
            break
        except:
            print("Entrada Invalida")
    # Calling the contracts 
    contract.SetAttackPriceMultiplicator(amount,{"from":owner})
    print("Nuevo Multiplicador de Precio de Ataque")

# Function that set a new nft mint price
# Amount: Price of the mint
def set_nft_price(contract,owner):
    # Get the amount (avoiding mistake)
    while True:
        try:
            amount = float(input("Cantidad UJG:"))
            amount = amount * 10 ** 18
            break
        except:
            print("Entrada Invalida")    
    # Calling the contract
    contract.SetNftPrice(amount,{"from":owner})
    print("Nuevo Precio de Nft")

# Function that set a new cooldow time
def set_cooldown_time(contract,owner):
    # Get the time (avoiding mistake)
    while True:
        try:
            time = int(input("Hours: "))
            time *= 3600
            break 
        except:
            print("Entrada Invalida")
    # Calling the contract
    contract.SetCoolDownTime(time,{"from":owner})
    print("Nuevo CooldownTime")