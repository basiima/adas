const hre = require("hardhat");

async function main() {
  //const lockedAmount = hre.ethers.utils.parseEther("1");

  const Certify = await hre.ethers.getContractFactory("Certify");
  const certify = await Certify.deploy("Certifying...");

  await certify.deployed();

  console.log("Certify deployed at address: ", certify.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
