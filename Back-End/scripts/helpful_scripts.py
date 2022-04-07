from brownie import (
    accounts,
    network,
    config,
    interface,
    )
from web3 import Web3

# Locals Blockchains...
LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local", "mainnet-fork-dev"]

# Get the account
def get_account(index=None, id=None):
    print(network.show_active())
    if index:
        return accounts[index]
    elif network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    elif id:
        return accounts.load(id)
    elif network.show_active() in config["networks"]:
        return accounts.add(config["wallets"]["from_key"])


# Fun with link the contract to use randomness functions
def fund_with_link(contract_address, account=None,amount=100000000000000000):
    account = account if account else get_account()
    link_token_contract = interface.LinkTokenInterface(config["networks"][network.show_active()]["link_token"])
    tx = link_token_contract.transfer(contract_address,amount,{"from":account})
    tx.wait(1)
    print("Fund Contract!")

