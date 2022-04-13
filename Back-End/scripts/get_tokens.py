from scripts.helpful_scripts import *
from brownie import(
    TokenUJG
)

contract = TokenUJG[-1]

ammount = 500

def get_token():
    account = get_account()

    tx_mint = contract.mint(ammount,account,{"from":account})

    tx_mint.wait(1)

    print(f"You get {contract.getBalance(account)} Minted!")

def main():
    get_token()