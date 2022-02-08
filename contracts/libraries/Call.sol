// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import '../traits/base/TraitBase.sol';

library Call {
  function call(
    address target,
    uint256 value,
    bytes calldata data
  ) internal {
    (bool success, ) = target.call{value: value}(data);
    require(success, 'Target Call Error');
  }

  function callBeforeTokenTransfer(
    address target,
    address from,
    address to,
    uint256 tokenId
  ) internal {
    (bool success, bytes memory data) = target.call(
      abi.encodeWithSelector(ITraitBase.beforeTokenTransfer.selector, from, to, tokenId)
    );

    require(success && (data.length == 0 || abi.decode(data, (bool))), 'BeforeTokenTransfer Error');
  }
}
