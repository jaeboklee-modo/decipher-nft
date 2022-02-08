// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

contract InvalidCounterTrait {
  mapping(uint256 => uint256) public _counter;

  function increment(uint256 tokenId) public {
    _counter[tokenId] += 1;
  }

  function getCount(uint256 tokenId) public view returns (uint256) {
    return _counter[tokenId];
  }
}
