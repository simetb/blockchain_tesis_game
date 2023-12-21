# Importing Helpfuls Scripts
from scripts.helpful_scripts import *
# Importing the main contract
from brownie import(StudentsMain)

# Function that get the nft options to the user
def nft_option(account):

    contract = None

    # Getting the last deployed contract
    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        # Getting the option
        line_space()
        option = select_option(["Crear Nft","Quemar Nft","Volver"],"Recuerda tener una cuenta seleccionada para interactuar con estas funciones")
        line_space()

        if option == 1:
            # Getting the price of the nft
            price = contract.GetNftPrice()
            print(f"Precio de creacion de un NFT - {price/10**18}UJG")
            # Create an Nft
            create_nft(contract,account)
        
        elif option == 2:
            # Burn an Nft
            burn_nft(contract,account)

    else:
        print("No se ha encontrado ningun contrato inteligente desplegado")

# Function to create an nft
def create_nft(contract,account):
    # Getting the random Number(Recomended only for local test)
    random = getRandomness()
    # Calling the contract
    tx = contract.CreateNftStudent(random,{"from":account})
    tx.wait(1)
    print("Random NFT Creado!")
    print(f"Tu Tienes: {contract.GetNumbersNft(account)} Students Creados")
    print(tx.events["NftCreated"])

# Function to burn the nft
def burn_nft(contract,account):
    # Get students by owner
    print(contract.GetStudentsByOwner(account))
    # Avoid Input error
    try:
        index = int(input("Nft Index: "))
        contract.BurnNft(index,{'from':account})
        print(f"NFT {index} Quemado")
    except:
        print("Entrada Invalida")
    