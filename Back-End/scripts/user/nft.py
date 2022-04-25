from scripts.helpful_scripts import *
from brownie import(StudentsMain)
from scripts.create_metadata import create_metadata


def nft_option(account):
    contract = None

    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        line_space()
        option = select_option(["Create Nft","Burn Nft","Go Back"],"Remember U need to have a selected account to interact with these functions")
        line_space()

        if option == 1:
            price = contract.GetNftPrice()
            print(f"Create an NFT price - {price/10**18}UJG")
            create_nft(contract,account)
        
        elif option == 2:
            burn_nft(contract,account)

    else:
        print("We cannot found a deployed contract")


def create_nft(contract,account):
    tx = contract.CreateNftStudent({"from":account})
    tx.wait(1)
    print("Random NFT Created!")
    print(f"You have: {contract.GetNumbersNft(account)} Students Minted")
    print(tx.events["NftCreated"])
    #create_metadata()

def burn_nft(contract,account):
    print(contract.GetStudentsByOwner(account))
    index = int(input("Nft Index: "))
    contract.BurnNft(index,{'from':account})
    print(f"NFT {index} Burned")