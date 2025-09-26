require("@nomicfoundation/hardhat-toolbox");
require('@nomicfoundation/hardhat-ethers');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
};

 
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;

module.exports = {
  solidity: {
    version: '0.8.23',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1_000_000,
      },
      evmVersion: 'shanghai',
      viaIR: true, // Enable viaIR to fix stack too deep
    },
  },
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [PRIVATE_KEY_2],
      chainId: 11155111
    } 
  }
};