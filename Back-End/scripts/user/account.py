from scripts.helpful_scripts import *;
from brownie import (StudentsMain)

def info_account(account):
    contract = None

    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        line_space()
        option = select_option(["Token Info","Nft Info","Go Back"],"Remember U need to have a selected account to interact with these functions")
        line_space()

        if option == 1:
            token_info(contract,account)
        elif option == 2:
            nft_info(contract,account)

    else:
        print("We cannot found a deployed contract")

def token_info(contract,account):
    amount = contract.TokenBalance(account)
    amount = amount/10**18
    print(f"This Account Have - {amount}UJG")

def nft_info(contract,account):
    amount = contract.GetNumbersNft(account)
    print(amount)
    nfts_index = contract.GetStudentsByOwner(account)
    print(nfts_index)
    for index in nfts_index:
        print(contract.GetStudentInfo(index))






   