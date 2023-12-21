# Importing the main contract
from brownie import(StudentsMain)
# Importing Helpful script
from scripts.helpful_scripts import *;

# Function for the contract liquidity Options
def liquidity_options(owner_account):

    contract = None

    # Getting an existing contract
    if StudentsMain[-1]:
        contract = StudentsMain[-1]

    if contract:
        line_space()
        # Select an option from liquidity
        option = select_option(["Transferir Liquidez","Obtener Liquidez","Info Liquidez","Volver"],"Estas en Opciones de Liquidez, recuerda solo el administrador del contrato puede interactuar con estas funciones")
        line_space()

        if option == 1:
            # Transfer liquidity to the contract
            transfer_liquidity(owner_account,contract)

        elif option == 2:
            # Withdraw liquidity of the contract to an address
            withdraw_liquidity(owner_account,contract)
        
        elif option == 3:
            # Getting info of the liquidity
            info_liquidity(contract)

    else:
        print("No se ha Encontrado ningun contrato inteligente desplegado")

# Function that transfer liquidity to the contract
# Amount: Amount of ETH to transfer
def transfer_liquidity(owner,contract):
    # Avoiding an Input error
    while True:
        try:
            amount = float(input("Cantidad de ETH: "))
            amount = amount * 10**18
            break
        except:
            print("Entrada Invalida")
    # Calling The contract
    contract.TransferLiquidity({"from":owner,"value":amount})
    print("Liquidez Transferida!")

# Function that withdraw liquidity of the contract to an address
def withdraw_liquidity(owner,contract):
    # Avoiding an Input error
    while True:
        try:
            amount = float(input("Cantidad de ETH: "))
            amount = amount * 10**18
            break
        except:
            print("Entrada Invalida")
    # Calling the contract
    contract.Withdraw(
        amount,
        owner,
        {"from":owner}
    )
    print("Liquidez Obtenida!")

# Function that get info of the liquidity
def info_liquidity(contract):
    tx = contract.GetContractBalance()
    tx.wait(1)
    balance = tx.events['ContractBalance']
    balance = balance[0]['balance']
    print(f"Balance Contrato - {balance/10**18}ETH")