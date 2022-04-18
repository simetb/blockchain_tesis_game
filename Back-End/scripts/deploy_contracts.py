from brownie import StudentsMain,TokenUJG, config, network
from scripts.helpful_scripts import *;

# Default Contract Game Variables
NFT_PRICE = 100
WEAR_MULTIPLICATOR = ATTACK_MULTIPLICATOR = REWARD_MULTIPLICATOR = 1
BURN_REWARD = 50
TOKEN_POOL = 100000
TRANSFER_PRICE = 20

def deploy_contracts():
    print(f"Deploying contract in {network.show_active()} network")

    # Main Account
    account = get_account()

    # Token Contract - {ERC20} {Ownable}
    token_ERC20 = TokenUJG.deploy(
        {"from":account}
    )

    # Nft Main Contract - {StudentsNft}
    # {StudentsNft} - {ERC721} {VRFConsumerBase} {Ownable}
    """
        Constructor solidity ref:
        
        - address _VRFCoordinator 
        - address _linkToken 
        - bytes32 _keyhash 
        - address _tokenAddress
        - uint256 nftPrice
        - uint256 wearMultiplicator
        - uint256 attackMultiplicator
        - uint256 rewardPriceMultiplicator
        - uint256 tokenPool,
        - uint256 burnReward,
        - uint256 transferPrice

    """
    main_contract = StudentsMain.deploy(
        get_contract("vrf_coordinator").address,
        get_contract("link_token").address,
        config["networks"][network.show_active()]["keyhash"],
        token_ERC20.address,
        NFT_PRICE,
        WEAR_MULTIPLICATOR,
        ATTACK_MULTIPLICATOR,
        REWARD_MULTIPLICATOR,
        TOKEN_POOL,
        BURN_REWARD,
        TRANSFER_PRICE,
        {"from":account}
    )

    print(f"Contracts Owner - {token_ERC20.GetOwner()}")
    
    print(f"You can see the Contract Token Address: {token_ERC20.address} in {network.show_active()}")

    print(f"You can see the Contract MainContract Address: {main_contract.address} in {network.show_active()}")

    print("- WARNING! - The actual main contract doesn't have any ETH funded, Please fund some ETH")

# Default Brownie Function
def main():
    deploy_contracts()