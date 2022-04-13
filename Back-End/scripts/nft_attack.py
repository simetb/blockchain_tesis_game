from unittest import result
from scripts.helpful_scripts import *; 
from brownie import StudentsMain

contract = StudentsMain[-1]
account = get_account()

def nft_attack():
    students = contract.getStudentsByOwner(account)
    for student in students:
        fund_with_link(contract)
        result = contract.attack(student, 1,{"from":account})
        if(result):
            print("Winner")
        else:
            print("Losser")

def main():
    nft_attack()