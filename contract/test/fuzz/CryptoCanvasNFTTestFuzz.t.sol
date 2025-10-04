// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {CryptoCanvasNFT} from "../../src/CryptoCanvasNFT.sol";
import {Deploy} from "../../script/Deploy.s.sol";

contract CryptoCanvasNFTTestFuzz is Test {
    CryptoCanvasNFT private nft;
    address public user = makeAddr("user");

    function setUp() external {
        // deploy the contract
        (nft,,) = new Deploy().run();
    }

    // -------------------------- Minting Tests ------------------------------

    /**
     * @notice Fuzz Test minting an NFT
     */
    function test_fuzz_mintNFT(address _user, string memory _tokenURI) external {
        // add constraints
        vm.assume(_user != address(0));
        vm.assume(bytes(_tokenURI).length > 10 && bytes(_tokenURI).length < 100);

        // fund
        vm.deal(_user, 10 ether);

        vm.startPrank(_user);
        uint256 tokenId = nft.mintNFT(_tokenURI);

        assertEq(tokenId, 1); // First minted token should have ID 1
        assertEq(nft.ownerOf(tokenId), _user); // Owner should be the user
        assertEq(nft.balanceOf(_user), 1); // User should have 1 NFT
        assertEq(nft.tokenURI(tokenId), _tokenURI); // Token URI should match
        assertEq(nft.getTotalMinted(), 1); // Total minted should be 1
        vm.stopPrank();
    }

    /**
     * @notice Test that minting an NFT emits the correct event
     */
    function test_fuzz_mintNFT_Emits_Event(address _user, string memory _tokenURI) external {
        // add constraints
        vm.assume(_user != address(0));
        vm.assume(bytes(_tokenURI).length > 10 && bytes(_tokenURI).length < 100);
        // fund
        vm.deal(_user, 10 ether);

        vm.startPrank(_user);
        string memory tokenURI = _tokenURI;

        vm.expectEmit(true, true, true, true);
        emit CryptoCanvasNFT.NFTMinted(_user, 0, tokenURI);

        nft.mintNFT(tokenURI);
        vm.stopPrank();
    }
}
