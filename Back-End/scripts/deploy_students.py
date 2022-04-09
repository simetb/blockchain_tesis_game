from brownie import StudentsNft, config, network
from scripts.helpful_scripts import *;

def deploy_and_create():
    account = get_account()
    if (False):
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
    
    print("Random NFT Created!")
    print(f"You can see the Contract in Address: {students_nft.address} in {network.show_active()}")
    resultado = students_nft.getStudentsByOwner(account,{"from": account})

    print(students_nft.nftToOwner(0))
    print(students_nft.nftOwnerCount(account))
    print(resultado)

    
    
    

def main():
    deploy_and_create()