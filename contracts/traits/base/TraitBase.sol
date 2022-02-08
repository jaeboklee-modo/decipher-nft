// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

interface ITraitBase is IERC165 {
    function beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) external returns (bool);
}

abstract contract TraitBase is ITraitBase, ERC165 {
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC165, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(ITraitBase).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override returns (bool) {}
}
