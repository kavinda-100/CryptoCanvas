// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Treasury} from "../../src/Treasury.sol";
import {CryptoCanvasNFT} from "../../src/CryptoCanvasNFT.sol";
import {MarketPlace} from "../../src/MarketPlace.sol";
import {Deploy} from "../../script/Deploy.s.sol";

contract MarketPlaceTest is Test {
    Treasury private treasury;
    CryptoCanvasNFT private nft;
    MarketPlace private marketplace;
    address public user1 = makeAddr("user");
    address public user2 = makeAddr("user2");
    string constant tokenURI = "ipfs://example-token-uri";

    // -------------------------- Events ------------------------------
    event NFTListed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price);
    event NFTSold(uint256 listingId, address buyer);
    event ListingCanceled(uint256 listingId);

    function setUp() external {
        // deploy the contract
        (nft, marketplace, treasury) = new Deploy().run();

        // fund
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
    }

    // ------------------------------------------------ Modifiers ------------------------------------------------

    /**
     * @dev Modifier to mint an NFT to a user, approve the marketplace to transfer the NFT,
     * and list the NFT for sale at a specified price.
     * @param _user The address of the user to mint the NFT to and list it for sale.
     * @param _price The price at which to list the NFT for sale (in number) Example 1 -> 1 ether.
     */
    modifier mintAndListNFT(address _user, uint256 _price) {
        // convert price to Ether
        _price = _price * 1 ether;
        // mint an NFT to user1 and approve marketplace to transfer the NFT
        vm.startPrank(_user);
        uint256 tokenId = nft.mintNFT(tokenURI);
        nft.approve(address(marketplace), tokenId);

        // list NFT for sale as user1
        marketplace.listNFT(address(nft), tokenId, _price);
        vm.stopPrank();
        _;
    }

    // ------------------------------------------------------- Tests ------------------------------

    // -------------------------------------- Test `listNFT` function --------------------------------------

    /**
     * @dev Test listing an NFT for sale on the marketplace.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, and verifies the listing details.
     */
    function test_listNFT() external {
        // mint an NFT to user1 and approve marketplace to transfer the NFT
        vm.startPrank(user1);
        uint256 tokenId = nft.mintNFT(tokenURI);
        nft.approve(address(marketplace), tokenId);
        vm.stopPrank();

        // list NFT for sale as user1
        vm.startPrank(user1);
        uint256 price = 1 ether;
        marketplace.listNFT(address(nft), tokenId, price);
        vm.stopPrank();

        // verify the listing
        MarketPlace.ListingWithTokenURI[] memory listings = marketplace.getAllListingsWithTokenURI();
        assertEq(listings.length, 1);
        assertEq(listings[0].listingId, 1);
        assertEq(listings[0].seller, user1);
        assertEq(listings[0].buyer, address(0));
        assertEq(listings[0].nftContract, address(nft));
        assertEq(listings[0].tokenId, tokenId);
        assertEq(listings[0].price, price);
        assertEq(listings[0].active, true);
        assertEq(listings[0].listedAt > 0, true);
        assertEq(listings[0].tokenURI, tokenURI);

        // verify the NFT ownership has been transferred to marketplace
        assertEq(nft.ownerOf(1), address(marketplace)); // tokenId is 1 since it's the first minted NFT

        // verify the new listed NFT is in the seller's listings
        MarketPlace.ListingWithTokenURI[] memory listingsOfSeller =
            marketplace.getSellerActiveListingsWithTokenURI(user1);
        assertEq(listingsOfSeller.length, 1);
        assertEq(listingsOfSeller[0].listingId, listings[0].listingId);
        assertEq(listingsOfSeller[0].seller, listings[0].seller);
        assertEq(listingsOfSeller[0].buyer, listings[0].buyer);
        assertEq(listingsOfSeller[0].nftContract, listings[0].nftContract);
        assertEq(listingsOfSeller[0].tokenId, listings[0].tokenId);
        assertEq(listingsOfSeller[0].price, listings[0].price);
        assertEq(listingsOfSeller[0].active, listings[0].active);
        assertEq(listingsOfSeller[0].listedAt, listings[0].listedAt);
        assertEq(listingsOfSeller[0].tokenURI, listings[0].tokenURI);

        // check the next listing ID
        assertEq(marketplace.getNextListingId(), listings[0].listingId + 1);
    }

    /**
     * @dev Test that listing an NFT emits the correct event.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, and expects the NFTListed event to be emitted.
     */
    function test_listNFT_emitEvent() external {
        // mint an NFT to user1 and approve marketplace to transfer the NFT
        vm.startPrank(user1);
        uint256 tokenId = nft.mintNFT(tokenURI);
        nft.approve(address(marketplace), tokenId);
        vm.stopPrank();

        // list NFT for sale as user1
        vm.startPrank(user1);
        uint256 price = 1 ether;

        // Expect the NFTListed event to be emitted with specific parameters
        vm.expectEmit(true, true, true, true);
        emit NFTListed(1, user1, address(nft), tokenId, price);

        marketplace.listNFT(address(nft), tokenId, price);
        vm.stopPrank();
    }

    /**
     * @dev Test that listing an NFT fails if the price is zero.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * and attempts to list the NFT for sale with a price of zero, expecting a revert.
     */
    function test_listNFT_failIf_PriceIsZero() external {
        // mint an NFT to user1 and approve marketplace to transfer the NFT
        vm.startPrank(user1);
        uint256 tokenId = nft.mintNFT(tokenURI);
        nft.approve(address(marketplace), tokenId);
        vm.stopPrank();

        // list NFT for sale as user1
        vm.startPrank(user1);
        uint256 price = 0;

        // Expect the transaction to revert with the specific error message
        vm.expectRevert(MarketPlace.MarketPlace__PriceMustBeGraterThanZero.selector);
        marketplace.listNFT(address(nft), tokenId, price);
        vm.stopPrank();
    }

    // -------------------------------------- Test `buyNFT` function --------------------------------------

    /**
     * @dev Test buying a listed NFT from the marketplace.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, buys the NFT as user2, and verifies the purchase details.
     */
    function test_buyNFT() external mintAndListNFT(user1, 1) {
        // Record user1's balance BEFORE the sale
        uint256 user1BalanceBefore = address(user1).balance;

        // buy the listed NFT as user2
        vm.startPrank(user2);
        uint256 listingId = 1; // since it's the first listing
        uint256 price = 1 ether; // 'mintAndListNFT' modifier lists it for 1 ether
        marketplace.buyNFT{value: price}(listingId);
        vm.stopPrank();

        // verify the listing
        MarketPlace.ListingWithTokenURI[] memory listings = marketplace.getUserPurchasesWithTokenURI(user2);
        assertEq(listings.length, 1);
        assertEq(listings[0].listingId, 1);
        assertEq(listings[0].seller, user1);
        assertEq(listings[0].buyer, user2);
        assertEq(listings[0].nftContract, address(nft));
        assertEq(listings[0].tokenId, 1); // tokenId is 1 since it's the first minted NFT
        assertEq(listings[0].price, price);
        assertEq(listings[0].active, false);
        assertEq(listings[0].listedAt > 0, true);
        assertEq(listings[0].tokenURI, tokenURI);

        // verify the NFT ownership has been transferred to user2
        assertEq(nft.ownerOf(1), user2); // tokenId is 1 since it's the first minted NFT

        // verify the marketplace balance is zero
        assertEq(address(marketplace).balance, 0);

        // Calculate fee
        uint256 feeAmount = (listings[0].price * marketplace.getFeePercent()) / 100; // for treasury
        // Calculate seller amount
        uint256 sellerAmount = listings[0].price - feeAmount; // for seller

        // verify the treasury balance has increased by the listing price
        // Total feeAmount should be equal to the treasury balance
        assertEq(address(treasury).balance, feeAmount);

        // verify the user1 balance has increased by the listing price minus fee
        assertEq(address(user1).balance, user1BalanceBefore + sellerAmount);
    }

    /**
     * @dev Test that buying a listed NFT emits the correct event.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, and expects the NFTSold event to be emitted when user2 buys the NFT.
     */
    function test_buyNFT_emitEvent() external mintAndListNFT(user1, 1) {
        // buy the listed NFT as user2
        vm.startPrank(user2);
        uint256 listingId = 1; // since it's the first listing
        uint256 price = 1 ether; // 'mintAndListNFT' modifier lists it for 1 ether

        // Expect the NFTSold event to be emitted with specific parameters
        vm.expectEmit(true, true, true, true);
        emit NFTSold(listingId, user2);

        marketplace.buyNFT{value: price}(listingId);
        vm.stopPrank();
    }

    /**
     * @dev Test that buying an NFT fails with an invalid listing ID.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, and attempts to buy the NFT with an invalid listing ID, expecting a revert.
     */
    function test_buyNFT_with_invalid_listingId() external mintAndListNFT(user1, 1) {
        // buy the listed NFT as user2
        vm.startPrank(user2);
        uint256 zeroListingId = 0; // invalid listing ID (should be > 0, as listing IDs start from 1)
        uint256 invalidListingId = 999; // non-existent listing ID
        uint256 price = 1 ether; // 'mintAndListNFT' modifier lists it for 1 ether

        // Expect the transaction to revert because listingId does not exist
        vm.expectRevert(MarketPlace.MarketPlace__NotValidListingId.selector);
        marketplace.buyNFT{value: price}(invalidListingId);

        // Expect the transaction to revert because listingId is zero
        vm.expectRevert(MarketPlace.MarketPlace__NotValidListingId.selector);
        marketplace.buyNFT{value: price}(zeroListingId);
        vm.stopPrank();
    }

    /**
     * @dev Test that buying an NFT fails when the listing is not active.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, buys the NFT as user2, and then attempts to buy the same NFT again, expecting a revert.
     */
    function test_try_to_buyNFT_when_it_not_active() external mintAndListNFT(user1, 1) {
        // buy the listed NFT as user2
        vm.startPrank(user2);
        uint256 listingId = 1; // since it's the first listing
        uint256 price = 1 ether; // 'mintAndListNFT' modifier lists it for 1 ether
        marketplace.buyNFT{value: price}(listingId);

        // Try to buy again when not active
        vm.expectRevert(MarketPlace.MarketPlace__NFTNotActive.selector);
        marketplace.buyNFT{value: price}(listingId);
        vm.stopPrank();
    }

    /**
     * @dev Test that buying an NFT fails when insufficient funds are sent.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, and attempts to buy the NFT as user2 with insufficient funds, expecting a revert.
     */
    function test_try_to_buyNFT_with_insufficient_funds() external mintAndListNFT(user1, 1) {
        // buy the listed NFT as user2
        vm.startPrank(user2);
        uint256 listingId = 1; // since it's the first listing
        uint256 insufficientPrice = 0.5 ether; // less than the listing price of 1 ether

        // Expect the transaction to revert due to insufficient funds
        vm.expectRevert(MarketPlace.MarketPlace__NotEnoughAmount.selector);
        marketplace.buyNFT{value: insufficientPrice}(listingId);
        vm.stopPrank();
    }

    /**
     * @dev Test that buying an NFT fails when seller transfer fails.
     * Uses a contract that rejects Ether transfers as the seller.
     */
    function test_buyNFT_fails_when_seller_transfer_fails() external {
        // Deploy a fake account that rejects Ether
        FakeAccount fakeAccount = new FakeAccount();
        address fakeSeller = address(fakeAccount);

        // Fund the fake account to pay for minting and gas
        vm.deal(fakeSeller, 1 ether);

        // Mint and list NFT using the fake account as seller
        vm.startPrank(fakeSeller);
        uint256 tokenId = nft.mintNFT(tokenURI);
        nft.approve(address(marketplace), tokenId);
        marketplace.listNFT(address(nft), tokenId, 1 ether);
        vm.stopPrank();

        // Try to buy the NFT - should fail when trying to pay the fake seller
        vm.startPrank(user2);
        uint256 listingId = 1;

        vm.expectRevert(MarketPlace.MarketPlace__TransferFailed.selector);
        marketplace.buyNFT{value: 1 ether}(listingId);
        vm.stopPrank();
    }

    /**
     * @dev Test that buying an NFT fails when treasury transfer fails.
     * This test uses a modified setup where treasury is a contract that rejects Ether.
     */
    function test_buyNFT_fails_when_treasury_transfer_fails() external {
        // Deploy a fake treasury that rejects Ether
        FakeAccount fakeTreasury = new FakeAccount();

        // Deploy a new marketplace with the fake treasury
        MarketPlace marketplaceWithFakeTreasury = new MarketPlace(address(fakeTreasury));

        // Mint NFT to user1
        vm.startPrank(user1);
        uint256 tokenId = nft.mintNFT(tokenURI);
        nft.approve(address(marketplaceWithFakeTreasury), tokenId);
        marketplaceWithFakeTreasury.listNFT(address(nft), tokenId, 1 ether);
        vm.stopPrank();

        // Try to buy the NFT - should fail when trying to pay the fake treasury
        vm.startPrank(user2);
        uint256 listingId = 1;

        vm.expectRevert(MarketPlace.MarketPlace__TransferFailed.selector);
        marketplaceWithFakeTreasury.buyNFT{value: 1 ether}(listingId);
        vm.stopPrank();
    }

    // -------------------------------------- Test `cancelListing` function --------------------------------------

    /**
     * @dev Test canceling a listed NFT on the marketplace.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, cancels the listing, and verifies the cancellation details.
     */
    function test_cancelListing() external mintAndListNFT(user1, 1) {
        // cancel the listing as user1
        vm.startPrank(user1);
        uint256 listingId = 1; // since it's the first listing
        marketplace.cancelListing(listingId);
        vm.stopPrank();

        // verify the listing is no longer in the all active listings
        MarketPlace.ListingWithTokenURI[] memory listings = marketplace.getAllListingsWithTokenURI();
        assertEq(listings.length, 0); // No active listings in the marketplace

        // verify the NFT ownership has been transferred back to user1
        assertEq(nft.ownerOf(1), user1); // tokenId is 1

        // verify the canceled NFT is not in the seller's active listings
        MarketPlace.ListingWithTokenURI[] memory listingsOfSeller =
            marketplace.getSellerActiveListingsWithTokenURI(user1);
        assertEq(listingsOfSeller.length, 0);

        // verify the canceled NFT is in the seller's inactive listings
        MarketPlace.ListingWithTokenURI[] memory inactiveListingsOfSeller =
            marketplace.getSellerInActiveListingsWithTokenURI(user1);
        assertEq(inactiveListingsOfSeller.length, 1);
        assertEq(inactiveListingsOfSeller[0].listingId, 1);
        assertEq(inactiveListingsOfSeller[0].seller, user1);
        assertEq(inactiveListingsOfSeller[0].active, false);
    }

    /**
     * @dev Test that canceling a listing emits the correct event.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, and expects the ListingCanceled event to be emitted when user1 cancels the listing.
     */
    function test_cancelListing_emitEvent() external mintAndListNFT(user1, 1) {
        // cancel the listing as user1
        vm.startPrank(user1);
        uint256 listingId = 1; // since it's the first listing

        // Expect the ListingCanceled event to be emitted with specific parameters
        vm.expectEmit(true, true, true, true);
        emit ListingCanceled(listingId);

        marketplace.cancelListing(listingId);
        vm.stopPrank();
    }

    /**
     * @dev Test that canceling a listing fails with an invalid listing ID.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, and attempts to cancel the listing with an invalid listing ID, expecting a revert.
     */
    function test_try_to_cancelListing_with_invalid_listingId() external mintAndListNFT(user1, 1) {
        // cancel the listing as user1
        vm.startPrank(user1);
        uint256 zeroListingId = 0; // invalid listing ID (should be > 0, as listing IDs start from 1)
        uint256 invalidListingId = 999; // non-existent listing ID

        // Expect the transaction to revert because listingId does not exist
        vm.expectRevert(MarketPlace.MarketPlace__NotValidListingId.selector);
        marketplace.cancelListing(invalidListingId);

        // Expect the transaction to revert because listingId is zero
        vm.expectRevert(MarketPlace.MarketPlace__NotValidListingId.selector);
        marketplace.cancelListing(zeroListingId);
        vm.stopPrank();
    }

    /**
     * @dev Test that canceling a listing fails when the listing is not active.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, cancels the listing, and then attempts to cancel the same listing again, expecting a revert.
     */
    function test_try_to_cancelListing_when_it_not_active() external mintAndListNFT(user1, 1) {
        // cancel the listing as user1
        vm.startPrank(user1);
        uint256 listingId = 1; // since it's the first listing
        marketplace.cancelListing(listingId);

        // Try to cancel again when not active
        vm.expectRevert(MarketPlace.MarketPlace__NFTNotActive.selector);
        marketplace.cancelListing(listingId);
        vm.stopPrank();
    }

    /**
     * @dev Test that canceling a listing fails when called by a non-seller.
     * Mints an NFT to user1, approves the marketplace to transfer the NFT,
     * lists the NFT for sale, and attempts to cancel the listing as user2 (not the seller), expecting a revert.
     */
    function test_try_to_cancelListing_by_non_seller() external mintAndListNFT(user1, 1) {
        // Try to cancel the listing as user2 (not the seller)
        vm.startPrank(user2);
        uint256 listingId = 1; // since it's the first listing

        // Expect the transaction to revert due to unauthorized access
        vm.expectRevert(MarketPlace.MarketPlace__NotTheSeller.selector);
        marketplace.cancelListing(listingId);
        vm.stopPrank();
    }
}

/**
 * @title FakeAccount
 * @author Kavinda Rathnayake
 * @notice This contract is a fake account for testing purposes. (reverts on receiving Ether)
 */
contract FakeAccount {
    // Reject all Ether transfers
    receive() external payable {
        revert("FakeAccount: Cannot receive Ether");
    }

    fallback() external payable {
        revert("FakeAccount: Cannot receive Ether");
    }
}
