from scripts.helpful_scripts import *
from brownie import StudentsMain

def contract_options(owner_account):
    contract = None

    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:

        line_space()
        option = select_option(["Contract Info","Set Transfer Price","Set Burn Reward","Set New ERC20 Token Address","Set Reward Multiplicator","Set Wear Multiplicator","Set Attack Price Multiplicator","Set Nft Price","Set Nft Cooldown Attack Time","Go Back"]," You are in Contract Options!, Remember only the owner can interact with these functions")
        line_space()

        if option == 1:
            contract_info(contract)
        elif option == 2:
            set_transfer_price(contract,owner_account)
        elif option == 3:
            set_burn_reward(contract,owner_account)
        elif option == 4:
            set_token_erc20_address(contract,owner_account)
        elif option == 5:
            set_reward_multiplicator(contract,owner_account)
        elif option == 6:
            set_wear_multiplicator(contract,owner_account)
        elif option == 7:
            set_attack_price_multiplicator(contract,owner_account)
        elif option == 8:
            set_nft_price(contract,owner_account)
        elif option == 9:
            set_cooldown_time(contract,owner_account)
    else:
        print("We cannot found a deployed contract")


def contract_info(contract):
    print(f"CONTRACT ADDRESS - {contract.address}")
    print(f"NFT PRICE - {contract.GetNftPrice()/10**18}UJG")
    print(f"COOLDOWN TIME - {contract.GetCoolDownTime()} TIME")
    print(f"NFT IN GAME - {contract.GetTotalNftInGame()} NFTS")
    print(f"NFT IN MARKET- {contract.GetTotalNftInMarket()} NFTS")
    print(f"BURN REWARD - {contract.GetBurnReward()/10**18} UJG")
    print(f"TRANSFER PRICE - {contract.GetTransferPrice()/10**18} UJG")
    print(f"REWARD MULTIPLICATOR - X{contract.GetRewardMultiplicator()}")
    print(f"WEAR MULTIPLICATOR - X{contract.GetWearMultiplicator()}")
    print(f"ATTACK MULTIPLICATOR - X{contract.GetAttackPriceMultiplicator()}")

def set_transfer_price(contract,owner):
    amount = float(input("UJG Amount:"))
    amount = amount * 10 ** 18
    contract.SetTransferPrice(amount,{"from":owner})
    print("New Transfer Price Setted")

def set_burn_reward(contract,owner):
    amount = float(input("UJG Amount:"))
    amount = amount * 10 ** 18
    contract.SetBurnReward(amount,{"from":owner})
    print("New Burn Reward Setted")

def set_token_erc20_address(contract,owner):
    amount = str(input("New Token Address:"))
    amount = amount * 10 ** 18
    contract.SetTokenERC20Address(amount,{"from":owner})
    print("New Token Setted,\nWARNING: The Contract Probably Doesn't have minted tokens, go to mint some tokens in tokens options")

def set_reward_multiplicator(contract,owner):
    amount = int(input("Multiplicator X: "))
    contract.SetRewardMultiplicator(amount,{"from":owner})
    print("New Reward Multiplicator Setted")

def set_wear_multiplicator(contract,owner):
    amount = int(input("Multiplicator X: "))
    contract.SetWearMultiplicator(amount,{"from":owner})
    print("New Wear Multiplicator Setted")

def set_attack_price_multiplicator(contract,owner):
    amount = int(input("Multiplicator X: "))
    contract.SetAttackPriceMultiplicator(amount,{"from":owner})
    print("New Attack Price Multiplicator Setted")

def set_nft_price(contract,owner):
    amount = float(input("UJG Amount:"))
    amount = amount * 10 ** 18
    contract.SetNftPrice(amount,{"from":owner})
    print("New NFT Price Setted")

def set_cooldown_time(contract,owner):
    time = int(input("Hours: "))
    time *= 3600 
    contract.SetCoolDownTime(time,{"from":owner})
    print("New Cooldown Time Setted")


