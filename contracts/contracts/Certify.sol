// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Certify {
    string private greeting;

    struct CertificationData{
        string studentName;
        string verifierName;
        string documentType;
        string documentKey;
        string studentReference;
    }

    CertificationData[] certificationRecords;

    // Constructor to test working of the contract
    constructor(string memory _greeting){
        console.log("Deploying Certifier with cert '%s'", _greeting);
        greeting = _greeting;
    }

    /** Stores certification records on the blockchain */
    function setCertificationDetails(string memory _studentName, string memory _verifierName,
    string memory _documentType, string memory _documentKey,
    string memory _studentReference) public {
        // Creating a new certificatio record on the blockchain
        CertificationData memory newRecord = CertificationData(_studentName, _verifierName, _documentType, _documentKey, _studentReference);
        certificationRecords.push(newRecord);

    }

    /** Returns all certification data stored on the blockchain */
    function getCertificationDetails() public view returns(CertificationData[] memory) {
        return certificationRecords;
    }

    /** Compares document key entered by the user with one stored on the blockchain
     *  If a match is found the corresponding data is returned otherwise it returns false
     */
    function get(string memory _u) public view returns (bool, string memory _studentName, string memory _verifierName,
    string memory _documentType, string memory _documentKey, string memory _studentReference) {

    for(uint i = 0; i < certificationRecords.length; i++){
        if(keccak256(bytes(_u)) == keccak256(bytes(certificationRecords[i].documentKey))){
            return (true, certificationRecords[i].studentName, certificationRecords[i].verifierName,
            certificationRecords[i].documentType, certificationRecords[i].documentKey, certificationRecords[i].studentReference);
        }
    }

    return (false, '', '', '', '', '');

    }
}
