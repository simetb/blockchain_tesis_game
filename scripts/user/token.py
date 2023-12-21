# Importing The helpful scripts 
from scripts.helpful_scripts import *
# Importing the main contract
from brownie import(StudentsMain)

# Function that show all the options of the tokens
def token_options(account):

    contract = None

    # Select the last deployed contract
    if StudentsMain[-1]:
        contract = StudentsMain[-1]
    
    if contract:
        # Select an option
        line_space()
        option = select_option(["Comprar Token","Vender Token","Volver"],"Recuerda tener una cuenta seleccionada para interactuar con estas funcioness")
        line_space()

        if option == 1:
            # Getting the price
            price = get_price(contract)
            print(f"El precio del token actual - {price}")
            # Buy tokens
            buy_token(contract,account,price)
        
        elif option == 2:
            # Getting the Price
            price = get_price(contract)
            print(f"El precio del token actual - {price}")
            # Sell Tokens
            sell_token(contract,account,price)
    else:
        print("No encontramos un contrato inteligente desplegado")

# Function that calculated the price of the token in ETH
def get_price(contract):
    tokenPool = contract.GetTokenPool()/10**18
    liquidity = contract.GetLiquidityPool()/10**18
    return (liquidity/tokenPool)    

#  Function that buy tokens
def buy_token(contract,account,price):
    # Avoid Input error
    while True:
        try:
            amount = float(input("Cantidad de UJG a COMPRAR: "))
            break
        except:
            print("Entrada Invalida")
    
    # Showing the total
    line_space()
    option = select_option(["Si","No"],f"El precio total es: {amount * price}ETH quiere continuar con la compra?")
    line_space()

    if option == 1:
        # Calling the contract
        tx = contract.BuyToken(amount * 10**18,price * 10**18,{"from":account,"value": amount * price * 10**18})
        print(tx.events["TokenOperation"])
        print("Haz Comprado Tokens")

# Sell the token
def sell_token(contract,account,price):
    # Avoid Input error
    while True:
        try:
            amount = float(input("Cantidad de UJG a VENDER: "))
            break
        except:
            print("Entrada Invalida")
    
    # Calling the contract
    tx = contract.SellToken(amount* 10**18 ,price * 10**18,{"from":account})
    print(tx.events["TokenOperation"])
    print("Haz Vendido Tokens")