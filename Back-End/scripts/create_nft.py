from scripts.helpful_scripts import *
from brownie import(
    StudentsMain
)

account = get_account()
contract = StudentsMain[-1]

def create_nft():
    fund_with_link(contract)
    tx = contract.createNftStudent({"from":account})
    tx.wait(1)
    print("Random NFT Created!")
    print(f"You have: {contract.getNumbersNft(account)} Students")
    print(tx.events["NftCreated"])


def main():
    create_nft()