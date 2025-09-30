// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {CryptoCanvasNFT} from "../src/CryptoCanvasNFT.sol";
import {MarketPlace} from "../src/MarketPlace.sol";
import {Treasury} from "../src/Treasury.sol";

contract Deploy is Script {
    function run() external returns (CryptoCanvasNFT, MarketPlace, Treasury) {
        vm.startBroadcast();

        console2.log("================= Deploying contracts =================");

        console2.log("Deploying Treasury...");
        Treasury treasury = new Treasury();
        console2.log("Treasury deployed at:", address(treasury));

        console2.log("Deploying CryptoCanvasNFT...");
        CryptoCanvasNFT cryptoCanvasNFT = new CryptoCanvasNFT();
        console2.log("CryptoCanvasNFT deployed at:", address(cryptoCanvasNFT));

        console2.log("Deploying MarketPlace...");
        MarketPlace marketPlace = new MarketPlace(address(treasury));
        console2.log("MarketPlace deployed at:", address(marketPlace));

        console2.log("================= Finished Deploying contracts =================");

        vm.stopBroadcast();

        return (cryptoCanvasNFT, marketPlace, treasury);
    }
}
