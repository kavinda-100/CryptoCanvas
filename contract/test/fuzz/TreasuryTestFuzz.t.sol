// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Treasury} from "../../src/Treasury.sol";
import {CryptoCanvasNFT} from "../../src/CryptoCanvasNFT.sol";
import {MarketPlace} from "../../src/MarketPlace.sol";
import {Deploy} from "../../script/Deploy.s.sol";

contract TreasuryTestFuzz is Test {
    Treasury private treasury;
    CryptoCanvasNFT private nft;
    MarketPlace private marketplace;

    function setUp() external {
        // deploy the contract
        (nft, marketplace, treasury) = new Deploy().run();
    }

    // -------------------------- Treasury Withdraw Tests ------------------------------

    /**
     * @notice Fuzz test for successful withdrawal as owner with various amounts
     */
    function test_fuzz_withdraw_as_owner_success(uint256 _amount, address _to) external {
        // add constraints
        vm.assume(_amount > 0 && _amount <= 1000 ether); // Reasonable amount range
        vm.assume(_to != address(0)); // Valid recipient
        vm.assume(_to.code.length == 0); // EOA only (not a contract)
        vm.assume(_to != treasury.owner()); // Avoid conflicts with owner address
        vm.assume(uint160(_to) > 1000); // Avoid very low addresses that might cause transfer issues

        // Get the owner
        address owner = treasury.owner();

        // Record initial balance of recipient
        uint256 recipientInitialBalance = _to.balance;

        // Fund the treasury with the fuzzed amount
        vm.deal(address(treasury), _amount);

        // Initial balance check
        assertEq(address(treasury).balance, _amount);

        // Withdraw as owner
        vm.prank(owner);
        treasury.withdraw(_to);

        // Verify treasury is empty
        assertEq(address(treasury).balance, 0);
        // Verify recipient received the funds (initial balance + withdrawn amount)
        assertEq(_to.balance, recipientInitialBalance + _amount);
    }

    /**
     * @notice Fuzz test for withdrawal attempt by non-owner (should always fail)
     */
    function test_fuzz_withdraw_as_non_owner_fails(address _nonOwner, uint256 _amount, address _to) external {
        // add constraints
        vm.assume(_nonOwner != address(0));
        vm.assume(_nonOwner != treasury.owner()); // Ensure it's not the owner
        vm.assume(_amount > 0 && _amount <= 100 ether);
        vm.assume(_to != address(0));

        // Fund the treasury
        vm.deal(address(treasury), _amount);

        // Try to withdraw as non-owner
        vm.startPrank(_nonOwner);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, _nonOwner));
        treasury.withdraw(_to);
        vm.stopPrank();

        // Verify treasury balance is unchanged
        assertEq(address(treasury).balance, _amount);
    }

    /**
     * @notice Fuzz test for withdrawal when treasury has no funds
     */
    function test_fuzz_withdraw_no_funds_fails(address _to) external {
        // add constraints
        vm.assume(_to != address(0));

        // Get the owner
        address owner = treasury.owner();

        // Ensure treasury has no funds
        assertEq(address(treasury).balance, 0);

        // Try to withdraw with no funds
        vm.startPrank(owner);
        vm.expectRevert(Treasury.Treasury__NoFunds.selector);
        treasury.withdraw(_to);
        vm.stopPrank();
    }

    /**
     * @notice Fuzz test for withdrawal to contract that rejects ETH (should fail)
     */
    function test_fuzz_withdraw_to_rejecting_contract_fails(uint256 _amount) external {
        // add constraints
        vm.assume(_amount > 0 && _amount <= 100 ether);

        // Deploy a contract that rejects ETH
        RejectingContract rejectingContract = new RejectingContract();
        address owner = treasury.owner();

        // Fund the treasury
        vm.deal(address(treasury), _amount);

        // Try to withdraw to rejecting contract
        vm.startPrank(owner);
        vm.expectRevert(Treasury.Treasury__TransferFailed.selector);
        treasury.withdraw(address(rejectingContract));
        vm.stopPrank();

        // Verify treasury balance is unchanged
        assertEq(address(treasury).balance, _amount);
    }

    // -------------------------- Integration Tests with Marketplace ------------------------------

    /**
     * @notice Fuzz test for treasury receiving fees from marketplace transactions
     */
    function test_fuzz_treasury_receives_marketplace_fees(uint256 _price, string memory _tokenURI) external {
        // add constraints
        vm.assume(_price >= 100 && _price <= 100 ether); // Ensure minimum price generates fees
        vm.assume(bytes(_tokenURI).length > 5 && bytes(_tokenURI).length < 200); // Valid URI length

        // Create test users
        address seller = makeAddr("seller");
        address buyer = makeAddr("buyer");

        // Fund users
        vm.deal(seller, 10 ether);
        vm.deal(buyer, _price + 1 ether); // Extra for gas

        // Mint NFT as seller
        vm.startPrank(seller);
        uint256 tokenId = nft.mintNFT(_tokenURI);
        // Approve marketplace and list NFT
        nft.approve(address(marketplace), tokenId);
        marketplace.listNFT(address(nft), tokenId, _price);
        vm.stopPrank();

        // Calculate expected fee
        uint256 expectedFee = (_price * marketplace.getFeePercent()) / 100;
        uint256 expectedSellerAmount = _price - expectedFee;

        // Initial balances
        uint256 treasuryInitialBalance = address(treasury).balance;
        uint256 sellerInitialBalance = seller.balance;

        // Buy NFT as buyer
        vm.startPrank(buyer);
        marketplace.buyNFT{value: _price}(1); // First listing has ID 1
        vm.stopPrank();

        // Verify treasury received the fee
        assertEq(address(treasury).balance, treasuryInitialBalance + expectedFee);
        // Verify seller received correct amount
        assertEq(seller.balance, sellerInitialBalance + expectedSellerAmount);
        // Verify buyer owns the NFT
        assertEq(nft.ownerOf(tokenId), buyer);
    }

    /**
     * @notice Fuzz test for multiple transactions accumulating fees in treasury
     */
    function test_fuzz_multiple_transactions_accumulate_fees(uint8 _numTransactions, uint256 _basePrice) external {
        // add constraints
        vm.assume(_numTransactions > 0 && _numTransactions <= 10); // Reasonable number of transactions
        vm.assume(_basePrice >= 100 && _basePrice <= 10 ether); // Ensure minimum price generates fees

        uint256 totalExpectedFees = 0;
        uint256 feePercent = marketplace.getFeePercent();

        // Perform multiple transactions
        for (uint256 i = 0; i < _numTransactions; i++) {
            address seller = makeAddr(string(abi.encodePacked("seller", i)));
            address buyer = makeAddr(string(abi.encodePacked("buyer", i)));

            uint256 price = _basePrice + (i * 0.1 ether); // Vary prices slightly
            totalExpectedFees += (price * feePercent) / 100;

            // Fund users
            vm.deal(seller, 10 ether);
            vm.deal(buyer, price + 1 ether);

            // Mint, approve, and list NFT
            vm.startPrank(seller);
            uint256 tokenId = nft.mintNFT(string(abi.encodePacked("ipfs://token", i)));
            nft.approve(address(marketplace), tokenId);
            marketplace.listNFT(address(nft), tokenId, price);
            vm.stopPrank();

            // Buy NFT
            vm.startPrank(buyer);
            marketplace.buyNFT{value: price}(i + 1); // Listing IDs start from 1
            vm.stopPrank();
        }

        // Verify total fees accumulated
        assertEq(address(treasury).balance, totalExpectedFees);
    }

    /**
     * @notice Fuzz test for treasury withdrawal after multiple marketplace transactions
     */
    function test_fuzz_withdraw_after_multiple_sales(uint8 _numSales, uint256 _basePrice) external {
        // add constraints
        vm.assume(_numSales > 0 && _numSales <= 5); // Keep it reasonable for gas
        vm.assume(_basePrice >= 100 && _basePrice <= 5 ether); // Ensure minimum price generates fees

        uint256 totalExpectedFees = 0;
        uint256 feePercent = marketplace.getFeePercent();

        // Perform multiple sales to accumulate fees
        for (uint256 i = 0; i < _numSales; i++) {
            address seller = makeAddr(string(abi.encodePacked("seller", i)));
            address buyer = makeAddr(string(abi.encodePacked("buyer", i)));

            uint256 price = _basePrice + (i * 0.01 ether);
            uint256 feeForThisSale = (price * feePercent) / 100;

            // Ensure this sale generates a fee (important for small prices)
            if (feeForThisSale == 0) {
                continue; // Skip this iteration if no fee is generated
            }

            totalExpectedFees += feeForThisSale;

            // Fund users
            vm.deal(seller, 10 ether);
            vm.deal(buyer, price + 1 ether);

            // Complete sale
            vm.startPrank(seller);
            uint256 tokenId = nft.mintNFT(string(abi.encodePacked("ipfs://nft", i)));
            nft.approve(address(marketplace), tokenId);
            marketplace.listNFT(address(nft), tokenId, price);
            vm.stopPrank();

            vm.startPrank(buyer);
            marketplace.buyNFT{value: price}(i + 1);
            vm.stopPrank();
        }

        // Skip test if no fees were accumulated
        vm.assume(totalExpectedFees > 0);

        // Verify fees accumulated
        assertEq(address(treasury).balance, totalExpectedFees);

        // Now test withdrawal
        address owner = treasury.owner();
        address recipient = makeAddr("recipient");
        uint256 recipientInitialBalance = recipient.balance;

        // Withdraw all funds
        vm.prank(owner);
        treasury.withdraw(recipient);

        // Verify withdrawal
        assertEq(address(treasury).balance, 0);
        assertEq(recipient.balance, recipientInitialBalance + totalExpectedFees);
    }

    // -------------------------- Edge Case Tests ------------------------------

    /**
     * @notice Fuzz test for treasury receiving direct ETH transfers
     */
    function test_fuzz_treasury_receives_direct_eth(uint256 _amount) external {
        // add constraints
        vm.assume(_amount > 0 && _amount <= 1000 ether);

        address sender = makeAddr("sender");
        vm.deal(sender, _amount + 1 ether);

        uint256 initialBalance = address(treasury).balance;

        // Send ETH directly to treasury
        vm.startPrank(sender);
        (bool success,) = payable(address(treasury)).call{value: _amount}("");
        vm.stopPrank();

        // Verify ETH was received
        assertTrue(success);
        assertEq(address(treasury).balance, initialBalance + _amount);
    }

    /**
     * @notice Fuzz test for ownership verification with random addresses
     */
    function test_fuzz_only_owner_can_withdraw(address _randomUser, uint256 _amount) external {
        // add constraints
        vm.assume(_randomUser != address(0));
        vm.assume(_randomUser != treasury.owner());
        vm.assume(_amount > 0 && _amount <= 100 ether);

        // Fund treasury
        vm.deal(address(treasury), _amount);

        // Random user should not be able to withdraw
        vm.startPrank(_randomUser);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, _randomUser));
        treasury.withdraw(_randomUser);
        vm.stopPrank();

        // Balance should remain unchanged
        assertEq(address(treasury).balance, _amount);
    }
}

/**
 * @title RejectingContract
 * @notice A contract that rejects ETH transfers for testing purposes
 */
contract RejectingContract {
// This contract has no receive() or fallback() function
// So it will reject all ETH transfers
}
