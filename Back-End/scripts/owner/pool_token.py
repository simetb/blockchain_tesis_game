from brownie import(StudentsMain)
from scripts.helpful_scripts import *

def token_pool_options(owner_account):
    contract = None

    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        line_space()
        option = select_option(["Mint Token","Burn Token","Info Token","Go Back"]," You are in Token Options!, Remember only the owner can interact with these functions")
        line_space()

        if option == 1:
            mint_token(owner_account,contract)
        elif option == 2:
            burn_token(owner_account,contract)
        elif option == 3:
            info_token(contract)
    else:
        print("We cannot found a deployed contract")


def mint_token(owner,contract):
    amount = float(input("UJG Amount:"))
    amount = amount * 10 ** 18
    contract.MintTokens(amount,{"from":owner})
    print("Tokens Minted!")

def burn_token(owner,contract):
    amount = float(input("UJG Amount:"))
    amount = amount * 10 ** 18
    contract.BurnTokens(amount,{"from":owner})
    print("Tokens Burned")

def info_token(contract):
    tokenPool = contract.GetTokenPool()/10**18
    liquidity = contract.GetLiquidityPool()/10**18
    print(f"Contract Balance - {contract.GetTokenPool()/10**18}UJG")
    print(f"Contract Balance - {contract.GetLiquidityPool()/10**18}UJG")
    print(f"Token Price: 1 UJP = {liquidity/tokenPool}ETH")
    pass