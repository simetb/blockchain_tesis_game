from brownie import StudentsNft, config, network
from scripts.helpful_scripts import *;
import os

def deploy_and_create():
    print(os.getenv("WEB3_INFURA_PROJECT_ID"))
    account = get_account()
    students_nft = StudentsNft.deploy(
        config["networks"][network.show_active()]["vrf_coordinator"],
        config["networks"][network.show_active()]["link_token"],
        config["networks"][network.show_active()]["keyhash"],
        config["networks"][network.show_active()]["fee"],
        {"from":account}
    )    
    print(f"You can see the Contract in Address: {students_nft.address} in {network.show_active()}")

    

def main():
    deploy_and_create()