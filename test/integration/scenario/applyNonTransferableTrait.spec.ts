import { expect } from 'chai';
import { NonTransferableTrait } from '../../../typechain-types';
import { deployNonTransferableTrait } from '../../utils/deploy';

export function applyNonTransferableTraitTest(): void {
  describe('apply non-transferable trait nft test', function () {
    let nonTransferableTrait: NonTransferableTrait;
    let tokenId = 0;

    beforeEach('set trait and mint', async function () {
      nonTransferableTrait = await deployNonTransferableTrait(this.accounts.deployer);
      await this.contracts.decipherNFT.safeMintWithTrait(
        this.accounts.deployer.address,
        nonTransferableTrait.address,
        'example uri'
      );
    });

    it('transfer should be reverted if non transferable trait applied', async function () {
      await expect(
        this.contracts.decipherNFT
          .connect(this.accounts.deployer)
          .transferFrom(this.accounts.deployer.address, this.accounts.alice.address, tokenId)
      ).to.be.revertedWith('BeforeTokenTransfer Error');
    });
  });
}
