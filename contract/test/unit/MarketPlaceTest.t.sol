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
        string memory tokenURI = "ipfs://example-token-uri";
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
        string memory tokenURI = "ipfs://example-token-uri";
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
        string memory tokenURI = "ipfs://example-token-uri";
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
        string memory tokenURI = "ipfs://example-token-uri";
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
}
