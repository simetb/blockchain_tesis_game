# Importing the networkss
from brownie import network
# Importing all the helpful Scripts
from scripts.helpful_scripts import *
# Importing al the option texts
from scripts.texts import *
# Importing all the options
from scripts.owner.deploy_contracts import deploy_contracts
from scripts.owner.liquidity import liquidity_options
from scripts.owner.pool_token import token_pool_options
from scripts.owner.contract_options import contract_options
from scripts.user.account import info_account
from scripts.user.nft import nft_option
from scripts.user.token import token_options
from scripts.user.game import attack
from scripts.user.transfer import transfer_options
from scripts.user.marketplace import marketplace_options

# Principal Run
def main():
    # State variables
    # - Accounts
    principal_account = None 
    secundary_account = None
    owner_account = None

    while True:
        print(f"RED ACTIVA - {network.show_active()}")
        print(f"CUENTA PRINCIPAL - {principal_account}")
        print(f"CUENTA SENCUNDARIA - {secundary_account}")
        print(f"CUENTA ADMIN - {owner_account}")
        
        option = select_option(PRINCIPAL_MESSAGE["options"],PRINCIPAL_MESSAGE["message"])
        
        #  Owner Options 
        if option == 1:
            while True:
                option = select_option(OWNER_MESSAGE["options"],OWNER_MESSAGE["message"])
                # Deploy Contract
                if option == 1:
                    owner_account = deploy_contracts(principal_account)
                    break
                
                # Liquidity Options
                elif option == 2:
                    liquidity_options(principal_account)

                # Token Pool Options
                elif option == 3:
                    token_pool_options(principal_account)
                
                # Contract Options
                elif option == 4:
                    contract_options(principal_account)
                else:
                    break
        
        # User Options

        elif option == 2:
            while True:
                option = select_option(USER_OPTIONS["options"],USER_OPTIONS["message"])

                # Info Account
                if option == 1:
                    info_account(principal_account)
                
                # Market place options
                elif option == 2:
                    marketplace_options(principal_account)
                
                # Nft Option
                elif option == 3:
                    nft_option(principal_account)
                
                # Nft Attack game option
                elif option == 4:
                    attack(principal_account)
                
                # Token options
                elif option == 5:
                    token_options(principal_account)
                
                # Transfer options
                elif option == 6:
                    transfer_options(principal_account,secundary_account)
                
                else:
                    break
            
        
        # Change Account Option
        elif option == 3:
            line_space()
            option  = select_option(["Primary","Secundary"],"Primary or Secundary (ACCOUNT)")
            line_space()
            if option == 1:
                principal_account = get_account(principal_account,secundary_account,owner_account)
            else:
                secundary_account = get_account(principal_account,secundary_account,owner_account)
            line_space()
        
        # Break Option
        else:
            line_space()
            break


    print("\n---Hasta Pronto!---")



    



    