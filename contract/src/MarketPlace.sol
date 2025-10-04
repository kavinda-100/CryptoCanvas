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
    error MarketPlace__NFTNotActive();
    error MarketPlace__ListingAlreadyActive();
    error MarketPlace__NotEnoughAmount();
    error MarketPlace__TransferFailed();
    error MarketPlace__NotTheSeller();
    error MarketPlace__NotTheOwnerOfNFT();
    error MarketPlace__NotValidListingId();

    // -------------------------- Events ------------------------------
    event NFTListed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price);
    event NFTSold(uint256 listingId, address buyer);
    event ListingCanceled(uint256 listingId);

    // -------------------------- State Variables ------------------------------
    struct Listing {
        uint256 listingId;
        address seller;
        address buyer;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
        uint256 listedAt;
    }

    struct ListingWithTokenURI {
        uint256 listingId;
        address seller;
        address buyer;
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
        nextListingId = 1; // initialize the listing ID
    }

    // -------------------------- modifiers ------------------------------

    /**
     * @notice This modifier check the listing ID is valid.
     * @param listingId ID of the listing
     */
    modifier isValidListingId(uint256 listingId) {
        // check if there are any listings at all
        if (listingId == 0) {
            revert MarketPlace__NotValidListingId();
        }
        // check the listing ID is valid
        // listing ID start from 1 so (nextListingId - 1) is the last valid ID
        if (listingId >= nextListingId) {
            revert MarketPlace__NotValidListingId();
        }
        _;
    }

    // -------------------------------- Public/External Functions ---------------------------------------------

    /**
     * @notice This function add a NFT for listing in the marketplace.
     * @param _nftContract address of the NFT
     * @param _tokenId ID of the NFT
     * @param _price price of the NFT
     */
    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external nonReentrant {
        // Create new listing (internal function)
        _listNFT(_nftContract, _tokenId, _price, false, 0);
    }

    /**
     * @notice This function allow a user to relist a purchased NFT.
     * @param _originalListingId ID of the original listing
     * @param _newPrice new price for the relisted NFT
     */
    function relistPurchasedNFT(uint256 _originalListingId, uint256 _newPrice)
        external
        nonReentrant
        isValidListingId(_originalListingId)
    {
        // Get the original listing
        Listing memory originalListing = listings[_originalListingId];

        // check the caller is the buyer of the original listing
        if (msg.sender != originalListing.buyer) {
            revert MarketPlace__NotTheOwnerOfNFT();
        }

        // Create new listing (internal function)
        _listNFT(originalListing.nftContract, originalListing.tokenId, _newPrice, true, _originalListingId);
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
            revert MarketPlace__NFTNotActive();
        }
        // check the buyer has sent enough funds.
        if (msg.value != listing.price) {
            revert MarketPlace__NotEnoughAmount();
        }

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

        // change the seller to the buyer after the sale
        listing.buyer = msg.sender;
        // mark the listing as inactive after the sale
        listing.active = false;

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
            revert MarketPlace__NFTNotActive();
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

    // -------------------------------- Internal Functions ---------------------------------------------

    /**
     * @notice This internal function add a NFT for listing in the marketplace.
     * @param _nftContract address of the NFT
     * @param _tokenId ID of the NFT
     * @param _price price of the NFT
     */
    function _listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price,
        bool _isRelist,
        uint256 _originalListingId
    ) internal {
        // check the price
        if (_price <= 0) {
            revert MarketPlace__PriceMustBeGraterThanZero();
        }

        // transfer NFT to marketplace from the seller.
        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

        // add to new listing
        if (_isRelist) {
            listings[_originalListingId] = Listing({
                listingId: _originalListingId,
                seller: msg.sender,
                buyer: address(0),
                nftContract: _nftContract,
                tokenId: _tokenId,
                price: _price,
                active: true,
                listedAt: block.timestamp
            });

            // emit the listing event with original listing ID
            emit NFTListed(_originalListingId, msg.sender, _nftContract, _tokenId, _price);
        } else {
            listings[nextListingId] = Listing({
                listingId: nextListingId,
                seller: msg.sender,
                buyer: address(0),
                nftContract: _nftContract,
                tokenId: _tokenId,
                price: _price,
                active: true,
                listedAt: block.timestamp
            });

            // emit the listing event with new listing ID
            emit NFTListed(nextListingId, msg.sender, _nftContract, _tokenId, _price);

            // increment the listing ID only for new listings
            nextListingId++;
        }
    }

    // -------------------------------- View/Pure Functions ---------------------------------------------

    /**
     * @notice This function return all the active listings with tokenURI.
     * @return array of ListingWithTokenURI struct
     */
    function getAllListingsWithTokenURI() external view returns (ListingWithTokenURI[] memory) {
        // count the number of active listings
        uint256 activeCount = 0;
        for (uint256 i = 0; i < nextListingId; i++) {
            if (listings[i].active) {
                activeCount++;
            }
        }
        // create a new array with the size of activeCount
        ListingWithTokenURI[] memory allListings = new ListingWithTokenURI[](activeCount);
        uint256 index = 0;
        // loop through the listings and add to the array with tokenURI
        for (uint256 i = 0; i < nextListingId; i++) {
            Listing memory listing = listings[i];
            if (listing.active) {
                string memory tokenURI = IERC721Metadata(listing.nftContract).tokenURI(listing.tokenId);

                allListings[index] = ListingWithTokenURI({
                    listingId: listing.listingId,
                    seller: listing.seller,
                    buyer: listing.buyer,
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
        return allListings;
    }

    /**
     * @notice This function return all the active listings of a seller with tokenURI that no one bought yet.
     * @param _seller address of the user/seller
     * @return array of Active ListingWithTokenURI struct
     */
    function getSellerActiveListingsWithTokenURI(address _seller)
        external
        view
        returns (ListingWithTokenURI[] memory)
    {
        uint256 count = 0;
        // first loop to count the number of listings by the seller
        for (uint256 i = 0; i < nextListingId; i++) {
            if (listings[i].seller == _seller && listings[i].active && listings[i].buyer == address(0)) {
                count++;
            }
        }

        // create a new array with the size of count
        ListingWithTokenURI[] memory userListings = new ListingWithTokenURI[](count);
        uint256 index = 0;
        // second loop to add the listings to the array with tokenURI
        for (uint256 i = 0; i < nextListingId; i++) {
            if (listings[i].seller == _seller && listings[i].active && listings[i].buyer == address(0)) {
                Listing memory listing = listings[i];
                string memory tokenURI = IERC721Metadata(listing.nftContract).tokenURI(listing.tokenId);

                userListings[index] = ListingWithTokenURI({
                    listingId: listing.listingId,
                    seller: listing.seller,
                    buyer: listing.buyer,
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
     * @notice This function return all the inActive listings of a seller with tokenURI that no one bought yet.
     * @param _seller address of the user/seller
     * @return array of InActive ListingWithTokenURI struct
     */
    function getSellerInActiveListingsWithTokenURI(address _seller)
        external
        view
        returns (ListingWithTokenURI[] memory)
    {
        uint256 count = 0;
        // first loop to count the number of listings by the seller
        for (uint256 i = 0; i < nextListingId; i++) {
            if (listings[i].seller == _seller && !listings[i].active && listings[i].buyer == address(0)) {
                count++;
            }
        }

        // create a new array with the size of count
        ListingWithTokenURI[] memory userListings = new ListingWithTokenURI[](count);
        uint256 index = 0;
        // second loop to add the listings to the array with tokenURI
        for (uint256 i = 0; i < nextListingId; i++) {
            if (listings[i].seller == _seller && !listings[i].active && listings[i].buyer == address(0)) {
                Listing memory listing = listings[i];
                string memory tokenURI = IERC721Metadata(listing.nftContract).tokenURI(listing.tokenId);

                userListings[index] = ListingWithTokenURI({
                    listingId: listing.listingId,
                    seller: listing.seller,
                    buyer: listing.buyer,
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
     * @notice This function return the individual listing details with tokenURI.
     * @param listingId ID of the listing
     * @return ListingWithTokenURI struct
     */
    function getSingleListingWithTokenURI(uint256 listingId)
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
            buyer: listing.buyer,
            nftContract: listing.nftContract,
            tokenId: listing.tokenId,
            price: listing.price,
            active: listing.active,
            listedAt: listing.listedAt,
            tokenURI: tokenURI
        });
    }

    /**
     * @notice This function returns all NFTs purchased by a user
     * @param _user address of the user/buyer
     * @return array of purchased ListingWithTokenURI struct
     */
    function getUserPurchasesWithTokenURI(address _user) external view returns (ListingWithTokenURI[] memory) {
        uint256 count = 0;
        // Count purchases (inactive listings where user is the buyer)
        for (uint256 i = 0; i < nextListingId; i++) {
            if (listings[i].buyer == _user && !listings[i].active) {
                count++;
            }
        }

        ListingWithTokenURI[] memory userPurchases = new ListingWithTokenURI[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < nextListingId; i++) {
            if (listings[i].buyer == _user && !listings[i].active) {
                Listing memory listing = listings[i];
                string memory tokenURI = IERC721Metadata(listing.nftContract).tokenURI(listing.tokenId);

                userPurchases[index] = ListingWithTokenURI({
                    listingId: listing.listingId,
                    seller: listing.seller,
                    buyer: listing.buyer,
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
        return userPurchases;
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

    /**
     * @notice This function set the marketplace fee percent.
     * @param _newFeePercent new fee percent
     */
    function setFeePercent(uint256 _newFeePercent) external {
        feePercent = _newFeePercent;
    }
}
