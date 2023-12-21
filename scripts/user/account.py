# Importing the main contract
from brownie import (StudentsMain)
# Importing all the helpful scripts
from scripts.helpful_scripts import *;

# Function that get the info of thea account
def info_account(account):
    
    contract = None

    # Get the last contract
    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        #Selectiong an option
        line_space()
        option = select_option(["Token Info","Nft Info","Volver"],"Recuerda Tener una cuenta seleccionada para interactuar con estas funciones")
        line_space()

        if option == 1:
            # Get the Token info of the user
            token_info(contract,account)

        elif option == 2:
            # Get the info of the nfts
            nft_info(contract,account)

    else:
        print("No hemos encontrado un contrato inteligente desplegado")

# Function that  get the account token info
def token_info(contract,account):
    # Getting the amount of tokens from the account
    amount = contract.TokenBalance(account)
    amount = amount/10**18
    print(f"Esta cuenta tiene - {amount}UJG")

# Function that get account nft info
def nft_info(contract,account):
    # Geting the info of the nfts
    amount = contract.GetNumbersNft(account)
    print(amount)
    nfts_index = contract.GetStudentsByOwner(account)
    print(nfts_index)
    for index in nfts_index:
        print(contract.GetStudentInfo(index))






   