# TheUjapGame

This system was created to obtain the title of computer engineering from José Antonio Páez University. It showcases implementations of smart contracts programmed in Solidity and deployed by Python on a Local Blockchain. This data is retrieved thanks to the use of Moralis in Next.js.

## FRONT END CONSIDERATIONS
- Installation
Inside the "TheUjapGame" folder, start the terminal and install the dependencies with your preferred package manager.

npm install
# or
yarn install

- Deployment
Use your package manager to start a development environment:

npm run dev
# or
yarn dev

Open http://localhost:3000 to see the result in your browser.

## BACK END CONSIDERATIONS
Env config
Brownie

- Env config
Some environment variables need to be configured before compiling the system.

File in the Backend folder
Metamask User Wallet.

export PRIVATE_KEY=ADDRESS_METAMASK

Connection Server.

export WEB3_INFURA_PROJECT_ID=INFURA_PROJECT_ID_KEY

Main React file
Moralis Server.

NEXT_PUBLIC_SERVER_URL=URL_MORALIS_KEY

Moralis Project ID

NEXT_PUBLIC_APP_ID=PROJECT_ID

Burn address, or DEFAULT wallet address

CONTRACT_ADDRESS="0x"

- Brownie
It is necessary to connect the brownie system to the system with the ganache interface. This can be done with a fairly simple instruction:

$ brownie networks add Ethereum ganache-local host=http://0.0.0.0:8545 chainid=1337

After this, it is possible to execute:

$ brownie run scripts/main.py

To use the console menu developed by us to facilitate the deployment of contracts.

Once all this is done, the program can be executed without any problem.

# Developers

## Temis Barreto - Simetb 
### Backend Development, Smart Contracts, and Local Blockchain Configuration

[![](https://avatars.githubusercontent.com/u/71613243?size=50)](https://github.com/simetb)

## Daniel Hernández - ManguitoDeveloper (DanteHPVzla)
### Design and Front App Developer

[![](https://avatars.githubusercontent.com/u/98782422?size=50)](https://github.com/ManguitoDeveloper)
[![](https://avatars.githubusercontent.com/u/60875213?size=50)](https://github.com/DanteHPVzla)
