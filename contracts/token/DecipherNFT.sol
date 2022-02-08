// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol';

import '../libraries/Call.sol';
import '../traits/base/TraitBase.sol';

contract DecipherNFT is
  Initializable,
  ERC721Upgradeable,
  ERC721URIStorageUpgradeable,
  AccessControlUpgradeable
{
  using CountersUpgradeable for CountersUpgradeable.Counter;
  using Call for address;
  using AddressUpgradeable for address;

  /************************* Storage ************************/

  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');

  CountersUpgradeable.Counter private _tokenIdCounter;

  mapping(uint256 => address) internal _trait;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() initializer {}

  function initialize() public initializer {
    __ERC721_init('DecipherNFT', 'DECIPHER');
    __ERC721URIStorage_init();
    __AccessControl_init();

    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER_ROLE, msg.sender);
  }

  /************************* Minter Functions ************************/

  function safeMint(address to, string memory uri) external onlyRole(MINTER_ROLE) {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }

  function safeMintBatch(address[] memory to, string[] memory uri) external onlyRole(MINTER_ROLE) {
    require(to.length == uri.length, 'Length mismatch');

    for (uint256 i = 0; i < to.length; ++i) {
      uint256 tokenId = _tokenIdCounter.current();
      _tokenIdCounter.increment();
      _safeMint(to[i], tokenId);
      _setTokenURI(tokenId, uri[i]);
    }
  }

  function safeMintWithTrait(
    address to,
    address trait,
    string memory uri
  ) external onlyRole(MINTER_ROLE) {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);

    _safeSetTrait(trait, tokenId);
  }

  function safeMintWithTraitBatch(
    address[] memory to,
    address[] memory trait,
    string[] memory uri
  ) external onlyRole(MINTER_ROLE) {
    require(to.length == uri.length && uri.length == trait.length, 'Length mismatch');

    for (uint256 i = 0; i < to.length; ++i) {
      uint256 tokenId = _tokenIdCounter.current();
      _tokenIdCounter.increment();
      _safeMint(to[i], tokenId);
      _setTokenURI(tokenId, uri[i]);

      _safeSetTrait(trait[i], tokenId);
    }
  }

  function setTokenURI(uint256 tokenId, string memory uri) external onlyRole(MINTER_ROLE) {
    _setTokenURI(tokenId, uri);
  }

  function setTokenTrait(address trait, uint256 tokenId) external onlyRole(MINTER_ROLE) {
    _safeSetTrait(trait, tokenId);
  }

  /************************* Functions ************************/

  function call(
    uint256[] memory tokenId,
    uint256[] memory value,
    bytes[] calldata data
  ) external {
    require(tokenId.length == value.length && value.length == data.length, 'Length mismatch');

    for (uint256 i = 0; i < tokenId.length; ++i) {
      address trait = tokenTrait(tokenId[i]);

      if (trait != address(0)) {
        trait.call(value[i], data[i]);
      }
    }
  }

  function tokenTrait(uint256 tokenId) public view returns (address) {
    return _trait[tokenId];
  }

  /************************* Internal Functions ************************/

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override {
    address trait = tokenTrait(tokenId);

    if (trait != address(0)) {
      trait.callBeforeTokenTransfer(from, to, tokenId);
    }
  }

  function _safeSetTrait(address trait, uint256 tokenId) internal {
    require(trait.isContract(), 'Trait is not contract account');
    require(
      ERC165CheckerUpgradeable.supportsInterface(trait, type(ITraitBase).interfaceId),
      'Trait dose not implement trait base'
    );

    _trait[tokenId] = trait;
  }

  // The following functions are overrides required by Solidity.

  function _burn(uint256 tokenId)
    internal
    override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
  {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721Upgradeable, AccessControlUpgradeable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
