import 'dotenv/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers';
import '@openzeppelin/hardhat-upgrades';

import { HardhatUserConfig } from 'hardhat/types';

import './tasks/deference_whatsYourWallet/mintBatch';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.2',
    settings: {
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
  networks: {
    hardhat: {
      mining: {},
    },
    baobab: {
      url: 'https://kaikas.baobab.klaytn.net:8651',
      chainId: 1001,
      accounts: [process.env.ADMIN || ''],
      gas: 850000000000,
      timeout: 3000000,
      gasPrice: 25000000000,
    },
    cypress: {
      url: 'https://public-node-api.klaytnapi.com/v1/cypress',
      chainId: 8217,
      accounts: [process.env.ADMIN || ''],
      gas: 850000000000,
      timeout: 3000000,
      gasPrice: 25000000000,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
  },
};

export default config;
