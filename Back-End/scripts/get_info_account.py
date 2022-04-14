from scripts.helpful_scripts import *;
from brownie import (
    StudentsMain,
    TokenUJG
)

contract_students = StudentsMain[-1]
contract_tokens = TokenUJG[-1]

def get_info(id_account=0):
    account = get_account(id_account)
    print(f"Account: {account.address} ")
    tokens = contract_tokens.getTokenBalance(account)
    print(f"Tokens: {tokens}")
    students = contract_students.getStudentsByOwner(account)
    print(f"Amount of students: {len(students)}")
    for student in students:
        print(contract_students.getStudentStats(student))
    


def main():
    get_info()