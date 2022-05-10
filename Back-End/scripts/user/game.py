# Importing Helpful Scripts
from scripts.helpful_scripts import *; 
# Importing the main contract
from brownie import StudentsMain

# Function to attack with th nft
def attack(account):

    contract = None

    # Selecting the existing contract
    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        # Selecting the Nft
        nft = select_nft(contract,account)
        print(nft)

        if nft != None:
            # Select the lv to fight
            level = select_level()

            # Get the result
            random = getRandomness()
            tx = contract.Attack(nft,level,random,{"from":account})
            tx.wait(1)
            print(tx.events["ResultAttack"])


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


# Function to select the level
def select_level():
    # Avoid input error
    while True:
        try:
            level_number = int(input("Nivel MAX 10 MIN 1: "))
            while level_number > 10 or level_number < 1:
                level_number = int(input("Nivel MAX 10 MIN 1: "))
                print("Nivel Invalido")
            break
        except:
            print("Entrada Invalida")
    return level_number