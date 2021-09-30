const path = require("path");
const Provider = require("@truffle/hdwallet-provider");
/* besu */
const provider = new Provider(
  process.env.BESU_PRIVATE_KEY,
  process.env.BESU_URL
);
/* rinkeby */
// const provider = new Provider(process.env.PRIVATE_KEY, process.env.INFURA_URL);

module.exports = {
  contracts_build_directory: path.join(__dirname, "build/contracts"),
  /* besu */
  networks: {
    besuWallet: {
      provider: () => provider,
      network_id: "*",
    },
  },
  /* rinkeby */
  // networks: {
  //   rinkeby: {
  //     provider: () => provider,
  //     network_id: "4",
  //   },
  // },

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
