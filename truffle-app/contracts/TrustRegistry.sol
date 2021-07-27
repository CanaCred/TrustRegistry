// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract TrustRegistry {

    struct trustRecord {
        uint expiryDate;
        uint assuranceLevel;
    }
    
    address owner;
    
    constructor () {
        owner = msg.sender;
        }
    
    //Map Organization DID -> SchemaID/Credential DefinitionID -> trustRecord
    
    mapping(string => mapping(string => trustRecord)) issuerAssurance;
    
    function grantAssurance(string memory issuerDID, string memory schemaID, uint _expiry, uint _assuranceLevel) public {
        require(msg.sender  == owner,"granting assurance can only be done by the owner");
        trustRecord memory trust;
        trust.expiryDate = _expiry;
        trust.assuranceLevel = _assuranceLevel;
        issuerAssurance[issuerDID][schemaID] = trust;
    }
    
    function checkAssurance(string memory _issuerDID, string memory _schemaID) public view returns (uint) {
        return issuerAssurance[_issuerDID][_schemaID].assuranceLevel;
    }
}