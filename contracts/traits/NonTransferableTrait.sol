// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "./base/TraitBase.sol";

contract NonTransferableTrait is TraitBase {
    function beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override returns (bool) {
        require(false, "Token is non-transferable");
        return true;
    }
}
