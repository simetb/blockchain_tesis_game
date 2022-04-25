from brownie import (accounts,network,config,interface,VRFCoordinatorMock,LinkToken,Contract)
from web3 import Web3

# Blockchains...
FORKED_LOCAL_ENVIROMENTS = ["mainnet-fork","mainnet-fork-dev"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]

# Mocks Contracts
contract_to_mock = {
    "vrf_coordinator": VRFCoordinatorMock,
    "link_token" : LinkToken
}

def line_space():
    print("-"*70)

# Get the account
def get_account(account,secundary,owner):
    #For Local Blockchains
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:

        # get the value option
        value = select_option(["ganache","other"],"You Are Using a Local Blockchain")
        line_space()

        # If you are in ganache local blockchain
        if value == 1:
            # Act the info of the addresses for the usser
            addresses = [values.address for values in accounts]
            addresses = get_info_addresses(account,secundary,owner,addresses)

            # Get the index and return the account
            index = select_option(addresses,f"Active Account {get_gannache_index_account(account)}")
            print("\n Account Selected!")
            return accounts[index-1]

        # If you are in another local blockchain
        else:
            print("\nAccount Selected! - SECUNDARY ACCOUNTS NO AVAILABLE")
            return accounts[0]
    
    # For Mainnets or TestNet Blockchains
    elif network.show_active() in config["networks"]:
        print("\nAccount Selected! - SECUNDARY ACCOUNTS NO AVAILABLE")
        return accounts.add(config["wallets"]["from_key"])

# Get the account index from gannache
def get_gannache_index_account(refer):
    for k in range(len(accounts)):
        if accounts[k].address == refer:
            return(k)

# Get info addresses
def get_info_addresses(account,secundary,owner,info):
    for index,inf in enumerate(info):
        info[index] += (": " + str(Web3.fromWei(accounts[index].balance(),'ether'))+ "ETH ")
    if account:
        info[get_gannache_index_account(account)] += "- PRINCIPAL"
    if secundary:
        info[get_gannache_index_account(secundary)] += "- SECUNDARY"
    if owner:
        info[get_gannache_index_account(owner)] += "- OWNER"
    return info

# Get the contract
def get_contract(contract_name,account):
    contract_type = contract_to_mock[contract_name]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        if len(contract_type) <= 0:
            deploy_mocks(account)
        contract =  contract_type[-1]
    else:
        contrac_address = config["networks"][network.show_active()][contract_name]
        # address
        # ABI
        contract = Contract.from_abi(contract_type._name, contrac_address, contract_type.abi)
    return contract

# Deploy mocks for Local testing
def deploy_mocks(account):
    link_token = LinkToken.deploy({"from": account})
    VRFCoordinatorMock.deploy(link_token,{"from": account})

# Fun with link the contract to use randomness functions
def fund_with_link(contract_address, account,link_token = None):
    link_token = link_token if link_token else get_contract("link_token",account)
    link_token_contract = interface.LinkTokenInterface(link_token)
    total = link_token_contract.balanceOf(account)
    tx = link_token_contract.transfer(contract_address,total,{"from":account})
    tx.wait(1)
    print("Fund Contract!")
    return tx

# Select an option
def select_option(options,message):
    while True:
        try:
            if message:
                print(message)
            [print(f"{index+1}-{option}") for index,option in enumerate(options)]
            answer = int(input("Select: "))
            if answer<=len(options) and answer>=1:
                return answer
            else:
                print("Wrong input...")
        except:
            print("Wrong input...")
