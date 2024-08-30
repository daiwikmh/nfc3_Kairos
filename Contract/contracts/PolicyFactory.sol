// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PolicyContract.sol";

contract PolicyFactory {
    PolicyContract[] public deployedPolicies;

    function createPolicyContract(
        address _client,
        string memory _name,
        string memory _dateOfBirth,
        string memory _gender,
        uint _premium,
        uint _coverageAmount,
        uint _duration
    ) public {
        // Create a new instance of the PolicyContract without passing arguments
        PolicyContract newPolicy = new PolicyContract();
        
        // Add the policy using a separate function
        newPolicy.addPolicy(
            _client,
            _name,
            _dateOfBirth,
            _gender,
            _premium,
            _coverageAmount,
            _duration
        );

        deployedPolicies.push(newPolicy);
    }

    function getDeployedPolicies() public view returns (PolicyContract[] memory) {
        return deployedPolicies;
    }
}
