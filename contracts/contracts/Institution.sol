pragma solidity ^0.5.0;
//pragma experimental ABIEncoderV2;

import "./Certification.sol";

contract Institution {
    // State Variables
    address public owner;

    // Mappings
    mapping(address => Institute) private institutes; // Institutes Mapping

    // Events
    event instituteAdded(string _instituteName);

    constructor() public {
        owner = msg.sender;
    }


    struct Institute {
        string issuer_name;
    }

    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }

    function addInstitute(
        address _address,
        string memory _issuer_name
    ) public returns (bool) {
        // Only owner can add institute
        require(
            msg.sender == owner,
            "Caller must be the owner - only owner can add an institute"
        );
        bytes memory tempEmptyStringNameTest = bytes(
            institutes[_address].issuer_name
        );
        require(
            tempEmptyStringNameTest.length == 0,
            "Institute with token already exists"
        );
        emit instituteAdded(_issuer_name);
    }

    // Called by Institutions
    function getInstituteData()
        public
        view
        returns (
            string memory
        )
    {
        Institute memory temp = institutes[msg.sender];
        bytes memory tempEmptyStringNameTest = bytes(temp.issuer_name);
        require(
            tempEmptyStringNameTest.length > 0,
            "Institute account does not exist!"
        );
        return (
            temp.issuer_name
        );
    }

    // Called by Smart Contracts
    function getInstituteData(address _address)
        public
        view
        returns (
            string memory
        )
    {
        require(Certification(msg.sender).owner() == owner, "Incorrect smart contract & authorizations!");
        Institute memory temp = institutes[_address];
        bytes memory tempEmptyStringNameTest = bytes(temp.issuer_name);
        require(
            tempEmptyStringNameTest.length > 0,
            "Institute does not exist!"
        );
        return (
            temp.issuer_name
        );
    }

    function checkInstitutePermission(address _address)
        public
        view
        returns (bool)
    {
        Institute memory temp = institutes[_address];
        bytes memory tempEmptyStringNameTest = bytes(temp.issuer_name);
        if (tempEmptyStringNameTest.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}