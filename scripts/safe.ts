import EthersAdapter from "@safe-global/safe-ethers-lib";
import { SafeFactory } from "@safe-global/safe-core-sdk";
import { SafeAccountConfig } from "@safe-global/safe-core-sdk";
import { ethers } from "hardhat";

async function getSigners() {
  // https://chainlist.org/?search=goerli&testnets=true
  const RPC_URL = "https://eth-goerli.public.blastapi.io";
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

  // Initialize signers
  const owner1Signer = new ethers.Wallet(
    process.env.OWNER_1_PRIVATE_KEY!,
    provider
  );
  const owner2Signer = new ethers.Wallet(
    process.env.OWNER_2_PRIVATE_KEY!,
    provider
  );
  const owner3Signer = new ethers.Wallet(
    process.env.OWNER_3_PRIVATE_KEY!,
    provider
  );
  return [owner1Signer, owner2Signer, owner3Signer];
}

export async function getUserAddresses() {
  return Promise.all(
    (await getSigners()).map(async (signer) => signer.getAddress())
  );
}

export async function initializeSafe() {
  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: (await getSigners())[0],
  });

  const safeFactory = await SafeFactory.create({
    ethAdapter: ethAdapterOwner1,
  });

  const safeAccountConfig: SafeAccountConfig = {
    owners: await getUserAddresses(),
    threshold: 1,
  };

  /* This Safe is tied to owner 1 because the factory was initialized with
    an adapter that had owner 1 as the signer. */
  try {
    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });
    const safeAddress = safeSdkOwner1.getAddress();

    console.log("Your Safe has been deployed:");
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`);
    console.log(`https://app.safe.global/gor:${safeAddress}`);
    return safeAddress;
  } catch (error) {
    const safeAddress = safeFactory.getAddress();
    console.log("Your Safe has already been deployed or deploy failed:");
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`);
    console.log(`https://app.safe.global/gor:${safeAddress}`);
    return safeAddress;
  }
}
