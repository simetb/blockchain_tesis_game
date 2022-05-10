# Importing de Main Contract
from brownie import StudentsMain
# Importing the Helpful Scripts
from scripts.helpful_scripts import *

def marketplace_options(account):
    
    contract = None

    # Getting the last contract
    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        #Selecting an option
        line_space()
        option = select_option(["Vender Nft","Comprar Nft","Sacar mi Nft del marketplace","Volver"],"Recuerda tener una cuenta seleccionada para interactuar con estas funciones")
        line_space()

        if option == 1:
            print("Factura por Vender un NFT 10 UJG")
            # Selecting the nft
            nft = select_nft(contract,account)
            # Put the nft in the Market Place
            put_in_market(contract,account,nft)

        elif option == 2:
            #  Buy an Nft in market
            buy_ntf_in_market(contract,account)
        
        elif option == 3:
            print("Factuar por sacar un nft del market 10 UJG")
            # Get Out My Nft from the market
            nft = select_nft(contract,account)
            get_out_of_market(contract,account,nft)

    else:
        print("No se ha encontrado ningun contrato inteligente desplegado")

# Function to put an Nft in the marketplace
# Amount: Price of the Nft
def put_in_market(contract,account,nft):
    # Avoiding Input Error
    while True:
        try:
            amount = float(input("Precio UJG: "))
            amount = amount * 10 ** 18
            break
        except:
            print("Invalid Input")
    # Calling the contract
    market_tx = contract.PutInMarket(nft,amount,{"from":account})
    print(market_tx.events['NftOperation'])
    print("Nft Puesto en el Market")

# Function to get out the nft of the owner from the marketplace
def get_out_of_market(contract,account,nft):
    market_tx = contract.GetOutMarket(nft,{"from":account})
    print(market_tx.events['NftOperation'])
    # Calling the contract
    print("Nftsacado del market")

# Function that buy an nft in the marketplace
def buy_ntf_in_market(contract,account):
    # Select the nft 
    selected = select_nft_market(contract)
    # Calling the contract
    market_tx = contract.BuyMarket(selected,{"from":account})
    print(market_tx.events['NftOperation'])
    print("Nft Comprado")

# Function that select an nft from the market
def select_nft_market(contract):
    # Get the nft in marketplace
    nfts = contract.GetTotalNftInMarket()
    print(nfts)
    # Select the nft
    # Avoid Input Error
    while True:
        try:
            select = int(input("Index Nft: "))
            break
        except:
            print("Invalid Input")
    return select

# Function to select the Nft
def select_nft(contract,account):

    # Getting the nft owner amount
    amoun_nft = contract.GetNumbersNft(account)
    select = None

    # Getting the info
    if amoun_nft != 0:
        Students_indexs = contract.GetStudentsByOwner(account)
        print(Students_indexs)
        selection = True

        # Selecting the nft
        while selection:
            select = int(input("Nft Index: "))
            for index in Students_indexs:
                print(index)
                if select == index:
                    print("Nft Seleccionado")
                    selection = False
            else:
                print("El Nft seleccionado no existe") 

    else:
        print("Esta cuenta no tiene nfts")
    
    return select
