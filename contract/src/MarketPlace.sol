// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

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
        uint256 listedAt;
    }

    struct ListingWithTokenURI {
        uint256 listingId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
        uint256 listedAt;
        string tokenURI;
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
            active: true,
            listedAt: block.timestamp
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

    // -------------------------------- View/Pure Functions ---------------------------------------------

    /**
     * @notice This function return all the listings with tokenURI.
     * @return array of ListingWithTokenURI struct
     */
    function getAllListingsWithTokenURI() external view returns (ListingWithTokenURI[] memory) {
        // create a new array with the size of nextListingId
        ListingWithTokenURI[] memory allListings = new ListingWithTokenURI[](nextListingId - 1);
        // loop through the listings and add to the array with tokenURI
        for (uint256 i = 0; i < nextListingId - 1; i++) {
            Listing memory listing = listings[i];
            string memory tokenURI = IERC721Metadata(listing.nftContract).tokenURI(listing.tokenId);

            allListings[i] = ListingWithTokenURI({
                listingId: listing.listingId,
                seller: listing.seller,
                nftContract: listing.nftContract,
                tokenId: listing.tokenId,
                price: listing.price,
                active: listing.active,
                listedAt: listing.listedAt,
                tokenURI: tokenURI
            });
        }
        return allListings;
    }

    /**
     * @notice This function return all the listings of a user with tokenURI.
     * @param _user address of the user
     * @return array of ListingWithTokenURI struct
     */
    function getAllUserListingsWithTokenURI(address _user) external view returns (ListingWithTokenURI[] memory) {
        uint256 count = 0;
        // first loop to count the number of listings by the user
        for (uint256 i = 0; i < nextListingId - 1; i++) {
            if (listings[i].seller == _user) {
                count++;
            }
        }

        // create a new array with the size of count
        ListingWithTokenURI[] memory userListings = new ListingWithTokenURI[](count);
        uint256 index = 0;
        // second loop to add the listings to the array with tokenURI
        for (uint256 i = 0; i < nextListingId - 1; i++) {
            if (listings[i].seller == _user) {
                Listing memory listing = listings[i];
                string memory tokenURI = IERC721Metadata(listing.nftContract).tokenURI(listing.tokenId);

                userListings[index] = ListingWithTokenURI({
                    listingId: listing.listingId,
                    seller: listing.seller,
                    nftContract: listing.nftContract,
                    tokenId: listing.tokenId,
                    price: listing.price,
                    active: listing.active,
                    listedAt: listing.listedAt,
                    tokenURI: tokenURI
                });
                index++;
            }
        }
        return userListings;
    }

    /**
     * @notice This function return the listing details with tokenURI.
     * @param listingId ID of the listing
     * @return ListingWithTokenURI struct
     */
    function getListingWithTokenURI(uint256 listingId)
        external
        view
        isValidListingId(listingId)
        returns (ListingWithTokenURI memory)
    {
        Listing memory listing = listings[listingId];
        string memory tokenURI = IERC721Metadata(listing.nftContract).tokenURI(listing.tokenId);

        return ListingWithTokenURI({
            listingId: listing.listingId,
            seller: listing.seller,
            nftContract: listing.nftContract,
            tokenId: listing.tokenId,
            price: listing.price,
            active: listing.active,
            listedAt: listing.listedAt,
            tokenURI: tokenURI
        });
    }

    /**
     * @notice This function return the next listing ID.
     * @return next listing ID
     */
    function getNextListingId() external view returns (uint256) {
        return nextListingId;
    }

    /**
     * @notice This function return the marketplace fee percent.
     * @return fee percent
     */
    function getFeePercent() external view returns (uint256) {
        return feePercent;
    }
}
