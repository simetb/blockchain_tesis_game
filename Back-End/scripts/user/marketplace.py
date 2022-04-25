from brownie import StudentsMain
from scripts.helpful_scripts import *

def marketplace_options(account):
    contract = None

    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        line_space()
        option = select_option(["Sell Nft","Buy Nft","Get out My Nft","Go Back"],"Remember You need to have an selected account to interact with these functions")
        line_space()

        if option == 1:
            print("Transaction Bill 10 UJG")
            nft = select_nft(contract,account)
            put_in_market(contract,account,nft)
        elif option == 2:
            buy_ntf_in_market(contract,account)
        elif option == 3:
            print("Transaction Bill 10 UJG")
            nft = select_nft(contract,account)
            get_out_of_market(contract,account,nft)

    else:
        print("We cannot found a deployed contract")

def put_in_market(contract,account,nft):
    amount = float(input("Amount UJG: "))
    amount = amount * 10 ** 18
    market_tx = contract.PutInMarket(nft,amount,{"from":account})
    print(market_tx.events['NftOperation'])
    print("Nft put on market")

def get_out_of_market(contract,account,nft):
    market_tx = contract.GetOutMarket(nft,{"from":account})
    print(market_tx.events['NftOperation'])
    print("Nft put oout of market")

def buy_ntf_in_market(contract,account):
    selected = select_nft_market(contract)
    market_tx = contract.BuyMarket(selected,{"from":account})
    print(market_tx.events['NftOperation'])
    print("The Nft was bought ")

def select_nft_market(contract):
    nfts = contract.GetTotalNftInMarket()
    print(nfts)
    select = int(input("Index Nft: "))
    return select

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
