// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const AssuredPayFactory = await hre.ethers.getContractFactory(
    "AssuredPayFactory"
  );
  const assuredPayFactory = await AssuredPayFactory.deploy();

  await assuredPayFactory.deployed();

  console.log("Lock with 1 ETH deployed to:", assuredPayFactory.address);

  const contract = await (
    await ethers.getContractFactory("AssuredPayFactory")
  ).attach(assuredPayFactory.address);

  const tx = await contract.i_vendor();
  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
