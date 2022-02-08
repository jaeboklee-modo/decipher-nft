import { deployContract } from 'ethereum-waffle';
import { Signer } from 'ethers';
import { artifacts, ethers, upgrades } from 'hardhat';
import { Artifact } from 'hardhat/types';

import {
  DecipherNFT,
  NonTransferableTrait,
  CounterTrait,
  InvalidCounterTrait,
} from '../../typechain-types';

export async function deployDecipherNFT(deployer: Signer): Promise<DecipherNFT> {
  const decipherNFTFactory = await ethers.getContractFactory('DecipherNFT');
  const decipherNFT: DecipherNFT = <DecipherNFT>await upgrades.deployProxy(decipherNFTFactory, []);
  await decipherNFT.deployed();
  return decipherNFT;
}

export async function deployCounterTrait(deployer: Signer): Promise<CounterTrait> {
  const counterArtifact: Artifact = await artifacts.readArtifact('CounterTrait');
  const counter: CounterTrait = <CounterTrait>await deployContract(deployer, counterArtifact, []);
  return counter;
}

export async function deployInvalidCounterTrait(deployer: Signer): Promise<InvalidCounterTrait> {
  const counterArtifact: Artifact = await artifacts.readArtifact('InvalidCounterTrait');
  const counter: InvalidCounterTrait = <InvalidCounterTrait>(
    await deployContract(deployer, counterArtifact, [])
  );
  return counter;
}

export async function deployNonTransferableTrait(deployer: Signer): Promise<NonTransferableTrait> {
  const NonTransferableTraitArtifact: Artifact = await artifacts.readArtifact(
    'NonTransferableTrait'
  );
  const NonTransferableTrait: NonTransferableTrait = <NonTransferableTrait>(
    await deployContract(deployer, NonTransferableTraitArtifact, [])
  );
  return NonTransferableTrait;
}
