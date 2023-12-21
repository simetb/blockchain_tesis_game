# Importing the main contract
from brownie import(StudentsMain)
# Importing the helpful scripts
from scripts.helpful_scripts import *

# function that get the token pool
def token_pool_options(owner_account):

    contract = None

    # Get the last contract
    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        # Getting the option
        line_space()
        option = select_option(["Crear Tokens","Quemar Token","Token Info","Volver"],"Estas en opciones de token, Recuerda solo el admin puede interactuar con estas funciones")
        line_space()

        if option == 1:
            # Mint new Tokens
            mint_token(owner_account,contract)
        
        elif option == 2:
            # Burn Tokens from the contract
            burn_token(owner_account,contract)

        elif option == 3:
            # Get the info of the token
            info_token(contract)
    else:
        print("No se ha encontrado un contrato inteligente desplegado")


# Function that mint tokens in the con tract
# Amount: The amount of tokens to mint in the contract
def mint_token(owner,contract):
    # Avoiding error input
    while True:
        try:
            amount = float(input("Cantidad de UJG:"))
            amount = amount * 10 ** 18
            break
        except:
            print("Entrada Invalida")
    # Call the contract
    contract.MintTokens(amount,{"from":owner})
    print("Tokens Creados!")

# Function that burn tokens from the contract
# Amount: Amount of UJG to Burn (Ujg = Token)
def burn_token(owner,contract):
    # Avoiding error input
    while True:
        try:
            amount = float(input("Cantidad deUJG:"))
            amount = amount * 10 ** 18
            break
        except:
            print("Entrada Invalida")
    
    contract.BurnTokens(amount,{"from":owner})
    print("Tokens Quemados")

# Funciton that get the info of the token
def info_token(contract):
    tokenPool = contract.GetTokenPool()/10**18 # Get the token Pool
    liquidity = contract.GetLiquidityPool()/10**18 # Get the liquidity pool
    print(f"Balance Contrato - {contract.GetTokenPool()/10**18}UJG")
    print(f"Balance Contrato - {contract.GetLiquidityPool()/10**18}ETH")
    print(f"Precio del Token: 1 UJP = {liquidity/tokenPool}ETH")
    pass