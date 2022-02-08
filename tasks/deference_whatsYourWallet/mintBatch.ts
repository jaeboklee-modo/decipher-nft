import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

import { deference_nft_receiver_data } from './data';

interface Args {}

task('deference:mintBatch', 'mint batch').setAction(
  async (args: Args, hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { execute } = hre.deployments;

    await execute(
      'DecipherNFT',
      { from: deployer, log: true },
      'safeMintBatch',
      deference_nft_receiver_data.addresses,
      deference_nft_receiver_data.uri
    );

    console.log('mintBatch done');
  }
);
