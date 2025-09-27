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
    uint256 private _nextTokenId; // token count

    constructor() ERC721("CryptoCanvasNFT", "CCNFT") {}

    // -------------------------------- Public/External Functions ---------------------------------------------

    /**
     * @notice This function mint the NFT
     * @param tokenURI URL for the NFT
     */
    function mintNFT(string memory tokenURI) external returns (uint256) {
        uint256 newItemId = _nextTokenId++;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    // -------------------------------- View/Pure Functions ---------------------------------------------

    /**
     * @notice This function returns the token URI of a specific NFT
     * @param tokenId ID of the NFT
     * @return tokenURI URL of the NFT metadata
     */
    function getTokenURI(uint256 tokenId) external view returns (string memory) {
        return tokenURI(tokenId);
    }

    /**
     * @notice This function returns the total number of minted NFTs
     * @return total number of minted NFTs
     */
    function getTotalMinted() external view returns (uint256) {
        return _nextTokenId;
    }
}
