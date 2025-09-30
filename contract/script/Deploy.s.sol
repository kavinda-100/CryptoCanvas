// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {CryptoCanvasNFT} from "../src/CryptoCanvasNFT.sol";
import {MarketPlace} from "../src/MarketPlace.sol";
import {Treasury} from "../src/Treasury.sol";

contract Deploy is Script {
    string constant DEPLOYMENT_FILE = "deployment-summary.json";
    string constant DEPLOYMENT_FILE_ALCHEMY = "deployment-summary-alchemy.json";

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

        // Write deployment summary to JSON file for Anvil Local Testnet
        // TODO: Comment out this line if not deploying to Anvil and doing Testing.
        _writeDeploymentSummaryToJson(address(treasury), address(cryptoCanvasNFT), address(marketPlace));

        // Write deployment summary to JSON file for Alchemy Deployments
        // TODO: Comment out this line if not deploying to Alchemy and doing Testing.
        // _writeAlchemyDeploymentSummaryToJson(address(treasury), address(cryptoCanvasNFT), address(marketPlace));

        return (cryptoCanvasNFT, marketPlace, treasury);
    }

    /**
     * @notice This function write the deployment summary to a JSON file for Anvil Local Testnet
     * @param _treasury Treasury contract address
     * @param _cryptoCanvasNFT CryptoCanvasNFT contract address
     * @param _marketPlace MarketPlace contract address
     */
    function _writeDeploymentSummaryToJson(address _treasury, address _cryptoCanvasNFT, address _marketPlace) private {
        // Step 1: Check if file exists and Step 2: Remove it if exists
        if (vm.exists(DEPLOYMENT_FILE)) {
            vm.removeFile(DEPLOYMENT_FILE);
            console2.log("Existing deployment file removed.");
        }

        // get chain name
        string memory chainName = _getChainName();

        // Step 3: Create new JSON file with deployment summary
        string memory json = "deployment_summary";

        // Add deployment information to JSON
        vm.serializeAddress(json, "cryptoCanvasNFT_treasury_address", _treasury);
        vm.serializeAddress(json, "cryptoCanvasNFT_address", _cryptoCanvasNFT);
        vm.serializeAddress(json, "cryptoCanvasNFT_marketPlace_address", _marketPlace);
        vm.serializeUint(json, "deployment_timestamp", block.timestamp);
        vm.serializeUint(json, "block_number", block.number);
        vm.serializeUint(json, "chain_id", block.chainid);
        vm.serializeString(json, "network", chainName);
        string memory finalJson = vm.serializeString(json, "status", "deployed_successfully");

        // Write JSON to file
        vm.writeFile(DEPLOYMENT_FILE, finalJson);
        console2.log("Deployment summary written to:", DEPLOYMENT_FILE);
    }

    /**
     * @notice This function write the deployment summary to a JSON file for Alchemy Deployments
     * @param _treasury Treasury contract address
     * @param _cryptoCanvasNFT CryptoCanvasNFT contract address
     * @param _marketPlace MarketPlace contract address
     */
    function _writeAlchemyDeploymentSummaryToJson(address _treasury, address _cryptoCanvasNFT, address _marketPlace)
        private
    {
        // Step 1: Check if file exists and Step 2: Remove it if exists
        if (vm.exists(DEPLOYMENT_FILE_ALCHEMY)) {
            vm.removeFile(DEPLOYMENT_FILE_ALCHEMY);
            console2.log("Existing alchemy deployment file removed.");
        }

        string memory chainName = _getChainName();

        // Step 3: Create new JSON file with deployment summary
        string memory json = "deployment_summary";

        // Add deployment information to JSON
        vm.serializeAddress(json, "cryptoCanvasNFT_treasury_address", _treasury);
        vm.serializeAddress(json, "cryptoCanvasNFT_address", _cryptoCanvasNFT);
        vm.serializeAddress(json, "cryptoCanvasNFT_marketPlace_address", _marketPlace);
        vm.serializeUint(json, "deployment_timestamp", block.timestamp);
        vm.serializeUint(json, "block_number", block.number);
        vm.serializeUint(json, "chain_id", block.chainid);
        vm.serializeString(json, "network", chainName);
        string memory finalJson = vm.serializeString(json, "status", "deployed_successfully");

        // Write JSON to file
        vm.writeFile(DEPLOYMENT_FILE_ALCHEMY, finalJson);
        console2.log("Deployment summary written to:", DEPLOYMENT_FILE_ALCHEMY);
    }

    /**
     * @notice This function returns the name of the current blockchain network based on chain ID
     * @return Name of the current blockchain network
     */
    function _getChainName() private view returns (string memory) {
        if (block.chainid == 1) {
            return "Ethereum Mainnet";
        } else if (block.chainid == 5) {
            return "Goerli Testnet";
        } else if (block.chainid == 11155111) {
            return "Sepolia Testnet";
        } else if (block.chainid == 137) {
            return "Polygon Mainnet";
        } else if (block.chainid == 80001) {
            return "Mumbai Testnet";
        } else if (block.chainid == 31337) {
            return "Anvil Testnet";
        } else {
            return "Unknown Network";
        }
    }
}
