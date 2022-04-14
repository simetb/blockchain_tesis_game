from multiprocessing.connection import wait
from tokenize import Token
from brownie import (
    StudentsMain,
    TokenUJG,
)
from scripts.helpful_scripts import *
from scripts.get_info_account import get_info

nft_contract =  StudentsMain[-1]
token_contract = TokenUJG[-1]
account_owner = get_account(index=0)
account = get_account(index=1)

def transfer_nft():
    get_info(0)
    get_info(1)
    transfer_tx = nft_contract.transferNft(account_owner, account,0,{"from":account_owner})
    transfer_tx.wait(1)
    print("Transfered")

    get_info(0)
    get_info(1)

    burn_tx = nft_contract.burnNft(0,{"from":account})
    burn_tx.wait(1)
    print("Nft Burned")
    get_info(0)
    get_info(1)


def transfer_token():
    get_info(0)
    get_info(1)
    transfer_tx = token_contract.TransferToken(account_owner,account,50,{"from":account_owner})
    transfer_tx.wait(1)
    print("Token Transfered")

    get_info(0)
    burn_tx = token_contract.burnToken(account_owner,50,{"from":account})
    burn_tx.wait(1)
    print("Token Burned")
    get_info(0)


def main():
    transfer_nft()
    transfer_token()
