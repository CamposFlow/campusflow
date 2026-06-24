//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampusFlow{
    struct Certificate{
    string studentId;
    string certificateType;
    uint256 timestamp;
    bool exists;
    }

    struct ClearanceStage{
             string studentId;
            string stageType;
            string documentHash;
            bool approved;
            uint256 timestamp;
    }

    struct VerificationTag {
            string hash;
            string verifierOrg;
            uint256 timestamp;
        }

        mapping(string => Certificate) private certificates;
        mapping(string => mapping(string => ClearanceStage)) private clearanceStages;
    VerificationTag[] private verifications;

    event CertificateStored(string hash, string studentId, string certificateType, uint256 timestamp);
    event ClearanceApproved(string studentId, string stageType, string documentHash, uint256 timestamp);
    event VerificationRecorded(string hash, string verifierOrg, uint256 timestamp);

    function storeCertificate(
        string memory _hash,
        string memory _studentId,
        string memory _certificateType
    ) public {
        require(!certificates[_hash].exists, "Certificate already stored");
// checks if the hash was stored before or if this certificate exists
   certificates[_hash] = Certificate({
       studentId: _studentId,
       certificateType : _certificateType,
       timestamp: block.timestamp,
       exists : true
    });
        emit CertificateStored(_hash, _studentId, _certificateType, block.timestamp);
    }


    function verifyCertificate(string memory _hash) public view returns (
        bool valid,
        string memory studentId,
        string memory certificateType,
        uint256 timestamp
    ) {
        Certificate memory cert = certificates[_hash];
        return (cert.exists, cert.studentId, cert.certificateType, cert.timestamp);
    }

    function recordClearanceApproval(
        string memory _studentId,
        string memory _stageType,
        string memory _documentHash
    ) public {
        clearanceStages[_studentId][_stageType] = ClearanceStage({
            studentId: _studentId,
            stageType: _stageType,
            documentHash: _documentHash,
        approved: true,
        timestamp: block.timestamp
        });
        emit ClearanceApproved(_studentId, _stageType, _documentHash,
            block.timestamp);
    }

    function getClearanceStage(
        string memory _studentId,
        string memory _stageType
    ) public view returns (
        bool approved,
        string memory documentHash,
        uint256 timestamp
    ) {
        ClearanceStage memory stage = clearanceStages[_studentId][_stageType];
        return (stage.approved, stage.documentHash, stage.timestamp);
    }

    function recordVerification(
        string memory _hash,
        string memory _verifierOrg
    ) public {
        verifications.push(VerificationTag({
            hash: _hash,
            verifierOrg: _verifierOrg,
            timestamp: block.timestamp
        }));
        emit VerificationRecorded(_hash, _verifierOrg, block.timestamp);
    }

    }