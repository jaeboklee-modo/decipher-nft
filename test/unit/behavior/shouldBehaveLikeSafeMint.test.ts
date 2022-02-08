import { expect } from 'chai';
import { ethers } from 'hardhat';

export function shouldBehaveLikeSafeMint(): void {
  context('', function () {
    it('reverts if caller does not have minter role', async function () {
      await expect(
        this.contracts.decipherNFT
          .connect(this.accounts.alice)
          .safeMint(this.accounts.alice.address, '')
      ).to.be.reverted;
    });

    it('success and set uri properly', async function () {
      const uri = 'example uri';

      const tx = await this.contracts.decipherNFT
        .connect(this.accounts.minter)
        .safeMint(this.accounts.alice.address, uri);

      const expectedTokenId = 0;

      expect(tx)
        .to.be.emit(this.contracts.decipherNFT, 'Transfer')
        .withArgs(ethers.constants.AddressZero, this.accounts.alice.address, expectedTokenId);
      expect(await this.contracts.decipherNFT.tokenURI(expectedTokenId)).to.be.equal(uri);
    });
  });
}
