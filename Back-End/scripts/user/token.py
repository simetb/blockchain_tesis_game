from re import S
from scripts.helpful_scripts import *
from brownie import(StudentsMain)

def token_options(account):

    contract = None

    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        line_space()
        option = select_option(["Buy Token","Sell Token","Go Back"],"Remember U need to have a selected account to interact with these functions")
        line_space()

        if option == 1:
            price = get_price(contract)
            print(f"The actuall token price - {price}")
            buy_token(contract,account,price)
        elif option == 2:
            price = get_price(contract)
            print(f"The actuall token price - {price}")
            sell_token(contract,account,price)
    else:
        print("We cannot found a deployed contract")

def get_price(contract):
    tokenPool = contract.GetTokenPool()/10**18
    liquidity = contract.GetLiquidityPool()/10**18
    return (liquidity/tokenPool)    

def buy_token(contract,account,price):
    amount = float(input("Amount UJG to BUY: "))
    line_space()
    option = select_option(["Yes","No"],f"The total price is: {amount * price}ETH Doo you want Continue?")
    line_space()
    if option == 1:
        tx = contract.BuyToken(amount * 10**18,price * 10**18,{"from":account,"value": amount * price * 10**18})
        print(tx.events["TokenOperation"])
        print("You Buy The tokens")

def sell_token(contract,account,price):
    amount = float(input("Amount UJG to SELL: "))
    tx = contract.SellToken(amount* 10**18 ,price * 10**18,{"from":account})
    print(tx.events["TokenOperation"])
    print("You sell the tokens")