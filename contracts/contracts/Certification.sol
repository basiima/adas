pragma solidity ^0.5.0;

// pragma experimental ABIEncoderV2;

import "./Institution.sol";

contract Certification {
    // State Variables
    address public owner;
    Institution public institution;

    // Mappings
    mapping(bytes32 => Certificate) private certificates;

    // Events
    event certificateGenerated(bytes32 _certificateId);
    event certificateRevoked(bytes32 _certificateId);

    constructor(Institution _institution) public {
        owner = msg.sender;
        institution = _institution;
    }

    struct Certificate {
        // Individual Info
        string student_name;
        string student_number;
        string creation_date;

        // Institute Info
        string issuer_name;

        // Revocation status
        bool revoked;
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
                result := mload(add(source, 32))
        }
    }

    function generateCertificate(
        string memory _id,
        string memory _student_name,
        string memory _student_number,
        string memory _creation_date) public {
        require(institution.checkInstitutePermission(msg.sender) == true, "Issuer account does not exist");
        bytes32 byte_id = stringToBytes32(_id);
        // require(certificates[byte_id].creation_date == 0, "Certificate with given id already exists");
        bytes memory tempEmptyStringNameTest = bytes(
            certificates[byte_id].creation_date
        );
        require(
            tempEmptyStringNameTest.length == 0,
            "Certificate with given id already exists"
        );
      (string memory _issuer_name) = institution.getInstituteData(msg.sender);
      //  require(_course_index >= 0 && _course_index < _institute_courses.length, "Invalid Course index");
    //  string memory _student_number = Certificate.student_number;
        bool revocation_status = false;
        certificates[byte_id] = Certificate(_student_name, _student_number, _creation_date, _issuer_name, revocation_status);
        emit certificateGenerated(byte_id);
    }

    function getData(string memory _id) public view returns(string memory, string memory, string memory, string memory, bool) {
        bytes32 byte_id = stringToBytes32(_id);
        Certificate memory temp = certificates[byte_id];
        // require(certificates[byte_id].creation_date != 0, "Certificate id does not exist!");
        bytes memory tempEmptyStringNameTest = bytes(
            certificates[byte_id].creation_date
        );
        require(
            tempEmptyStringNameTest.length != 0,
            "Certificate id does not exist"
        );
        return (temp.student_name, temp.student_number, temp.creation_date, temp.issuer_name, temp.revoked);
    }

    function revokeCertificate(string memory _id) public {
        require(institution.checkInstitutePermission(msg.sender) == true, "Issuer account does not exist");
        bytes32 byte_id = stringToBytes32(_id);
        bytes memory tempEmptyStringNameTest = bytes(
            certificates[byte_id].creation_date
        );
        require(
            tempEmptyStringNameTest.length != 0,
            "Certificate id does not exist"
        );
        certificates[byte_id].revoked = true;
        emit certificateRevoked(byte_id);
    }
}