require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require('hardhat-deploy');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true, // Enable Intermediate Representation
    },
  },

  networks: {
    polygonAmoy: { 
      url: process.env.POLYGON_RPC_URL, 
      accounts: [process.env.PRIVATE_KEY], 
    },
  },
};
