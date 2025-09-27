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
    // -------------------------- Errors ------------------------------
    error MarketPlace__PriceMustBeGraterThanZero();
    error MarketPlace__NotActive();
    error MarketPlace__NotEnoughAmount();
    error MarketPlace__TransferFailed();
    error MarketPlace__NotTheSeller();
    error MarketPlace__NotValidListingId();

    // -------------------------- Events ------------------------------
    event NFTListed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price);
    event NFTSold(uint256 listingId, address buyer);
    event ListingCanceled(uint256 listingId);

    // -------------------------- State Variables ------------------------------
    struct Listing {
        uint256 listingId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) private listings; // (id => Listing)
    uint256 private nextListingId;

    address private treasury; // treasury contract
    uint256 private feePercent = 2; // 2% marketplace fee

    // -------------------------- constructor ------------------------------
    constructor(address _treasury) {
        treasury = _treasury; // set the treasury address
    }

    // -------------------------- modifiers ------------------------------

    /**
     * @notice This modifier check the listing ID is valid.
     * @param listingId ID of the listing
     */
    modifier isValidListingId(uint256 listingId) {
        // check the listing ID is valid
        // listing ID start from 0 so nextListingId - 1 is the last valid ID
        if (listingId > nextListingId - 1) {
            revert MarketPlace__NotValidListingId();
        }
        _;
    }

    // -------------------------------- Public/External Functions ---------------------------------------------

    /**
     * @notice This function add a NFT for listing in the marketplace.
     * @param nftContract address of the NFT
     * @param tokenId ID of the NFT
     * @param price price of the NFT
     */
    function listNFT(address nftContract, uint256 tokenId, uint256 price) external nonReentrant {
        // check the price
        if (price < 0) {
            revert MarketPlace__PriceMustBeGraterThanZero();
        }

        // transfer NFT to marketplace from the seller.
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        // add to new listing
        listings[nextListingId] = Listing({
            listingId: nextListingId,
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            active: true
        });

        // emit the listing event
        emit NFTListed(nextListingId, msg.sender, nftContract, tokenId, price);

        // increment the listing ID
        nextListingId++;
    }

    /**
     * @notice This function use to buy a listed NFT from the marketplace.
     * @param listingId ID of the listing
     */
    function buyNFT(uint256 listingId) external payable nonReentrant isValidListingId(listingId) {
        // find the listing
        Listing storage listing = listings[listingId];

        // check the listing is active.
        if (!listing.active) {
            revert MarketPlace__NotActive();
        }
        // check the buyer has sent enough funds.
        if (msg.value != listing.price) {
            revert MarketPlace__NotEnoughAmount();
        }
        // mark the listing as inactive
        listing.active = false;

        // Calculate fee
        uint256 feeAmount = (listing.price * feePercent) / 100;
        // Calculate seller amount
        uint256 sellerAmount = listing.price - feeAmount;

        // Transfer funds to seller
        (bool success,) = payable(listing.seller).call{value: sellerAmount}("");
        // Check if transfer was successful
        if (!success) {
            revert MarketPlace__TransferFailed();
        }

        // Transfer fee to treasury
        (success,) = payable(treasury).call{value: feeAmount}("");
        // Check if transfer was successful
        if (!success) {
            revert MarketPlace__TransferFailed();
        }

        // Transfer NFT to buyer
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        // emit the sold event
        emit NFTSold(listingId, msg.sender);
    }

    /**
     * @notice This function use to cancel a listed NFT from the marketplace.
     * @param listingId ID of the listing
     */
    function cancelListing(uint256 listingId) external nonReentrant isValidListingId(listingId) {
        // find the listing
        Listing storage listing = listings[listingId];

        // check the listing is active.
        if (!listing.active) {
            revert MarketPlace__NotActive();
        }
        // check the caller is the seller.
        if (msg.sender != listing.seller) {
            revert MarketPlace__NotTheSeller();
        }

        // mark the listing as inactive
        listing.active = false;

        // Transfer NFT back to the seller
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        // emit the canceled event
        emit ListingCanceled(listingId);
    }
}
