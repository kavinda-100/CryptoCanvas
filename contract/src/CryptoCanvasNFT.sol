// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title CryptoCanvasNFT
 * @author Kavinda Rathnayake
 * @notice This contract hold the logic of NFTs.
 */
contract CryptoCanvasNFT is ERC721URIStorage {
    // -------------------------- Events ------------------------------
    event NFTMinted(address indexed creator, uint256 indexed tokenId, string tokenURI);

    // -------------------------- State Variables ------------------------------
    struct NFTs {
        uint256 tokenId;
        string tokenURI;
    }

    mapping(address => NFTs[]) allNFTs; // Mapping to store all NFTs by owner

    uint256 private _nextTokenId; // token count

    constructor() ERC721("CryptoCanvasNFT", "CCNFT") {}

    // -------------------------------- Public/External Functions ---------------------------------------------

    /**
     * @notice This function mint the NFT
     * @param tokenURI URL for the NFT
     */
    function mintNFT(string memory tokenURI) external returns (uint256) {
        uint256 newItemId = _nextTokenId++;

        // Mint the NFT and set the token URI
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        // Store the NFT details in the mapping
        allNFTs[msg.sender].push(NFTs({tokenId: newItemId, tokenURI: tokenURI}));

        // Emit the minting event
        emit NFTMinted(msg.sender, newItemId, tokenURI);

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
     * @notice This function returns all NFTs with tokenURIs that belong to a specific address
     * @param _user address of the user
     * @return array of NFTs struct containing tokenId and tokenURI
     */
    function getNFTsWithTokenURIByUser(address _user) external view returns (NFTs[] memory) {
        return allNFTs[_user];
    }

    /**
     * @notice This function returns the total number of minted NFTs
     * @return total number of minted NFTs
     */
    function getTotalMinted() external view returns (uint256) {
        return _nextTokenId;
    }
}
