const VerifierTrustRegistry = artifacts.require("VerifierTrustRegistry");

module.exports = function (deployer) {
  deployer.deploy(VerifierTrustRegistry);
};
