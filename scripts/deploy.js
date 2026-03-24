const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const DonationBox = await hre.ethers.getContractFactory("DonationBox");
  const contract = await DonationBox.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("DonationBox deployed to:", address);
  console.log("Deployer:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

