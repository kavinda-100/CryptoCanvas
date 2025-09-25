// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CryptoCanvas Treasury
 * @author Kavinda Rathnayake
 * @notice This contract hold the fee that sellers pay when they sell NFTs.
 */
contract Treasury is Ownable {
    // errors
    error Treasury__NoFunds();
    error Treasury__TransferFailed();

    constructor() Ownable(msg.sender) {}

    // Withdraw all ETH from treasury
    function withdraw(address to) external onlyOwner {
        // check the balance
        if (address(this).balance < 0) {
            revert Treasury__NoFunds();
        }
        // sen the money
        (bool success,) = payable(to).call{value: address(this).balance}("");
        // check the success
        if (!success) {
            revert Treasury__TransferFailed();
        }
    }

    // Accept ETH
    receive() external payable {}
}
