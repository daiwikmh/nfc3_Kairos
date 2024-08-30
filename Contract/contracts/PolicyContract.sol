// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PolicyContract {
    address public insuranceProvider;
    uint public policyCount;

    struct ClientDetails {
        address clientAddress;
        string name;
        string dateOfBirth;
        string gender;
        uint premium;
        uint coverageAmount;
        uint duration; // Duration in days
        uint startDate;
        uint endDate;
        bool isActive;
    }

    mapping(uint => ClientDetails) public policies;

    // Events
    event PolicyCreated(
        uint indexed policyId,
        address indexed client,
        uint coverageAmount,
        uint premium,
        uint duration,
        uint startDate,
        uint endDate
    );

    event PolicyClaimed(
        uint indexed policyId,
        address indexed client,
        uint claimAmount,
        string claimReason,
        uint claimDate
    );

    // Constructor to initialize the contract
    constructor() {
        insuranceProvider = msg.sender;
    }

    // Modifier to check if the caller is the insurance provider
    modifier onlyInsuranceProvider() {
        require(msg.sender == insuranceProvider, "Only the insurance provider can perform this action.");
        _;
    }

    // Function to add a new policy
    function addPolicy(
        address _client,
        string memory _name,
        string memory _dateOfBirth,
        string memory _gender,
        uint _premium,
        uint _coverageAmount,
        uint _duration
    ) public onlyInsuranceProvider {
        uint policyId = policyCount++;
        uint startDate = block.timestamp;
        uint endDate = startDate + (_duration * 1 days);

        policies[policyId] = ClientDetails({
            clientAddress: _client,
            name: _name,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            premium: _premium,
            coverageAmount: _coverageAmount,
            duration: _duration,
            startDate: startDate,
            endDate: endDate,
            isActive: true
        });

        emit PolicyCreated(
            policyId,
            _client,
            _coverageAmount,
            _premium,
            _duration,
            startDate,
            endDate
        );
    }

    // Function to claim a policy
    function claimPolicy(uint policyId, uint claimAmount, string memory claimReason) public {
        ClientDetails storage policy = policies[policyId];

        require(policy.isActive, "Policy is no longer active.");
        require(msg.sender == policy.clientAddress, "Only the policyholder can claim.");
        require(claimAmount <= policy.coverageAmount, "Claim amount exceeds coverage.");

        // Logic to handle claim (e.g., transferring funds)
        // Here we're just marking the policy as inactive for simplicity

        policy.isActive = false;

        emit PolicyClaimed(policyId, policy.clientAddress, claimAmount, claimReason, block.timestamp);
    }

    // Function to check if the policy is still active
    function checkPolicyStatus(uint policyId) public view returns (bool) {
        ClientDetails memory policy = policies[policyId];
        return policy.isActive && (block.timestamp <= policy.endDate);
    }

    // Function to get policy details
    function getPolicyDetails(uint policyId) public view returns (
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
        ClientDetails memory policy = policies[policyId];
        return (
            policy.clientAddress,
            policy.premium,
            policy.coverageAmount,
            policy.duration,
            policy.startDate,
            policy.endDate,
            checkPolicyStatus(policyId),
            policy.name,
            policy.dateOfBirth,
            policy.gender
        );
    }
}
