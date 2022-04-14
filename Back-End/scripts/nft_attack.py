from scripts.helpful_scripts import *; 
from brownie import StudentsMain, TokenUJG

contract = StudentsMain[-1]
contract_token = TokenUJG[-1]
account = get_account()

def nft_attack():
    students = contract.getStudentsByOwner(account)
    print(f"Token: {contract_token.getTokenBalance(account)}")
    for student in students:
        fund_with_link(contract)
        tx = contract.attack(student, 1,{"from":account})
        tx.wait(1)
        print(tx.events["ResultAttack"])
        print()
    print(f"Token: {contract_token.getTokenBalance(account)}")

def main():
    nft_attack()