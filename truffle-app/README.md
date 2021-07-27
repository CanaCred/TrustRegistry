# TrustRegistry Truffle app

Steps to run:

1. Clone this repository (`git clone https://github.com/CanaCred/TrustRegistry.git`). 
2. If code is not yet merged to main, go to branch (`git checkout rest-interface`)
3. Change directory to truffle-app (`cd ./truffle-app`)
4. Install dependencies (`npm install`)
5. Use truffle to compile and deploy in the blockchain network 
   1. Edit truffle-config.js as necessary
   2. Command `truffle compile`
   3. Command `migrate --reset`


To check the deployed contract:
1. Go to blockchain explorer (i.e. https://rinkeby.etherscan.io/)
2. Verify the deployed contract by entering the [smart contract address](https://github.com/CanaCred/TrustRegistry/blob/dd882f63fdf6c6c736cd9ab427f98611d588196a/truffle-app/build/contracts/TrustRegistry.json#L5818)
