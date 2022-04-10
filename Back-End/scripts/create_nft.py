from requests import get
from scripts.helpful_scripts import *
from brownie import(
    StudentsNft
)

def create_nft():
    account = get_account()
    contract = StudentsNft[-1]
    fund_with_link(contract.address,account)
    tx = contract.requestRandomness({"from":account})
    tx.wait(1)
    tx = contract.createNftStudent({"from":account})
    tx.wait(1)
    print("Random NFT Created!")

    result = contract.getStudentsByOwner(account,{"from": account})
    print(contract.nftToOwner(0))
    print(contract.nftOwnerCount(account))
    print(result)

def main():
    create_nft()