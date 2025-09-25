// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title CryptoCanvasNFT
 * @author Kavinda Rathnayake
 * @notice This contract hold the logic of NFT MarketPlace.
 */
contract MarketPlace is ReentrancyGuard {
    // -------------------------- Events ------------------------------
    event NFTListed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price);
    event NFTSold(uint256 listingId, address buyer);
    event ListingCanceled(uint256 listingId);

    // -------------------------- State Variables ------------------------------
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public nextListingId;

    address public treasury; // treasury contract
    uint256 public feePercent = 2; // 2% marketplace fee

    // -------------------------- constructor ------------------------------
    constructor(address _treasury) {
        treasury = _treasury;
    }

    // -------------------------------- Public/External Functions ---------------------------------------------
    function listNFT(address nftContract, uint256 tokenId, uint256 price) external nonReentrant {
        require(price > 0, "Price must be greater than 0");

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        listings[nextListingId] =
            Listing({seller: msg.sender, nftContract: nftContract, tokenId: tokenId, price: price, active: true});

        emit NFTListed(nextListingId, msg.sender, nftContract, tokenId, price);
        nextListingId++;
    }

    function buyNFT(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Not active");
        require(msg.value >= listing.price, "Not enough funds");

        listing.active = false;

        // Calculate fee
        uint256 feeAmount = (listing.price * feePercent) / 100;
        uint256 sellerAmount = listing.price - feeAmount;

        payable(listing.seller).transfer(sellerAmount);
        payable(treasury).transfer(feeAmount);

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit NFTSold(listingId, msg.sender);
    }

    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Not active");
        require(msg.sender == listing.seller, "Not seller");

        listing.active = false;

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit ListingCanceled(listingId);
    }
}
