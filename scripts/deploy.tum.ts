import { ethers } from "hardhat";

async function main() {
  _deployContract("Ownable");
  _deployContract("Pausable");
  const Tum = await ethers.getContractFactory("Tum");
  const contract = await Tum.deploy("Tum","T",18,10);
  await contract.deployed();
  const nameOfTum = await contract.name();
  console.log(
    `deployed to ${contract.address} with name ${nameOfTum}`
  );
}

async function _deployContract(contractName:string){
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const lockedAmount = ethers.utils.parseEther("0.001");
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log(
    `Lock with ${ethers.utils.formatEther(lockedAmount)}ETH and unlock timestamp ${unlockTime} deployed to ${contract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
