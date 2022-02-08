// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import '../traits/base/TraitBase.sol';

contract CounterTrait is TraitBase {
  event Increment(uint256 tokenId);

  mapping(uint256 => uint256) public _counter;

  function increment(uint256 tokenId) public {
    _counter[tokenId] += 1;
    emit Increment(tokenId);
  }

  function getCount(uint256 tokenId) public view returns (uint256) {
    return _counter[tokenId];
  }
}
