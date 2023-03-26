import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: `https://eth-goerli.public.blastapi.io`,
      accounts: [process.env.OWNER_1_PRIVATE_KEY!],
      chainId: 5,
    },
  },
};

export default config;
