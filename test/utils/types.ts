import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { CounterTrait, DecipherNFT, InvalidCounterTrait } from '../../typechain-types';

export interface Contracts {
  decipherNFT: DecipherNFT;
  counter: CounterTrait;
  invalidCounter: InvalidCounterTrait;
}

export interface Accounts {
  deployer: SignerWithAddress;
  minter: SignerWithAddress;
  alice: SignerWithAddress;
}

export type UnitTestFixture = {
  decipherNFT: DecipherNFT;
  validTrait: CounterTrait;
  invalidTrait: InvalidCounterTrait;
};

export type IntergrationTestFixture = {
  decipherNFT: DecipherNFT;
};
