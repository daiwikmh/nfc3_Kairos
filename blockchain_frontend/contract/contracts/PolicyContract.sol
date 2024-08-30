// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PolicyContract {
    address public insuranceProvider;
    address public client;
    uint public premium;
    uint public coverageAmount;
    uint public duration; // Duration in days
    uint public startDate;
    uint public endDate;
    bool public isActive;

    struct ClientDetails {
        string name;
        string dateOfBirth;
        string gender;
    }

    ClientDetails public clientDetails;

    // Events
    event PolicyCreated(
        address indexed insuranceProvider,
        address indexed client,
        uint coverageAmount,
        uint premium,
        uint duration,
        uint startDate,
        uint endDate
    );

    event PolicyClaimed(
        address indexed client,
        uint claimAmount,
        string claimReason,
        uint claimDate
    );

    // Constructor to initialize the policy
    constructor(
        address _client,
        string memory _name,
        string memory _dateOfBirth,
        string memory _gender,
        uint _premium,
        uint _coverageAmount,
        uint _duration
    ) {
        insuranceProvider = msg.sender;
        client = _client;
        premium = _premium;
        coverageAmount = _coverageAmount;
        duration = _duration;
        startDate = block.timestamp;
        endDate = block.timestamp + (_duration * 1 days);
        isActive = true;

        clientDetails = ClientDetails({
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender
        });

        emit PolicyCreated(
            insuranceProvider,
            client,
            coverageAmount,
            premium,
            duration,
            startDate,
            endDate
        );
    }

    // Modifier to check if the policy is active
    modifier onlyActivePolicy() {
        require(isActive, "Policy is no longer active.");
        _;
    }

    // Function to claim the policy
    function claimPolicy(uint claimAmount, string memory claimReason) public onlyActivePolicy {
        require(msg.sender == client, "Only the policyholder can claim.");
        require(claimAmount <= coverageAmount, "Claim amount exceeds coverage.");
        
        // Logic to handle claim (e.g., transferring funds)
        // Here we're just marking the policy as inactive for simplicity

        isActive = false;

        emit PolicyClaimed(client, claimAmount, claimReason, block.timestamp);
    }

    // Function to check if the policy is still active
    function checkPolicyStatus() public view returns (bool) {
        return isActive && (block.timestamp <= endDate);
    }

    // Function to get policy details
    function getPolicyDetails() public view returns (
        address _insuranceProvider,
        address _client,
        uint _premium,
        uint _coverageAmount,
        uint _duration,
        uint _startDate,
        uint _endDate,
        bool _isActive,
        string memory _name,
        string memory _dateOfBirth,
        string memory _gender
    ) {
        return (
            insuranceProvider,
            client,
            premium,
            coverageAmount,
            duration,
            startDate,
            endDate,
            checkPolicyStatus(),
            clientDetails.name,
            clientDetails.dateOfBirth,
            clientDetails.gender
        );
    }
}
