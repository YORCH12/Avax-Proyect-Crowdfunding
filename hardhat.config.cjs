require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const FUJI_CHAIN_ID = parseInt(process.env.FUJI_CHAIN_ID || "43113", 10);

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    fuji: {
      url: process.env.FUJI_RPC_URL || "",
      chainId: FUJI_CHAIN_ID,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

