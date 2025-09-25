// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title CryptoCanvasNFT
 * @author Kavinda Rathnayake
 * @notice This contract hold the logic of NFTs.
 */
contract CryptoCanvasNFT is ERC721URIStorage {
    // -------------------------- State Variables ------------------------------
    uint256 private _tokenIds; // token count

    constructor() ERC721("CryptoCanvasNFT", "CCNFT") {}

    // -------------------------------- Public/External Functions ---------------------------------------------

    /**
     * @notice This function mint the NFT
     * @param tokenURI URL for the NFT
     */
    function mintNFT(string memory tokenURI) external returns (uint256) {
        uint256 newItemId = _tokenIds++;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
