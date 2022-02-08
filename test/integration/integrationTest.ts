import { integrationTestFixture } from '../utils/fixture';
import { applyNonTransferableTraitTest } from './scenario/applyNonTransferableTrait.spec';

export function integrationTest(): void {
  describe('Decipher NFT integration test', async function () {
    this.beforeEach(async function () {
      const fixture = await this.loadFixture(integrationTestFixture);

      this.contracts.decipherNFT = fixture.decipherNFT;
    });

    applyNonTransferableTraitTest();
  });
}
