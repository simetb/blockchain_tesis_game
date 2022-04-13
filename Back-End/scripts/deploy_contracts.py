from brownie import StudentsMain,TokenUJG, config, network
from scripts.helpful_scripts import *;
import os

def deploy_contracts():
    print(f"Infura address...{os.getenv('WEB3_INFURA_PROJECT_ID')}")

    account = get_account()

    token_ERC20 = TokenUJG.deploy(
        {"from":account}
    )

    main_contract = StudentsMain.deploy(
        get_contract("vrf_coordinator").address,
        get_contract("link_token").address,
        config["networks"][network.show_active()]["keyhash"],
        token_ERC20.address,
        {"from":account}
    )

    print(f"You can see the Contract Token Address: {token_ERC20.address} in {network.show_active()}")
    print(f"You can see the Contract MainContract Address: {main_contract.address} in {network.show_active()}")

def main():
    deploy_contracts()