<div align="center">
  <img src="../imgs/faq.png" alt="Contributing Guide" width="300" style="border-radius: 10px; margin: 20px 0;" />
  
  # CryptoCanvas Smart Contracts
  
  <p><strong>A comprehensive NFT marketplace platform built with Solidity and Foundry</strong></p>
  <p>Featuring secure NFT minting, trading, and treasury management with 100% test coverage</p>
  
  [![Solidity](https://img.shields.io/badge/Solidity-^0.8.24-blue?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
  [![Foundry](https://img.shields.io/badge/Foundry-Framework-orange?style=for-the-badge&logo=ethereum)](https://book.getfoundry.sh/)
  [![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-Contracts-purple?style=for-the-badge)](https://openzeppelin.com/contracts/)
  [![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen?style=for-the-badge)](./README.md)
  
</div>

---

## 🎨 Project Overview

CryptoCanvas is a decentralized NFT marketplace that enables users to mint, list, buy, and trade digital art NFTs. The platform consists of three main smart contracts working together to provide a complete marketplace experience.

### 🏗️ Smart Contract Architecture

#### 1. **CryptoCanvasNFT.sol**

- ERC-721 compliant NFT contract
- Secure minting functionality
- URI-based metadata management
- Marketplace integration ready

#### 2. **MarketPlace.sol**

- Core marketplace functionality
- NFT listing and trading
- Fee management system
- Secure payment handling

#### 3. **Treasury.sol**

- Centralized fee collection
- Owner-only withdrawal system
- Secure fund management
- Direct ETH support

### ✨ Key Features

- **🎯 Complete NFT Lifecycle**: Mint → List → Trade → Relist
- **💰 Flexible Fee System**: Configurable marketplace fees
- **🔒 Security First**: Comprehensive input validation and error handling
- **📊 100% Test Coverage**: Extensive unit and fuzz testing
- **⚡ Gas Optimized**: Efficient smart contract design
- **🌐 Multi-Network**: Support for local Anvil and Sepolia testnet

## 🧪 Testing & Coverage

Our smart contracts maintain **100% test coverage** across all critical paths:

### 📊 Test Statistics

| Metric             | Count | Description                            |
| ------------------ | ----- | -------------------------------------- |
| 🧪 **Total Tests** | 45    | Comprehensive test suite               |
| 🔬 **Unit Tests**  | 34    | Individual function testing            |
| 🎯 **Fuzz Tests**  | 11    | Property-based testing                 |
| 📈 **Coverage**    | 100%  | Lines, statements, branches, functions |

### ✅ Test Categories

| Category                 | Status      | Description                                             |
| ------------------------ | ----------- | ------------------------------------------------------- |
| 🔄 **Normal Operations** | ✅ Complete | All standard marketplace functions                      |
| ❌ **Error Handling**    | ✅ Complete | Invalid inputs, insufficient funds, unauthorized access |
| 🔍 **Edge Cases**        | ✅ Complete | Zero values, non-existent listings, transfer failures   |
| 🔒 **Security**          | ✅ Complete | Reentrancy protection, access control, input validation |
| ⚡ **Gas Optimization**  | ✅ Complete | Efficient execution paths                               |

### 📋 Coverage Report

| Contract                   | Lines                                                              | Statements                                                         | Branches                                                         | Functions                                                        |
| -------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| 🎨 **CryptoCanvasNFT.sol** | ![100%](https://img.shields.io/badge/100%25-10%2F10-brightgreen)   | ![100%](https://img.shields.io/badge/100%25-8%2F8-brightgreen)     | ![100%](https://img.shields.io/badge/100%25-0%2F0-brightgreen)   | ![100%](https://img.shields.io/badge/100%25-3%2F3-brightgreen)   |
| 🏪 **MarketPlace.sol**     | ![100%](https://img.shields.io/badge/100%25-118%2F118-brightgreen) | ![100%](https://img.shields.io/badge/100%25-146%2F146-brightgreen) | ![100%](https://img.shields.io/badge/100%25-20%2F20-brightgreen) | ![100%](https://img.shields.io/badge/100%25-15%2F15-brightgreen) |
| 🏛️ **Treasury.sol**        | ![100%](https://img.shields.io/badge/100%25-6%2F6-brightgreen)     | ![100%](https://img.shields.io/badge/100%25-6%2F6-brightgreen)     | ![100%](https://img.shields.io/badge/100%25-2%2F2-brightgreen)   | ![100%](https://img.shields.io/badge/100%25-1%2F1-brightgreen)   |
| **📊 Total**               | ![100%](https://img.shields.io/badge/100%25-134%2F134-brightgreen) | ![100%](https://img.shields.io/badge/100%25-160%2F160-brightgreen) | ![100%](https://img.shields.io/badge/100%25-22%2F22-brightgreen) | ![100%](https://img.shields.io/badge/100%25-19%2F19-brightgreen) |

### Running Tests

```bash
# Run all tests
forge test

# Run with verbose output
forge test -vvv

# Run specific test file
forge test --match-path test/unit/MarketPlaceTest.t.sol

# Generate coverage report
forge coverage --report summary

# Run fuzz tests
forge test --match-path test/fuzz/
```

## 🚀 Deployment & Setup

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- Node.js (for frontend integration)
- Git

### Quick Start

1. **Clone and Setup**

```bash
git clone https://github.com/kavinda-100/CryptoCanvas.git
cd CryptoCanvas/contract
forge install
```

2. **Environment Configuration**

```bash
make create-env
# Edit .env file with your RPC URLs and private keys
```

3. **Local Development**

```bash
# Start local Anvil node with state persistence
make persist-state-load

# Deploy to local network
make deploy-local
```

4. **Testnet Deployment**

```bash
# Deploy to Sepolia testnet (requires .env configuration)
make deploy-sepolia
```

### 🚀 Deployment Commands

| Command                       | Network | Description                  | Verification |
| ----------------------------- | ------- | ---------------------------- | ------------ |
| 🔨 `make deploy-local`        | Anvil   | Deploy to local network      | ❌ No        |
| 🧪 `make deploy-sepolia`      | Sepolia | Deploy to testnet            | ✅ Yes       |
| 🔄 `make persist-state-load`  | Local   | Start Anvil with persistence | N/A          |
| 🔍 `make check-anvil`         | Local   | Verify Anvil status          | N/A          |
| 👥 `make show-anvil-accounts` | Local   | Display test accounts        | N/A          |

### 🌐 Network Configuration

#### 🔨 Local Development (Anvil)

| Property            | Value                                        |
| ------------------- | -------------------------------------------- |
| **Network**         | Anvil Testnet                                |
| **Chain ID**        | 31337                                        |
| **RPC URL**         | `http://127.0.0.1:8545`                      |
| **Default Account** | `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` |
| **Gas Price**       | 0 (free)                                     |

#### 🧪 Sepolia Testnet

| Property      | Value                                                 |
| ------------- | ----------------------------------------------------- |
| **Chain ID**  | 11155111                                              |
| **RPC URL**   | `https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`   |
| **Explorer**  | [sepolia.etherscan.io](https://sepolia.etherscan.io/) |
| **Faucet**    | [sepoliafaucet.com](https://sepoliafaucet.com/)       |
| **Gas Token** | SepoliaETH                                            |

## 📁 Project Structure

```
contract/
├── src/
│   ├── CryptoCanvasNFT.sol      # ERC-721 NFT contract
│   ├── MarketPlace.sol          # Core marketplace logic
│   └── Treasury.sol             # Fee collection contract
├── script/
│   └── Deploy.s.sol             # Deployment script
├── test/
│   ├── unit/                    # Unit tests
│   │   ├── CryptoCanvasNFTTest.t.sol
│   │   ├── MarketPlaceTest.t.sol
│   │   └── TreasuryTest.t.sol
│   └── fuzz/                    # Fuzz tests
│       ├── CryptoCanvasNFTTestFuzz.t.sol
│       └── TreasuryTestFuzz.t.sol
├── makefile                     # Deployment automation
├── foundry.toml                 # Foundry configuration
└── deployment-summary.json      # Deployment tracking
```

## 🔧 Development Commands

### Build & Compile

```bash
forge build                     # Compile contracts
forge fmt                       # Format code
forge clean                     # Clean build artifacts
```

### Testing & Coverage

```bash
forge test                      # Run all tests
forge test -vvv                 # Verbose test output
forge coverage                  # Generate coverage report
forge snapshot                  # Gas usage snapshots
```

### Local Development

```bash
anvil                          # Start local node
make persist-state-dump        # Start Anvil with state persistence
make persist-state-clean       # Clean saved state
```

## 🔐 Security Features

- **Input Validation**: Comprehensive parameter checking
- **Access Control**: Owner-only administrative functions
- **Reentrancy Protection**: Safe external call patterns
- **Integer Overflow Protection**: Solidity ^0.8.24 built-in protection
- **Transfer Safety**: Proper ETH transfer error handling

## 📊 Contract Addresses

### Local Deployment (Anvil)

- **Treasury**: 0x5FbDB2315678afecb367f032d93F642f64180aa3
- **CryptoCanvasNFT**: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
- **MarketPlace**: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

_Note: Addresses may vary between deployments. Check `deployment-summary.json` for current addresses._

## 📋 API Reference

### 🏪 MarketPlace Functions

| Function                          | Parameters              | Returns                | Gas  | Description                |
| --------------------------------- | ----------------------- | ---------------------- | ---- | -------------------------- |
| 🎨 `listNFT`                      | `tokenId`, `price`      | `uint256 listingId`    | ~50K | List NFT for sale          |
| 💰 `buyNFT`                       | `listingId`             | `void`                 | ~80K | Purchase listed NFT        |
| ❌ `cancelListing`                | `listingId`             | `void`                 | ~35K | Cancel active listing      |
| 🔄 `relistPurchasedNFT`           | `listingId`, `newPrice` | `uint256 newListingId` | ~45K | Relist purchased NFT       |
| 📋 `getSingleListingWithTokenURI` | `listingId`             | `Listing, string`      | ~25K | Get listing with metadata  |
| ⚙️ `setFeePercent`                | `newFeePercent`         | `void`                 | ~25K | Update marketplace fee     |
| 📊 `getFeePercent`                | `none`                  | `uint256`              | ~2K  | Get current fee percentage |

### 🎨 CryptoCanvasNFT Functions

| Function      | Parameters           | Returns           | Access | Description            |
| ------------- | -------------------- | ----------------- | ------ | ---------------------- |
| 🖼️ `mintNFT`  | `to`, `tokenURI`     | `uint256 tokenId` | Public | Mint new NFT           |
| 🔍 `tokenURI` | `tokenId`            | `string`          | Public | Get metadata URI       |
| 👑 `ownerOf`  | `tokenId`            | `address`         | Public | Get token owner        |
| ✅ `approve`  | `spender`, `tokenId` | `void`            | Owner  | Approve token transfer |

### 🏛️ Treasury Functions

| Function      | Parameters | Returns | Access | Description             |
| ------------- | ---------- | ------- | ------ | ----------------------- |
| 💸 `withdraw` | `to`       | `void`  | Owner  | Withdraw collected fees |
| 📥 `receive`  | ETH        | `void`  | Public | Accept ETH deposits     |

### 📊 Events Reference

| Event                 | Parameters                                | Emitted When           | Gas Cost |
| --------------------- | ----------------------------------------- | ---------------------- | -------- |
| 🎯 `NFTListed`        | `listingId`, `seller`, `tokenId`, `price` | NFT is listed for sale | ~1K      |
| 💸 `NFTSold`          | `listingId`, `buyer`, `seller`, `price`   | NFT is purchased       | ~1.5K    |
| 🚫 `ListingCancelled` | `listingId`, `seller`                     | Listing is cancelled   | ~800     |
| 🖼️ `NFTMinted`        | `to`, `tokenId`, `tokenURI`               | New NFT is minted      | ~1K      |

### 🔒 Access Control

| Role             | Functions                             | Description                |
| ---------------- | ------------------------------------- | -------------------------- |
| 👑 **Owner**     | `setFeePercent`, `withdraw`           | Administrative functions   |
| 🎨 **NFT Owner** | `listNFT`, `cancelListing`, `approve` | Token management           |
| 👤 **Public**    | `buyNFT`, `mintNFT`, `view functions` | General marketplace access |

### ⚠️ Error Codes

| Error                               | Condition          | Solution                                    |
| ----------------------------------- | ------------------ | ------------------------------------------- |
| `MarketPlace__NotValidListingId`    | Invalid listing ID | Use valid listing ID (1 to nextListingId-1) |
| `MarketPlace__PriceNotMoreThanZero` | Zero price listing | Set price > 0                               |
| `MarketPlace__ListingNotActive`     | Inactive listing   | Use active listing                          |
| `MarketPlace__InsufficientFunds`    | Low payment        | Send exact listing price                    |
| `Treasury__WithdrawFailed`          | Withdrawal error   | Check recipient address                     |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🔗 Links

| Resource                     | Link                                                  | Description        |
| ---------------------------- | ----------------------------------------------------- | ------------------ |
| 🏠 **Main Repository**       | [GitHub](https://github.com/kavinda-100/CryptoCanvas) | Project home       |
| 📖 **Foundry Documentation** | [Book](https://book.getfoundry.sh/)                   | Framework guide    |
| 🔐 **OpenZeppelin**          | [Contracts](https://openzeppelin.com/contracts/)      | Security library   |
| 🌐 **Solidity**              | [Documentation](https://docs.soliditylang.org/)       | Language reference |
| 🧪 **Ethereum**              | [Developer Portal](https://ethereum.org/developers/)  | Platform docs      |

---

<div align="center">
  
  **🎨 Built with ❤️ using Foundry and Solidity**
  
  *Secure • Tested • Professional*
  
  [![Foundry](https://img.shields.io/badge/Built%20with-Foundry-orange?style=for-the-badge&logo=ethereum)](https://book.getfoundry.sh/)
  [![Solidity](https://img.shields.io/badge/Solidity-^0.8.24-blue?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
  [![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen?style=for-the-badge)](./README.md)
  
</div>
