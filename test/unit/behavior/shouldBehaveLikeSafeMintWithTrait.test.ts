import { expect } from 'chai';
import { ethers } from 'hardhat';

export function shouldBehaveLikeSafeMintWithTrait(): void {
  context('', function () {
    it('reverts if caller does not have minter role', async function () {
      await expect(
        this.contracts.decipherNFT
          .connect(this.accounts.alice)
          .safeMintWithTrait(this.accounts.alice.address, this.contracts.counter.address, '')
      ).to.be.reverted;
    });

    it('reverts if the trait contract is not contract', async function () {
      await expect(
        this.contracts.decipherNFT
          .connect(this.accounts.minter)
          .safeMintWithTrait(this.accounts.alice.address, this.accounts.alice.address, '')
      ).to.be.revertedWith('Trait is not contract account');
    });

    it('reverts if the trait contract does not implement base contract', async function () {
      await expect(
        this.contracts.decipherNFT
          .connect(this.accounts.minter)
          .safeMintWithTrait(this.accounts.alice.address, this.contracts.invalidCounter.address, '')
      ).to.be.revertedWith('Trait dose not implement trait base');
    });

    it('success and set uri and trait properly', async function () {
      const uri = 'example uri';

      const tx = await this.contracts.decipherNFT
        .connect(this.accounts.minter)
        .safeMintWithTrait(this.accounts.alice.address, this.contracts.counter.address, uri);

      const expectedTokenId = 0;

      expect(tx)
        .to.be.emit(this.contracts.decipherNFT, 'Transfer')
        .withArgs(ethers.constants.AddressZero, this.accounts.alice.address, expectedTokenId);
      expect(await this.contracts.decipherNFT.tokenURI(expectedTokenId)).to.be.equal(uri);
      expect(await this.contracts.decipherNFT.tokenTrait(expectedTokenId)).to.be.equal(
        this.contracts.counter.address
      );
    });
  });
}
