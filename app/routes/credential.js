var express = require("express");
var router = express.Router();

const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");

const TrustRegistry = require("../contracts/VerifierTrustRegistry.json");

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
    const { verifierDID, schemaID } = req.query;
    let credentialOverlay = {};
    try {
      credentialOverlay = await trustRegistry.methods
        .checkCredential(verifierDID, schemaID)
        .call();
    } catch (err) {
      console.log(err);
    }
    res.json(credentialOverlay);
  });

  router.post("/", async function (req, res, next) {
    const { verifierDID, schemaID, expiryDate, credentialOverlay } = req.body;
    let receipt = {};
    try {
      receipt = await trustRegistry.methods
        .grantCredential(
          verifierDID,
          schemaID,
          Date.parse(expiryDate),
          parseInt(credentialOverlay)
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
