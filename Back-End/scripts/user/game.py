from scripts.helpful_scripts import *; 
from brownie import StudentsMain

def attack(account):
    contract = None

    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        nft = select_nft(contract,account)
        print(nft)
        if nft != None:
            level = select_level()
            tx = contract.Attack(nft,level,{"from":account})
            tx.wait(1)
            print(tx.events["ResultAttack"])

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


def select_level():
    level_number = int(input("Level Number MAX 10 MIN 1: "))
    while level_number > 10 or level_number < 1:
        level_number = int(input("Level Number MAX 10 MIN 1: "))
        print("Level Number Invalid")
    return level_number