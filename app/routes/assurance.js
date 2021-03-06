var express = require("express");
var router = express.Router();

const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");

const TrustRegistry = require("../contracts/TrustRegistry.json");

const address = process.env.ACCOUNT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const besuUrl = process.env.BESU_URL;

function route() {
  let trustRegistry;
  const init = async () => {
    try {
      const provider = new Provider(privateKey, besuUrl);
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TrustRegistry.networks[networkId];
      trustRegistry = new web3.eth.Contract(
        TrustRegistry.abi,
        deployedNetwork.address
      );
    } catch (err) {
      console.log(err);
    }
  };

  init();

  router.get("/", async function (req, res, next) {
    const { issuerDID, schemaID } = req.query;
    let assuranceLevel = {};
    try {
      assuranceLevel = await trustRegistry.methods
        .checkAssurance(issuerDID, schemaID)
        .call();
    } catch (err) {
      console.log(err);
    }
    res.json(assuranceLevel);
  });

  router.post("/", async function (req, res, next) {
    const { issuerDID, schemaID, expiryDate, assuranceLevel } = req.body;
    let receipt = {};
    try {
      receipt = await trustRegistry.methods
        .grantAssurance(
          issuerDID,
          schemaID,
          Date.parse(expiryDate),
          parseInt(assuranceLevel)
        )
        .send({ from: address });
    } catch (err) {
      console.log(err);
    }
    res.json(receipt);
  });

  return router;
}

module.exports = route();
