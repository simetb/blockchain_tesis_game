from scripts.helpful_scripts import *
from brownie import(
    TokenUJG,
    StudentsMain
)

contract = TokenUJG[-1]
contract_nft = StudentsMain[-1]
account = get_account()
ammount = 500

def get_token():
    tx_mint = contract.mintToken(ammount,account,{"from":account})

    tx_mint.wait(1)

    print(f"You get {contract.getTokenBalance(account)} Minted!")

def contract_get_token():
    tx_mint = contract.mintToken(ammount,contract_nft.address,{"from":account})
    
    tx_mint.wait(1)

    print(f"The contract get {contract.getTokenBalance(account)} Minted!")


def main():
    get_token()
    contract_get_token()
    