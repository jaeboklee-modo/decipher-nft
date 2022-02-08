import { Signer } from 'ethers';
import { DecipherNFT, CounterTrait, InvalidCounterTrait } from '../../typechain-types';
import { deployCounterTrait, deployDecipherNFT, deployInvalidCounterTrait } from './deploy';
import { UnitTestFixture, IntergrationTestFixture } from './types';

export async function unitTestFixture(signers: Signer[]): Promise<UnitTestFixture> {
  const deployer: Signer = signers[0];

  const nft = await deployDecipherNFT(deployer);

  const validTrait = await deployCounterTrait(deployer);

  const invalidTrait = await deployInvalidCounterTrait(deployer);

  return {
    decipherNFT: nft,
    validTrait: validTrait,
    invalidTrait: invalidTrait,
  };
}

export async function integrationTestFixture(signers: Signer[]): Promise<IntergrationTestFixture> {
  const deployer: Signer = signers[0];

  const nft = await deployDecipherNFT(deployer);

  return {
    decipherNFT: nft,
  };
}
