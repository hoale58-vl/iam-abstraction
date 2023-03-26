import { ethers } from "hardhat";
import { getMerkleTreeProof } from "./merkleTree";
import { getUserAddresses, initializeSafe } from "./safe";

async function main() {
  // Get our safe
  // const safe = await initializeSafe();
  const safe = "0x2042120C00Fe986d981f95fd52C41932586391Ed";

  // Deploy some ERC20 tokens for testing permission
  // We also mint amount of token to our safe
  const MyToken = await ethers.getContractFactory("MyToken");

  const token1 = await MyToken.deploy(safe);
  console.log(`token1 deployed to ${token1.address}`);

  const token2 = await MyToken.deploy(safe);
  console.log(`token2 deployed to ${token2.address}`);

  const token3 = await MyToken.deploy(safe);
  console.log(`token3 deployed to ${token3.address}`);

  const IamAbtraction = await ethers.getContractFactory("IamAbtraction");

  // We grant transfer token permission from safe to user
  // Token1 -> UserA
  // Token2 -> UserB
  // Token3 -> UserC
  // In pratical, it should be more complex and no limit in only transferring token
  // 1 user - multiple permissions
  const merkleRoot = getMerkleTreeProof(await getUserAddresses(), [
    token1.address,
    token2.address,
    token3.address,
  ]);
  const contract = await IamAbtraction.deploy(safe, merkleRoot);

  await contract.deployed();
  console.log(`IamAbtraction deployed to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
