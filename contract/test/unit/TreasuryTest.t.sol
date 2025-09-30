// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Treasury} from "../../src/Treasury.sol";
import {CryptoCanvasNFT} from "../../src/CryptoCanvasNFT.sol";
import {MarketPlace} from "../../src/MarketPlace.sol";
import {Deploy} from "../../script/Deploy.s.sol";

contract TreasuryTest is Test {
    Treasury private treasury;
    CryptoCanvasNFT private nft;
    MarketPlace private marketplace;
    address public user1 = makeAddr("user");
    address public user2 = makeAddr("user2");

    function setUp() external {
        // deploy the contract
        (nft, marketplace, treasury) = new Deploy().run();

        // fund
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
    }

    // -------------------------- Treasury tests ------------------------------

    /**
     * @notice Test to withdraw money as owner
     */
    function test_Withdraw_money_as_owner() external {
        // Mint NFT as user1
        vm.startPrank(user1);
        string memory tokenURI = "ipfs://example-token-uri";
        uint256 tokenId = nft.mintNFT(tokenURI);
        vm.stopPrank();

        // Approve marketplace to transfer the NFT, then list NFT for sale as user1
        vm.startPrank(user1);
        nft.approve(address(marketplace), tokenId); // approval of NFT to marketplace
        uint256 price = 1 ether;
        marketplace.listNFT(address(nft), tokenId, price);
        vm.stopPrank();

        // buy NFT as user2
        vm.startPrank(user2);
        marketplace.buyNFT{value: price}(1); // assume listingId is 1
        vm.stopPrank();

        // calculate fee
        uint256 feeAmount = (price * marketplace.getFeePercent()) / 100; // goes to treasury
        // Calculate seller amount
        uint256 sellerAmount = price - feeAmount;

        // Check treasury balance
        assertEq(address(treasury).balance, feeAmount);
        // Check user1 balance (seller)
        assertEq(user1.balance, 10 ether + sellerAmount);
        // Check user2 balance (buyer)
        assertEq(user2.balance, 10 ether - price);

        // Withdraw money as owner
        address owner = treasury.owner();
        uint256 ownerInitialBalance = owner.balance;
        vm.prank(owner);
        treasury.withdraw(owner);
        // Check treasury balance is 0
        assertEq(address(treasury).balance, 0);
        // Check owner balance increased
        assertEq(owner.balance, ownerInitialBalance + feeAmount);
    }

    /**
     * @notice Test to withdraw money as non-owner
     */
    function test_withdraw_money_as_non_owner() external {
        // Try to withdraw money as non-owner
        vm.startPrank(user1);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user1));
        treasury.withdraw(user1);
        vm.stopPrank();
    }

    /**
     * @notice Test to withdraw money as owner when no funds
     */
    function test_Cannot_withdraw_if_no_funds() external {
        // Try to withdraw money as owner when no funds
        address owner = treasury.owner();
        vm.startPrank(owner);
        vm.expectRevert(Treasury.Treasury__NoFunds.selector);
        treasury.withdraw(owner);
        vm.stopPrank();
    }

    /**
     * @notice Test to withdraw money as owner but transfer fails
     */
    function test_fail_withdraw_money_as_owner() external {
        // Mint NFT as user1
        vm.startPrank(user1);
        string memory tokenURI = "ipfs://example-token-uri";
        uint256 tokenId = nft.mintNFT(tokenURI);
        vm.stopPrank();

        // Approve marketplace to transfer the NFT, then list NFT for sale as user1
        vm.startPrank(user1);
        nft.approve(address(marketplace), tokenId); // approval of NFT to marketplace
        uint256 price = 1 ether;
        marketplace.listNFT(address(nft), tokenId, price);
        vm.stopPrank();

        // buy NFT as user2
        vm.startPrank(user2);
        marketplace.buyNFT{value: price}(1); // assume listingId is 1
        vm.stopPrank();

        // Withdraw money as owner
        address owner = treasury.owner();
        address fakeAccount = address(new FakeAccount());
        vm.startPrank(owner);
        vm.expectRevert(Treasury.Treasury__TransferFailed.selector);
        treasury.withdraw(fakeAccount);
        vm.stopPrank();
    }
}

/**
 * @title FakeAccount
 * @author Kavinda Rathnayake
 * @notice A contract that mimics a user account for testing purposes
 */
contract FakeAccount {}
