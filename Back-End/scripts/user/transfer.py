from brownie import StudentsMain
from scripts.helpful_scripts import *

def transfer_options(primary_account,secundary_account):
    contract = None

    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        line_space()
        option = select_option(["Transfer NFT","Transfer Token","Go Back"],"WARNING! You need have 2 accounts selected (Primary and Secundary) to interact with these functions")
        line_space()

        if option == 1:
            transfer_nft(contract,primary_account,secundary_account)
        elif option == 2:
            transfer_token(contract,primary_account,secundary_account)

        
    else:
        print("We cannot found a deployed contract")

def transfer_nft(contract,primary_account,secundary_account):
    index = select_nft(contract,primary_account)
    if index != None:
        transfer_tx =  contract.TransferNft(
            primary_account,
            secundary_account,
            index,
            {"from":primary_account}
        )
        transfer_tx.wait(1)
        print(transfer_tx.events["NftOperation"])
        print("NFT Transfered")

def transfer_token(contract,primary_account,secundary_account):
    amount = float(input("Amount UJG: "))
    if amount > 0:
        transfer_tx = contract.TransferToken(
            secundary_account,
            amount*10**18,
            {"from":primary_account}
        )
        transfer_tx.wait(1)
        print(transfer_tx.events["TokenOperation"])
        print("Tokens Transfered")
        

def select_nft(contract,account):
    amoun_nft = contract.GetNumbersNft(account)
    select = None
    if amoun_nft != 0:
        Students_indexs = contract.GetStudentsByOwner(account)
        print(Students_indexs)
        selection = True
        while selection:
            select = int(input("Nft Index: "))
            for index in Students_indexs:
                print(index)
                if select == index:
                    print("Nft Selected")
                    selection = False
            else:
                print("The Selected Nft Doesnt Exist") 

    else:
        print("This account got 0 Nfts Minted")
    
    return select