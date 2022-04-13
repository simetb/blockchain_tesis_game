from re import L
from venv import create
from eth_typing import Address
from requests import get
from scripts.helpful_scripts import *
from brownie import(
    StudentsMain
)

account = get_account()
contract = StudentsMain[-1]

def create_nft():
    fund_with_link(contract)
    contract.requestRandomness({"from":account})
    tx = contract.createNftStudent({"from":account})
    tx.wait(1)
    print("Random NFT Created!")
    print(f"You have: {contract.nftOwnerCount(account)} Students")


def main():
    create_nft()