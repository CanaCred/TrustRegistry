const path = require("path");
const Provider = require("@truffle/hdwallet-provider");
const privateKey =
  "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f";
const provider = new Provider(privateKey, "http://15.222.44.217:8545");

module.exports = {
  contracts_build_directory: path.join(__dirname, "build/contracts"),

  networks: {
    besuWallet: {
      provider: () => provider,
      network_id: "*",
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",
    },
  },

  db: {
    enabled: false,
  },
};
