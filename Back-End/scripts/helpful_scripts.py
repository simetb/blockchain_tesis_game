from brownie import (
    accounts,
    network,
    config,
    interface,
    VRFCoordinatorMock,
    LinkToken,
    Contract
    )
from web3 import Web3

# Blockchains...
FORKED_LOCAL_ENVIROMENTS = ["mainnet-fork","mainnet-fork-dev"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]

# Mocks Contracts
contract_to_mock = {
    "vrf_coordinator": VRFCoordinatorMock,
    "link_token" : LinkToken
}

# Get the account
def get_account(index=None, id=None):
    if index:
        return accounts[index]
    elif network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    elif id:
        return accounts.load(id)
    elif network.show_active() in config["networks"]:
        return accounts.add(config["wallets"]["from_key"])

# Get the contract
def get_contract(contract_name):
    contract_type = contract_to_mock[contract_name]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        if len(contract_type) <= 0:
            deploy_mocks()
        contract =  contract_type[-1]
    else:
        contrac_address = config["networks"][network.show_active()][contract_name]
        # address
        # ABI
        contract = Contract.from_abi(contract_type._name, contrac_address, contract_type.abi)
    return contract

# Deploy mocks for Local testing
def deploy_mocks():
    account = get_account()
    link_token = LinkToken.deploy({"from": account})
    VRFCoordinatorMock.deploy(link_token,{"from": account})

# Fun with link the contract to use randomness functions
def fund_with_link(contract_address, account=None, link_token=None,amount=100000000000000000):
    account = account if account else get_account()
    link_token = link_token if link_token else get_contract("link_token")
    link_token_contract = interface.LinkTokenInterface(link_token.address)
    tx = link_token_contract.transfer(contract_address,amount,{"from":account})
    tx.wait(1)
    print("Fund Contract!")
    return tx