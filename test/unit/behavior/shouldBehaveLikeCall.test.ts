import { expect } from 'chai';

export function shouldBehaveLikeCall(): void {
  context('', function () {
    beforeEach('mint token and set traits', async function () {
      await this.contracts.decipherNFT
        .connect(this.accounts.minter)
        .safeMintWithTrait(this.accounts.minter.address, this.contracts.counter.address, '');
    });

    it('reverts if length is mismatch', async function () {
      const callData = this.contracts.counter.interface.encodeFunctionData('increment', [0]);
      await expect(this.contracts.decipherNFT.call([0], [0, 0], [callData])).to.be.revertedWith(
        'Length mismatch'
      );
    });

    it('calls trait contract successfully ', async function () {
      const tokenId = 0;
      const callData = this.contracts.counter.interface.encodeFunctionData('increment', [tokenId]);

      const tx = await this.contracts.decipherNFT
        .connect(this.accounts.minter)
        .call([tokenId], [0], [callData]);

      expect(tx).to.be.emit(this.contracts.counter, 'Increment').withArgs(tokenId);
      expect(await this.contracts.counter.getCount(tokenId)).to.be.equal(1);
    });
  });
}
