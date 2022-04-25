from brownie import(StudentsMain)
from scripts.helpful_scripts import *;

def liquidity_options(owner_account):
    contract = None

    if StudentsMain[-1]:
        contract = StudentsMain[-1]

    if contract:
        line_space()
        option = select_option(["Transfer Liquidity","Withdraw Liquidity","Info Liquidity","Go Back"]," You are in Liquidity Options!, Remember only the owner can interact with these functions")
        line_space()

        if option == 1:
            transfer_liquidity(owner_account,contract)
        elif option == 2:
            withdraw_liquidity(owner_account,contract)
        elif option == 3:
            info_liquidity(contract)

    else:
        print("We cannot found a deployed contract")

def transfer_liquidity(owner,contract):
    amount = float(input("Amount of ETH: "))
    amount = amount * 10**18
    contract.TransferLiquidity({"from":owner,"value":amount})
    print("Liquidity Transfered!")

def withdraw_liquidity(owner,contract):
    amount = float(input("Amount of ETH: "))
    amount = amount * 10**18
    contract.Withdraw(
        amount,
        owner,
        {"from":owner}
    )
    print("Withdraw Transfered!")

def info_liquidity(contract):
    tx = contract.GetContractBalance()
    tx.wait(1)
    balance = tx.events['ContractBalance']
    balance = balance[0]['balance']
    print(f"Contract Balance - {balance/10**18}ETH")