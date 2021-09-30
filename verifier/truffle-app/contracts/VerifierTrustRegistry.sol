// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract VerifierTrustRegistry {
    struct trustRecord {
        uint256 expiryDate;
        uint256 credentialOverlay;
    }

    address owner;

    constructor() {
        owner = msg.sender;
    }

    //Map Organization DID -> SchemaID/Credential DefinitionID -> trustRecord

    mapping(string => mapping(string => trustRecord)) verifierCredential;

    function grantCredential(
        string memory verifierDID,
        string memory schemaID,
        uint256 _expiry,
        uint256 _credentialOverlay
    ) public {
        require(
            msg.sender == owner,
            "granting credential can only be done by the owner"
        );
        trustRecord memory trust;
        trust.expiryDate = _expiry;
        trust.credentialOverlay = _credentialOverlay;
        verifierCredential[verifierDID][schemaID] = trust;
    }

    function checkCredential(
        string memory _verifierDID,
        string memory _schemaID
    ) public view returns (uint256) {
        return verifierCredential[_verifierDID][_schemaID].credentialOverlay;
    }
}
