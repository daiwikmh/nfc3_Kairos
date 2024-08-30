// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClaimManagement {
    struct Claim {
        address policyAddress;
        uint claimAmount;
        string claimReason;
        bool isProcessed;
        bool isApproved;
        uint claimDate;
    }

    mapping(address => Claim[]) public claims;
    address public owner;

    event ClaimSubmitted(address indexed policyAddress, uint claimAmount, string claimReason, uint claimDate);
    event ClaimProcessed(address indexed policyAddress, bool isApproved, uint processedDate);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can process claims.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function submitClaim(
        address _policyAddress, 
        uint _claimAmount, 
        string memory _claimReason
    ) public {
        claims[_policyAddress].push(Claim({
            policyAddress: _policyAddress,
            claimAmount: _claimAmount,
            claimReason: _claimReason,
            isProcessed: false,
            isApproved: false,
            claimDate: block.timestamp
        }));
        emit ClaimSubmitted(_policyAddress, _claimAmount, _claimReason, block.timestamp);
    }

    function processClaim(address _policyAddress, uint _claimIndex, bool _approve) public onlyOwner {
        Claim storage claim = claims[_policyAddress][_claimIndex];
        require(!claim.isProcessed, "Claim has already been processed.");
        claim.isProcessed = true;
        claim.isApproved = _approve;
        emit ClaimProcessed(_policyAddress, _approve, block.timestamp);
    }

    function getClaims(address _policyAddress) public view returns (Claim[] memory) {
        return claims[_policyAddress];
    }
}
