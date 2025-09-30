// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {CryptoCanvasNFT} from "../../src/CryptoCanvasNFT.sol";
import {Deploy} from "../../script/Deploy.s.sol";

contract CryptoCanvasNFTTest is Test {
    CryptoCanvasNFT private nft;
    address public user = makeAddr("user");

    function setUp() external {
        // deploy the contract
        (nft,,) = new Deploy().run();

        // fund
        vm.deal(user, 10 ether);
    }

    // -------------------------- Minting Tests ------------------------------

    /**
     * @notice Test minting an NFT
     */
    function test_mintNFT() external {
        vm.startPrank(user);
        string memory tokenURI = "ipfs://example-token-uri";
        uint256 tokenId = nft.mintNFT(tokenURI);

        assertEq(tokenId, 0); // First minted token should have ID 0
        assertEq(nft.ownerOf(tokenId), user); // Owner should be the user
        assertEq(nft.balanceOf(user), 1); // User should have 1 NFT
        assertEq(nft.tokenURI(tokenId), tokenURI); // Token URI should match
        assertEq(nft.getTotalMinted(), 1); // Total minted should be 1
        vm.stopPrank();
    }

    /**
     * @notice Test that minting an NFT emits the correct event
     */
    function test_mintNFT_Emits_Event() external {
        vm.startPrank(user);
        string memory tokenURI = "ipfs://example-token-uri";

        vm.expectEmit(true, true, true, true);
        emit CryptoCanvasNFT.NFTMinted(user, 0, tokenURI);

        nft.mintNFT(tokenURI);
        vm.stopPrank();
    }
}
