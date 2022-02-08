import { unitTestFixture } from '../utils/fixture';
import { shouldBehaveLikeCall } from './behavior/shouldBehaveLikeCall.test';
import { shouldBehaveLikeSafeMint } from './behavior/shouldBehaveLikeSafeMint.test';
import { shouldBehaveLikeSafeMintBatch } from './behavior/shouldBehaveLikeSafeMintBatch.test';
import { shouldBehaveLikeSafeMintWithTrait } from './behavior/shouldBehaveLikeSafeMintWithTrait.test';
import { shouldBehaveLikeSafeMintWithTraitBatch } from './behavior/shouldBehaveLikeSafeMintWithTraitBatch.test';

export function unitTest(): void {
  describe('Decipher NFT unit test', async function () {
    this.beforeEach(async function () {
      const fixture = await this.loadFixture(unitTestFixture);

      this.contracts.decipherNFT = fixture.decipherNFT;
      this.contracts.counter = fixture.validTrait;
      this.contracts.invalidCounter = fixture.invalidTrait;

      const minterRole = await this.contracts.decipherNFT.MINTER_ROLE();

      await this.contracts.decipherNFT
        .connect(this.accounts.deployer)
        .grantRole(minterRole, this.accounts.minter.address);
    });

    describe('Mint Test', function () {
      shouldBehaveLikeSafeMint();
      shouldBehaveLikeSafeMintBatch();
    });

    describe('Mint With Trait Test', function () {
      shouldBehaveLikeSafeMintWithTrait();
      shouldBehaveLikeSafeMintWithTraitBatch();
    });

    describe('Call Trait Test', function () {
      shouldBehaveLikeCall();
    });
  });
}
