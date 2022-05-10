# Importing the main contract
from brownie import StudentsMain
# Importing all helpful script
from scripts.helpful_scripts import *

# Function that have all the options to transfer
def transfer_options(primary_account,secundary_account):
    
    contract = None

    # Select the last deployed contract
    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        # Get an option
        line_space()
        option = select_option(["Transferir NFT","Transferir Token","Volver"],"ADVERTENCIA! Necesitas tener seleccionada dos cuentas (PRINCIPAL Y SECUNDARIA) para interactuar con estas funciones")
        line_space()

        if option == 1:
            #Transfer the nfts
            transfer_nft(contract,primary_account,secundary_account)
        
        elif option == 2:
            #Transfer Token
            transfer_token(contract,primary_account,secundary_account)

        
    else:
        print("No hemos encontrado un contrato inteligente desplegado")

# Function to transfer the nft
def transfer_nft(contract,primary_account,secundary_account):
    # Get the nft
    index = select_nft(contract,primary_account)
    if index != None:
        # Calling the contract
        transfer_tx =  contract.TransferNft(
            primary_account,
            secundary_account,
            index,
            {"from":primary_account}
        )
        transfer_tx.wait(1)
        print(transfer_tx.events["NftOperation"])
        print("NFT Transferido")

# Function to transfer the token
def transfer_token(contract,primary_account,secundary_account):
    # Avoid Input Error
    while True:
        try:
            amount = float(input("Cantidad UJG: "))
            break
        except:
            print("Entrada Incorrecta")
    
    if amount > 0:
        # Calling the contract
        transfer_tx = contract.TransferToken(
            secundary_account,
            amount*10**18,
            {"from":primary_account}
        )
        transfer_tx.wait(1)
        print(transfer_tx.events["TokenOperation"])
        print("Tokens Transferidos")
        

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