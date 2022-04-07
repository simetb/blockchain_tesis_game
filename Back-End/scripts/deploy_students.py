from brownie import StudentsNft, config, network
from scripts.helpful_scripts import *;

def deploy_and_create():
    account = get_account()

    if len(StudentsNft) <= 0:
        students_nft = StudentsNft.deploy(
            config["networks"][network.show_active()]["vrf_coordinator"],
            config["networks"][network.show_active()]["link_token"],
            config["networks"][network.show_active()]["keyhash"],
            config["networks"][network.show_active()]["fee"],
            {"from":account}
        )
    else:
        students_nft = StudentsNft[-1]
    fund_with_link(students_nft.address,account)

    tx = students_nft.requestRandomness({"from":account})
    tx.wait(1)
    random = students_nft.randomResult()
    print("Random number created!")
    print(random)


def main():
    deploy_and_create()