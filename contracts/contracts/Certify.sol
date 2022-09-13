// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Certify {
    string private greeting;
    string[] private studentName;
    string[] private verifierName;
    string[] private documentType;
    string[] private documentKey;
    string[] private studentReference;

    constructor(string memory _greeting){
        console.log("Deploying Certifier with cert '%s'", _greeting);
        greeting = _greeting;
    }

    function slice(uint start, uint end, string memory h) internal pure returns (string memory) {
        bytes memory temp = new bytes((end-start)+1);
        for(uint i=0;i<=end-start;i++){
            temp[i] = bytes(h)[i+start];
        }
        return string(temp);
    }

    // Stores certification details on the blockchain
    function setCertificationDetails(string memory _studentName, string memory _verifierName,
    string memory _documentType, string memory _documentKey,
    string memory _studentReference) public {
        studentName.push(_studentName);
        verifierName.push(_verifierName);
        documentType.push(_documentType);
        documentKey.push(_documentKey);
        studentReference.push(_studentReference);
    }

    // Returns certification document keys stored on the blockchain
    function getCertificationDetails() public view returns (string[] memory _documentKey){
        return documentKey;
    }

    // Compares document key input by the verifier with the ones stored on the blockchain
    function get(string memory _u) public view returns (bool) {
    for(uint i = 0; i < documentKey.length; i++){
        if(keccak256(bytes(_u)) == keccak256(bytes(documentKey[i]))){
            return true;
        }
    }
    // for (uint i = 0; i < documentKey.length; i++){
    //     if (  keccak256(bytes(_u)) == keccak256(bytes(documentKey[i])) ){
    //         string memory first_half = slice(0, 31, (documentHash[i]));
    //         string memory end_half = slice(32, 63, (documentHash[i]));

    //         if ((keccak256(bytes(_h)) == keccak256(bytes(documentHash[i]))) || (keccak256(bytes(_h)) == keccak256(bytes(first_half))) || (keccak256(bytes(_h)) == keccak256(bytes(end_half)))){
    //             return true;
    //         }

    //     }
    // }
    return false;
}


}
