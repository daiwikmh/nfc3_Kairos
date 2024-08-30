module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;

    console.log("Deploying contracts with the account:", deployer);

    const clientDetails = {
        address: "0x1234567890abcdef1234567890abcdef12345678", // Replace with actual client address
        name: "John Doe",
        dateOfBirth: "1990-01-01",
        gender: "Male",
        premium: ethers.utils.parseEther("1"), // 1 ETH
        coverageAmount: ethers.utils.parseEther("10"), // 10 ETH
        duration: 365 // 1 year in days
    };

    // Deploy the PolicyFactory contract
    const policyFactory = await deploy("PolicyFactory", {
        from: deployer,
        log: true,
    });

    // Deploy the ClaimManagement contract
    const claimManagement = await deploy("ClaimManagement", {
        from: deployer,
        log: true,
    });

    console.log("Contracts deployed to:", policyFactory.address, claimManagement.address);

    // Create a policy using the deployed PolicyFactory contract
    const policyFactoryContract = await ethers.getContractAt("PolicyFactory", policyFactory.address);
    await policyFactoryContract.createPolicy(
        clientDetails.address,
        clientDetails.name,
        clientDetails.dateOfBirth,
        clientDetails.gender,
        clientDetails.premium,
        clientDetails.coverageAmount,
        clientDetails.duration
    );

    log("Policy created successfully!");
};
