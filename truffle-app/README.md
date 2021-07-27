# TrustRegistry Truffle app

Steps to run:

1. Clone this repository (`git clone https://github.com/CanaCred/TrustRegistry.git`)
2. Change directory to truffle-app (`cd ./truffle-app`)
3. Install dependencies (`npm install`)
4. Use truffle to compile and deploy in the blockchain network
   1. Run `truffle develop`
   2. Run `compile`
   3. Run `migrate --reset`


To check the deployed contract:
1. Go to blockchain explorer (i.e. https://rinkeby.etherscan.io/)
2. Verify the deployed contract by entering the [smart contract address](https://github.com/CanaCred/TrustRegistry/blob/dd882f63fdf6c6c736cd9ab427f98611d588196a/truffle-app/build/contracts/TrustRegistry.json#L5818)
