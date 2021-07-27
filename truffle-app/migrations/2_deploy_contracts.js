const TrustRegistry = artifacts.require("TrustRegistry");

module.exports = function (deployer) {
  deployer.deploy(TrustRegistry);
};
